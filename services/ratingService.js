const ApiError = require("../Errors/ApiError")
const Product  = require("../models/Product")
const Rating  = require("../models/Rating")
const User = require("../models/User")
const { format} = require('date-fns')
const {ru} = require('date-fns/locale/index.js') 
class ratingServices{
    async createRating(user,rate,product,name,sername,text){
     
            const date = format(Date.now(), 'd MMMM yyyy', { locale:ru })
            const userModel =await User.findById(user).populate('ratings')
            if (!userModel) {
                throw ApiError.unauthorized()
            }
            console.log(userModel);
            const productRes =await Product.findById(product).populate('ratings')
          
            if (productRes.ratings.find(el=>el.user.toString() === user)) {
                throw ApiError.forbidden('данный пользователь уже ставил оценку')
            }
            const response = new Rating({user,rate,name,sername,text,date})
            await response.save()
            
            productRes.ratings.push(response._id)
            userModel.ratings.push(response._id)
            await userModel.save()
            await productRes.save()
            return response
       
    }
   
}
module.exports =new ratingServices()