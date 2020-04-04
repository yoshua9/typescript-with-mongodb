const jwt = require('jsonwebtoken');

const isvalidHostname = (req, res, next) => {
    const validHosts = ["dina.es", "localhost"];
    if (validHosts.includes(req.hostname)) {
        next();
    } else {
        res.status(403).send({
            status: "access denied",
        })
    }
};

const isAuth = (req, res, next) => {
    try {
        const { token } = req.headers;
        if (token) {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            console.log("jwt data", data);
            req.sessionData = { userId: data.userId, role: data.role };
            next();
        } else {
            throw { code: 403, status: 'Access_Denied', message: 'Missing header token' };
        }
    } catch (e) {
        res.status(e.code || 500).send({ status: e.status || 'ERROR', message: e.message });
    }

};

const isAdmin = (req, res, next) => {
    try {
        const { role } = req.sessionData;
        console.log('isAdmin', role);
        if (role !== 'admin') {
            throw { code: 403, status: 'Access_Denied', message: 'Invalid ROLE' };
        }
        next();
    } catch (e) {
        res.status(e.code || 500).send({ status: e.status || 'ERROR', message: e.message });
    }

};


module.exports = { isvalidHostname, isAuth, isAdmin };