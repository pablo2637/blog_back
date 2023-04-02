const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) return res.status(404).json({
        ok: false,
        msg: 'validateJWT: no hay token en la petición.'
    })

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);        
        req.uid = payload.uid;
        req.nombre = payload.nombre;
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'validateJWT: error al validar el token.'
        })
    }
    next();
}

module.exports = { validateJWT };