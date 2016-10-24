var express 	= require('express');
var router 		= express.Router();
var auth 		= require('./lib/auth.js');
var products 	= require('./lib/products.js');
var transporter = require('./lib/transporter.js');
var user 		= require('./app/user/user.controller.js');
var zone 		= require('./lib/zone.js');
var index 		= require('./lib/index.js');

/*
* Routes that can be accessed by any one
*/

router.post('/login', auth.login);
router.post('/transporterInfo', transporter.create);
router.post('/user', user.save);
router.post('/zone', zone.create);

router.get('/transporterInfo', transporter.getAll);
router.get('/user', user.getAll);
router.get('/listAllCarretos/:cepOrigem/:cepDestino', user.listAllCarretos);
router.get('/zone', zone.getAll);

router.get('/', index.renderIndex);


router.delete('/user/:id', user.deleteById);
router.delete('/zone/:id', zone.delete);


// /*
// * Routes that can be accessed only by autheticated users
// */
// router.get('/api/v1/products', products.getAll);
// router.get('/api/v1/product/:id', products.getOne);
// router.post('/api/v1/product/', products.create);
// router.put('/api/v1/product/:id', products.update);
// router.delete('/api/v1/product/:id', products.delete);
// /*
// * Routes that can be accessed only by authenticated & authorized users
// */
// router.get('/api/v1/admin/users', user.getAll);
// router.get('/api/v1/admin/user/:id', user.getOne);
// router.post('/api/v1/admin/user/', user.create);
// router.put('/api/v1/admin/user/:id', user.update);
// router.delete('/api/v1/admin/user/:id', user.delete);
module.exports = router;