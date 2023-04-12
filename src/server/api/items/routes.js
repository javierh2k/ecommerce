import Router from 'express'
import controller from './controller'
const router = Router.Router();

router.get('/', controller.getItems)
router.get('/:id', controller.getItem)

module.exports = router;
