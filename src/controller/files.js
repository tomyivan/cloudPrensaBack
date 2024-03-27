const { Box,getTokenBox } = require("../helpers/box");
const os = require("os");
const username = os.userInfo().username;
const fs = require("fs");
const { dbConnection, sql } = require('../database/config');
const { formatText } = require("../helpers/fomatText");
const {queryFile} = require('../database/querys');
const getContenFile = async(req, res) => {
  const { idFile } = req.params;
  const token = await getTokenBox();
  Box(token)
    .files.getEmbedLink(idFile)
    .then((content) => {
      res.send({ content: content });
    })
    .catch((err) => {
      res.send(err);
    });
};

const downloadFile = async (req, res) => {
  const { idFile } = req.params;
  const token = await getTokenBox();
  Box(token).files.getDownloadURL(idFile)
  .then((getDownloadURL) => {
    res.send({url:getDownloadURL})
  }).catch((err)=>{
    res.send(err);
  })
};
const uploadFile = async(req, res) => {
  const { journalist, date, type, nameFile, file } = req.body;
  const binaryData = Buffer.from(file, "base64");
  const codigo =
    formatText(date) +
    "_AR_" +
    formatText(journalist) +
    "_" +
    type +
    "_" +
    nameFile;
  res.send({
    msg: codigo,
    ok: true,
    file: file,
  });
};
// const searchFile = async(req, res) => {
//   const { nameFile } = req.params;
//   const token = await getTokenBox();
//   Box(token)
//     .search.query(nameFile, {
//       fields: "name,modified_at,size,extension,permissions,sync_state",
//       file_extensions: "pdf,doc,mp4,jpg",
//       limit: 200,
//       offset: 0,
//     })
//     .then((content) => {
//       res.send({ content: content });
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// };
const getFileAll = async(req,res) =>{
  const { dateFilter,city,journalist } = req.params; 
    try{
      const connect = await dbConnection();
      const result = await connect.query`select id_archivo,archivos.nombre,descripcion,tipos.nombre nom_tipo,periodistas.nombre nom_periodista, archivos.fecha_creacion,archivos.usuario_creacion from archivos inner join periodistas on periodistas.id_periodista = archivos.id_periodista inner join tipos on tipos.id_tipo = archivos.id_tipo WHERE (fecha_creacion = ${dateFilter} OR archivos.id_ciudad = ${city} OR archivos.id_periodista = ${journalist}) AND  ACTIVO = 1`;
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
  getFileAll,
  getContenFile,
  downloadFile,
  uploadFile
};
