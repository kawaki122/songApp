const controller = require('../controllers/users');
const validateToken = require('../utils').validateToken;
module.exports = (router) => {
    router.route('/users')
        .post(controller.add).get(/*validateToken, */controller.getAll);
    router.route('/deleteUser/:id')
        .get(controller.delete);
    router.route('/userKeyValue')
        .get(controller.getKeyVAl);
    router.route('/login')
        .post(controller.login)
};