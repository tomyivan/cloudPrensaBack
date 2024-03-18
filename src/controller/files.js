const { Box } = require('../helpers/box')
const os = require('os');
const username = os.userInfo().username;
const fs = require('fs');
const {formatText} = require('../helpers/fomatText');
const getContenFile = (req,res) => {
    const { idFile } = req.params;
    file = Box().files.getEmbedLink(idFile)
    .then(content => {
        res.send({content:content});
    })
    .catch(err => { res.send(err) });
}
const downloadFile = (req,res) => {
    const {idFile} = req.params;
    Box().files.getReadStream(idFile,null,function(err, stream){
        if(err){
            res.send(err)
        }
        var output = fs.createWriteStream("C:/Users/"+username+"/Downloads/Box/"+ idFile +".mp4" );
        stream.pipe(output);
        res.send({
            msg:"Se descargo correctamente",
            ok:true
        })
    })
}
const uploadFile = (req,res) => {
    
    const {journalist,date,type,nameFile,file} = req.body;    
    const binaryData = Buffer.from(file,'base64')
    
    const codigo = formatText(date)+"_AR_"+formatText(journalist)+"_"+type+"_"+nameFile;
    res.send({
        msg:codigo,
        ok:true,    
        file:file
    })
}

module.exports = {
    getContenFile,
    downloadFile,
    uploadFile
} 