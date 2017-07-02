"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_routes_1 = require("./users/user.routes");
var jamo_routes_1 = require("./jamo/jamo.routes");
var auth_service_1 = require("../services/auth.service");
exports.default = function (app) {
    app.use('/api/v1/users', user_routes_1.default);
    app.use('/api/v1/jamo', jamo_routes_1.default);
    app.get('/private', auth_service_1.authJwt, auth_service_1.authRole('Admin'), function (req, res) {
        res.status(200).json('This is a private route!!!');
    });
};
