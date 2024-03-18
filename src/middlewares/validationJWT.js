const { response } = require('express');
const jwt = require('jsonwebtoken');
const valdationJWT = (req, res = response, next ) => {
    const token = req.header('x-token');
    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
    try {
        const { id, name, rol } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );    
        req.id = id
        req.name = name
        req.rol = rol
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }
    next();
}

module.exports = {
    valdationJWT
}