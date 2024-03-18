const { Box } = require('../helpers/box')
const getAllCategory = (req, res) => {
    const { token } = req.body;
  
    category = Box( token ).folders.getItems('252580355253')
        .then(file => {
            res.send(file.entries);
        })
        .catch(err => { res.send(err) });
}
const getCategoryContent = (req, res) => {
    const { idCategory,token } = req.params
    Box(token).folders.getItems(idCategory)
        .then(category => {
            res.send(category.entries);
        })
        .catch(err => { res.send(err) })
}
const addCategory = (req, res) => {
    const { nameCategory, token } = req.body;
    Box( token ).folders.create('252580355253', nameCategory)
        .then(() => {
            res.status(201).json({
                ok: true,
                msg: 'Se creo correctamente'
            })
        })
        .catch(err => { res.send(err) })
}
const updateCategory = (req,res) => {
    const {idCategory,nameCategory,token} = req.body;
    Box( token ).folders.update(idCategory,{name: nameCategory})
        .then(()=>{
            res.status(201).json({
                ok: true,
                msg: 'Se actualizo correctamente'
            })
        })
        .catch(err=> {res.send(err)})
}
module.exports = {
    getAllCategory,
    getCategoryContent,
    addCategory,
    updateCategory
} 