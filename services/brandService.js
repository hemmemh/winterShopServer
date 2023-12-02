const Brand  = require("../models/Brand")
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const ApiError = require("../Errors/ApiError")

class brandServices{
    async createBrand(name,image){
        
  
            const imagePath = uuid.v4() + '.jpg'
            const filePath = path.resolve(__dirname,'..','static',`brands`)
            if (!fs.existsSync(filePath)) {
              fs.mkdirSync(filePath,{recursive:true})
            }     
            image.mv(path.resolve(filePath,imagePath))
    
          
            const response = new Brand({name,image:imagePath})
            await response.save()
            if (!response) throw ApiError.BadRequest('неверные данные')
            return response
       
      }
      async getAll(query){
      
        try {
            let {typeId} = query
            typeId = typeId || ''
             console.log(typeId,'88');
            let response = null
            if (typeId) {
                const brands = await Brand.find({}).populate('products')
                console.log(brands[0].products);
                response = [...brands.filter(el=>el.products.find(pr=>pr.type.toString() === typeId))]

            }else{
                response = await Brand.find({})
            }
         
            return response
        } catch (e) {
            console.log(e);
        }
      }
      async getOne(idType){
        try {
        const response =await Brand.findById(idType)
        return response
        } catch (error) {
            console.log(error);
        }
        
    }
}
module.exports =new brandServices()