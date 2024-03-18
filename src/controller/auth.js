const { response } = require('express');
const bcrypt = require('bcryptjs');
const { dbConnection, sql } = require('../database/config');
const { queryUser } = require('../database/querys');
const { generateJWT } = require('../helpers/jwt');
const createUsser = async (req, res = response) => {
    const { lastName, name, user, pass } = req.body;
    const salt = bcrypt.genSaltSync(5);
    const newPass = bcrypt.hashSync(pass, salt);
    try {
        const pool = await dbConnection();
        await pool.request()
            .input("apellidos", sql.VarChar, lastName)
            .input("nombres", sql.VarChar, name)
            .input("usuario", sql.VarChar, user)
            .input("pass", sql.VarChar, newPass)
            .query(queryUser.addUsers);
        res.status(201).json({
            ok: true,
            msg: 'Se creo correctamente',
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Whops ocurrio un error'
        })
    }
}
const login = async (req, res = response) => {
    const { user, pass } = req.body;
    let id, name, rol;
    try {
        const connect = await dbConnection();
        const result = await connect.query`SELECT * FROM usuarios WHERE usuario = ${user} AND activo  = 1`;
        if (result.recordset.length <= 0) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            })
        } else {
            let requestPass = result.recordset[0].pass
            name = result.recordset[0].nombres+" "+result.recordset[0].apellidos ;
            id = result.recordset[0].id_usuario;
            rol = result.recordset[0].rol;
            const validPassword = bcrypt.compareSync(pass, requestPass)
            if (!validPassword) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El usuario no existe'
                })
            }
            const token = await generateJWT(id, name, rol)
            res.json({
                ok: true,
                msg: 'Bienvenido',
                info: {
                    id: id,
                    name: name,
                    rol: rol,  
                    token: token
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor contactese con el administrador'
        })
    }
}
const refreshToken = async ( req, res = response ) => {
    const { id, name,rol } = req;
    
    const token = await generateJWT( id, name, rol);
    res.status(201).json({
        ok: true,
        info: {
            id:id,
            name:name,
            rol:rol,
            token:token
        }
    })
}

module.exports = {
    createUsser,
    login,
    refreshToken
}