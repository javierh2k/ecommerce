import Router from 'express'
const router = Router.Router();

router.get('/', (req, res) => res.status(200).end());

module.exports = router;

