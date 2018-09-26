const document = require('../controllers/documents-controller');
const checkAuth = require('../middlewares/checkauth');
const user = require('../models/user-model');
const documentModel = require('../models/document-model');
module.exports = (app) => {
	app.param('uid', (req, res, next, id) => {
		user.findById(id, (err, doc) => {
			if (err) {
				return res.status(404).json({
					error: 'The user does not exist'
				});
			}
			if(!doc) {
				return res.status(404).json({
					error: 'The user does not exist'
				});
			}
			req.data = doc;
			return next();
		});
	});

	app.param('did', (req, res, next, id) => {
		documentModel.findById(id, (err, doc) => {
			if (err) {
				return res.status(404).json({
					error: 'The document does not exist'
				});
			}
			if(!doc) {
				return res.status(404).json({
					error: 'The document does not exist'
				});
			}
			req.data = doc;
			next();
		});
	});
	app.post('/document',checkAuth, document.create);

	app.get('/document', document.get);

	app.put('/document/:did', document.update);

	app.get('/document/:did', document.getOne);

	app.delete('/document/:did', document.delete);

	app.get('/user/:uid/document/:did', document.getByUser);
};