const dbConn = require('../config/db');
const bcrypt = require('bcrypt');
const environment = process.env.NODE_ENV;
const stage = require('../config/config')[environment];
const jwt = require('jsonwebtoken');
module.exports = {
    add: async (req, res) => {
        let { fullname, email, password} = req.body;
        let result = {};
        if (!fullname || !password || !email) {
            result.status=400;
            result.error ='Please provide complete user information';
            return res.status(400).send(result);
        }
        let hash = await bcrypt.hash(password, stage.saltingRounds);
        dbConn.query('SELECT * FROM users where email=?', email, function (error, results) {
            if (results[0]) {
                result.status=422;
                result.error='User with similar email already exist';
                return res.status(422).send(result);
            } else {
                dbConn.query(`SET @user_id =0; CALL signup(@user_id, '${fullname}', '${email}', '${password}', 0); SELECT @user_id`, function (error, result2) {
                    if (error) {
                        result.status=500;
                        result.error=error;
                        return res.status(500).send(result);
                    } else {
                        result.status = 200;
                            // Create a token
                            const payload = { user: email };
                            const options = { expiresIn: '2d' };
                            const secret = process.env.JWT_SECRET;
                            const token = jwt.sign(payload, secret, options);
                            result.token = token;
                        return res.status(result.status).send(result);
                    }
                });
            }
        });
    },
    login: (req, res) => {
        let { email, password } = req.body;
        console.log(req.body);
        let result = {};
        dbConn.query('SELECT * FROM users where email=?', email, function (error, results) {
            if (!error && results[0]) {
                bcrypt.compare(password, results[0].password, function (err, match) {
                    if (err) {
                        result.status=500;
                        result.error=err;
                        res.status(500).send(result);
                    } else {
                        if (match) {
                            result.status = 200;
                            // Create a token
                            const payload = { user: results[0].email };
                            const options = { expiresIn: '2d' };
                            const secret = process.env.JWT_SECRET;
                            const token = jwt.sign(payload, secret, options);
                            result.token = token;
                            result.result = results[0];
                        } else {
                            result.status = 401;
                            result.error = "Authentication failed";
                        }
                        res.status(result.status).send(result);
                    }
                });
            } else {
                result.status = 404;
                result.error = error;
                res.status(404).send(result);
            }
        });
    },
    getAll: (req, res) => {
        result={};
        dbConn.query('SELECT * FROM users', function (error, results) {
            if (!error) {
                const payload = req.decoded;
                if (payload) {
                    res.send(results);
                } else {
                    status = 401;
                    result.status = status;
                    result.error = `Authentication error`;
                    res.status(status).send(result);
                }
            } else {
                status = 500;
                result.status = status;
                result.error = error;
                console.log(error);
                res.status(status).send(result);
            }
        });
    }
}