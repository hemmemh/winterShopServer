const BasketItem  = require("../models/BasketItem")
const Basket  = require("../models/Basket")
const ApiError = require("../Errors/ApiError")

class basketItemServices{
    async createbasketItem(basketId,product,count,color,size){
       
            const basket =await Basket.findOne({_id:basketId}).populate('basketItems')
            if (!basket) {
                throw ApiError.unauthorized()
            }
           
          
          let response = null
             console.log(basket);
            if(!basket.basketItems.find(e=> e.product.toString()== product )){
                response = new BasketItem({basket:basketId,product,count,size,color})
                await response.save()
                basket.basketItems.push(response._id)
                await basket.save()
            }else{
                throw ApiError.BadRequest('товар уже в корзине')
            }
            
            return response
       
    }
    async changebasketItem(id,count){
        try {
          
            const basketItem =await BasketItem.findById(id)
            basketItem.count = count
            await basketItem.save()
            return basketItem
        } catch (e) {
            console.log(e);
        }
    }
    async deletebasketItem(id,basketId){
      
        try {
            const basket =await Basket.findById(basketId).populate({path:"basketItems",populate:{path:'product'}})
            basket.basketItems = basket.basketItems.filter(el=>el.product._id.toString()  !== id)
            await BasketItem.findOneAndRemove({product:id})
            await basket.save()
            return basket
        } catch (e) {
            console.log(e);
        }
    }
}
module.exports =new basketItemServices()