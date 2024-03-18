const JWT = require('jsonwebtoken'); 
const generateJWT = ( id, name ,rol) => {
    return new Promise( (resolve, reject) => {
        const payload = { id, name ,rol};
        
        JWT.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if ( err ) {            
                reject('No se pudo generar el token');
            }
            resolve (token)
        })
    })
}

module.exports = {
    generateJWT
}