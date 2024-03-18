const { response } = require('express');
const { dbConnection, sql } = require('../database/config');
const { queryUser } = require('../database/querys');
const getAllUser = async (req,res = response ) => {
    try{
        const connection = await dbConnection();
        const result = await connection.request().query(queryUser.getActiveUsers);
        res.status(201).json(result.recordset)
    }catch(error)
    {   
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Whops ocurrio un error'
        })
    }
}
module.exports = {
    getAllUser
}