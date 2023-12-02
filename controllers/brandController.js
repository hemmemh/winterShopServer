const brandServices = require("../services/brandService")

class brandControllers{
    async create(req,res,next){
        try {
            const {name} = req.body
            const {image} = req.files
            const response =await brandServices.createBrand(name,image)
            return res.json(response)
        } catch (error) {
            next(error)
        }

}
async getAll(req,res){
    const response =await brandServices.getAll(req.query)
    return res.json(response)
}
async getOne(req,res){
    const {id} = req.body
    const response =await brandServices.getOne(id)
    return res.json(response)
}
}
module.exports = new brandControllers()