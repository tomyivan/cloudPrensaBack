const { Box,getTokenBox } = require('../helpers/box')

const getAllCategory = async (req, res) => {
    const  token  = await getTokenBox();
    
    category = Box( token ).folders.getItems('253563613249')
        .then(file => {
            res.send(file.entries);
        })
        .catch(err => { res.send(err) });
}
const getCategoryContent = async (req, res) => {
    const { idCategory} = req.params
    const  token  = await getTokenBox();
    Box(token).folders.getItems(idCategory)
        .then(category => {
            res.send(category.entries);
        })
        .catch(err => { res.send(err) })
}
const addCategory = async(req, res) => {
    const { nameCategory } = req.body;
    const  token  = await getTokenBox();
    Box( token ).folders.create('252580355253', nameCategory)
        .then(() => {
            res.status(201).json({
                ok: true,
                msg: 'Se creo correctamente'
            })
        })
        .catch(err => { res.send(err) })
}
const updateCategory =async (req,res) => {
    const {idCategory,nameCategory} = req.body;
    const  token  = await getTokenBox();
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