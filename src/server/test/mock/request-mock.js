import config from '../../../../config'
import getItemsMock from './getItems'

const { MockAgent, setGlobalDispatcher, fetch } = require('undici')
global.fetch = fetch

const mockAgent = new MockAgent()
const mockPool = mockAgent.get(config.apimel.url)
setGlobalDispatcher(mockAgent)

mockPool.intercept({ path:  '/sites/MLA/search?&limit=4' }).reply(200,getItemsMock.requestEmpty)
mockPool.intercept({ path:  '/sites/MLA/search?q=relevant&limit=4' }).reply(200,getItemsMock.request)
mockPool.intercept({ path:  '/categories/MLA109042' }).reply(200,getItemsMock.categories)
