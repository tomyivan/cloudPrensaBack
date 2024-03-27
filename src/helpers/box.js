const BoxSDK = require("box-node-sdk");
const { dbConnection, sql } = require("../database/config");
const { queryToken } = require("../database/querys");
const axios = require("axios");
const miliSeg = 2700000; // 45 minutos en milisegundo
require("dotenv").config();
const getTokenBox = async () => {
  try {
    const connection = await dbConnection();
    const result = await connection.request().query(queryToken.getAllToken);    
    const data =  result.recordset[0];
    let token = data.access_token;
    if(diffTime(data)){
        const response = await refreshToken(data);              
        console.log(response)
        token = response.access_token;
        updateToken(response)
    }
    return token;
  } catch (error) {
    return error;
  }
};
const updateToken = async ({access_token,refresh_token}) =>{
    try{
        const connection = await dbConnection();
        const request = connection.request();
        request.input("access_token", sql.VarChar, access_token);
        request.input("refresh_token", sql.VarChar, refresh_token);
        request.input("id_token", sql.Int, 2);
        const result = await request.query(queryToken.updateToken);        
        return result.rowsAffected[0]; 
    }
    catch(error){
        return error;
    }
}
const refreshToken = async({refresh_token})=>{
    const data = {
        grant_type: "refresh_token",
        client_id: process.env.BOX_CLIENT_ID,
        client_secret: process.env.BOX_CLIENT_SECRET,
        refresh_token: refresh_token
    };
       
    try {
        const response = await axios.post('https://api.box.com/oauth2/token', data);
        return response.data; // No es necesario hacer JSON.parse(), ya que response.data ya es un objeto
    } catch (error) {
        return error.response.data;
    }
}
const diffTime = ({ fecha_creacion }) => {
  const dateStart = new Date(fecha_creacion);
  const dateNow = new Date();
  dateNow.setHours(dateNow.getHours()-4)
  const diffMiliSeg = dateNow.getTime() - dateStart.getTime();
  return diffMiliSeg >= miliSeg ? true : false;
};
const Box =  (boxToken) => {
  var sdk = new BoxSDK({
    clientID: process.env.BOX_CLIENT_ID,
    clientSecret: process.env.BOX_CLIENT_SECRET,
  });
  
  return sdk.getBasicClient(boxToken);
};

module.exports = {
  Box,
  getTokenBox
};
