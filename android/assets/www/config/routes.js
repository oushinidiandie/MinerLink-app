var routesss = require('../routes');

module.exports = function(app) {

    app.get('/validate', routesss.controller.validate);
    app.get('/', routesss.controller.login);
    app.get('/login',routesss.controller.loginValidate);

};