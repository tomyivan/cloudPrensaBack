const  validationRol = (rol) => {
    return(req,res,next) => {
        const {userRol} = req.body;
        if(userRol !== rol)
        {
            return res.status(403).json({
                ok:false,
                msg:'No tiene los suficientes previlegios'
            });
        }
        next();   
    }   
}
module.exports = validationRol