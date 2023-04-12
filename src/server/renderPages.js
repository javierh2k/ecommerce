import * as React from 'react'
import ReactDOM from 'react-dom/server'
import { matchPath } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server';
import serialize from 'serialize-javascript'
import App from '../client/App'
import routes from '../client/routes'
import Helmet from "react-helmet";
const helmetData = Helmet.renderStatic( );

function getControllers() {
  const controllers = {}
  const routes = require.context('./api', true,/controller\.js$/ );
  routes.keys().forEach(filePath => {
    const folderName =filePath.split('/')[1];
    controllers[folderName] = routes(filePath);
  });
  return controllers;
}

export async function renderPages(req, res){
    const activeRoute = routes.find((route) => matchPath(route.path, req.url))
    if(!activeRoute){
      // console.log(req)
      return ''
    }
    try{
      const apiControllers = getControllers();
      let data = {};
      if(activeRoute.controllerInitialData){
        const route = String(activeRoute.controllerInitialData).split('/');
        const [parentRoot, controller] = route;
        const controllerName= apiControllers[parentRoot][controller];
        req.returnJSON = true;
        
        data = await controllerName(req,res);
      }
      
      const markup = ReactDOM.renderToString(
          <StaticRouter location={req.url} >
            <App serverData={data}/>
          </StaticRouter>
      )
  
       return (`
        <!DOCTYPE html>
        <html suppressHydrationWarning="true">
          <head>
          ${helmetData.title.toString()}
          ${helmetData.meta.toString()}
            <script src="/bundle.js" defer></script>
            <link href="/main.css" rel="stylesheet">
            <script>window.__INITIAL_DATA__=${serialize(data)} </script>
          </head>
  
          <body style="visibility: hidden;">
            <script>
              const domReady = (cb) => {
                document.readyState === 'interactive' || document.readyState === 'complete'
                  ? cb()
                  : document.addEventListener('DOMContentLoaded', cb);
              };
              domReady(() => {
                document.body.style.visibility = 'visible';
              });
            </script>
            <div id="app">${markup}</div>
          </body>
        </html>
      `)
    
    } catch (error) {
      console.error(error)
      res.end({error: error.message})
    }

}
  
