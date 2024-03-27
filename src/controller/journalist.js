const {response} = require('express');
const {queryJournalist} = require('../database/querys')
const { dbConnection, sql } = require('../database/config');
const getAllJournalist = async(req,res=response) => {
    try{
        const connection = await dbConnection();
        const result = await connection.request().query(queryJournalist.getAllJournalist);
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
const addJournalist = async (req,res=response) => {
    const { name } = req.body;
    try{
        const pool = await dbConnection();
        await pool.request()
            .input("nombre", sql.VarChar, name)
            .query(queryJournalist.addJournalist);
        res.status(201).json({
            ok: true,
            msg: 'Se creo correctamente',
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Whops ocurrio un error.'
        });
    }   
}
module.exports = {
    getAllJournalist,
    addJournalist
}