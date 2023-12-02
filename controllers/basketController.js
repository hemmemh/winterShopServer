const basketServices = require("../services/basketService")
const basketItemServices = require("../services/basketItemService")
const ApiError = require("../Errors/ApiError")

class basketControllers{
    async create(req,res,next){
        try {
            const {id} = req.body
            const response =await basketServices.createBasket(id)
            return res.json(response)
        } catch (error) {
            next(error)
        }
     
}
async add(req,res,next){
    try {
        const {basketId,product,count,color,size} = req.body
        const response =await basketItemServices.createbasketItem(basketId,product,count,color,size)
        return res.json(response)
    } catch (error) {
        next(error)
    }
   
}

async change(req,res){
    const {id,count} = req.body
    const response =await basketItemServices.changebasketItem(id,count)
    return res.json(response)
}

async delete(req,res){
    const {id,basketId} = req.body
    const response =await basketItemServices.deletebasketItem(id,basketId)
    return res.json(response)
}

async removeAll(req,res){
    const {id} = req.body
    const response =await basketServices.removeAll(id)
    return res.json(response)
}

async getOne(req,res,next){
    try {
        const {id} = req.body
        const response =await basketServices.getOne(id)
        return res.json(response)
    } catch (error) {
        next(error)
    }
   
}
}
module.exports = new basketControllers()