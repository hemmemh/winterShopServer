const typeServices = require("../services/typeService")

class typeControllers{
    async create(req,res){
        const {name} = req.body
        const {image} = req.files
        const response =await typeServices.createType(name,image)
        return res.json(response)
}
async getAll(req,res){
    const response =await typeServices.getAll()
    return res.json(response)
}
async getOne(req,res){
    const {id} = req.body
    const response =await typeServices.getOne(id)
    return res.json(response)
}
}
module.exports = new typeControllers()