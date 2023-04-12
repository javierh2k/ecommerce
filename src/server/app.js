import express from 'express'
import cors from 'cors'
import { renderPages } from './renderPages'
import { resolve } from 'path';
import favicon from 'serve-favicon';
    
const fs = require('fs');
const path = require('path');
  
const app = express()
if(process.env.HOTRELOAD){
  const websocketServerCreator = __DEV__ ? require('../../webpack/websocket-server-creator').default : undefined;
  const webpackMiddleware = __DEV__ ? require('../../webpack/webpack.middleware').default : undefined;
  
  if (typeof webpackMiddleware === 'function') {
    const ws = websocketServerCreator(app);
    app.use(webpackMiddleware(ws));
  }
}


function getRoutesTesting(folderRootName) {
  const fullPath = __dirname + '/' +folderRootName
  fs.readdirSync(fullPath).forEach((folderName) => {
    const fullName =fullPath+'/'+ folderName;
      const route = fullName+'/routes.js'
      app.use(`/api/${folderName}`, require(route))
  })
}

function recursiveRoutes() {
  if(process.env.NODE_ENV==="test"){
    getRoutesTesting("api");
    return
  }
  const routes = require.context('./api', true,/routes\.js$/ );
  routes.keys().forEach(filePath => {
    const folderName =filePath.split('/')[1];
    app.use(`/api/${folderName}`, routes(filePath) )  
  });
}

app.use((req, res, _next) =>{
  res.author = {
    name: process.env.NAME,
    lastname: process.env.LAST_NAME
  };
  _next()
});

app.use(cors())
app.use(favicon(resolve(process.cwd(), 'public/favicon.png')));
app.use(express.static('dist'))


recursiveRoutes();


app.get(/^(?!.*^\/api\/)(.*)/,async (req, res) => {
  try{
    const html = await renderPages(req,res);
    res.send(html);
  } catch (error) {
    console.error(error)
    res.end({error: error.message})
  }
});

app.use((req, res, _next) =>
  res.status(404).json({
    success: false,
    error: `Not found ${req.method} ${req.path}`,
  })
);

export default app;
