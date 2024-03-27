const {response} = require('express');
const { dbConnection, sql } = require('../database/config');
const getAllCity = async(req,res=response) => {
    try{
        const connect = await dbConnection();
        const result = await connect.query`SELECT * FROM ciudades `;
        res.status(201).json(result.recordset);
    }catch(error) 
    {
        console.log(error);
        res.status(401).json({
            ok:false,
            msg:'Whops ocurrio un error.'
        });
    }
}

module.exports = {
    getAllCity
}