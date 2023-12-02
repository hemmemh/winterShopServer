const UserDto = require("../dtos/tokenDto")
const ApiError = require("../Errors/ApiError")
const Basket  = require("../models/Basket")
const Loves  = require("../models/Loves")

const User  = require("../models/User")
const bccrypt = require("bcrypt")
const tokenServices = require("../services/tokenService")

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, API_URL } = require('../utils/config');
class userServices{
    async registration(mail,password,name,sername){
        
            console.log(mail,password);
            const candidate = await User.findOne({email:mail})
           
            if (candidate) {
                throw ApiError.BadRequest("имейл уже занят")
             }
            const cryptPass =await bccrypt.hash(password,4)
            const responce = new User({mail,name,sername,password:cryptPass})
            await responce.save()
      
       
            const basket = new Basket({user:responce._id})
            await basket.save()
            const loves = new Loves({user:responce._id})
            await loves.save()
  
            responce.basket = basket._id
            responce.loves = loves._id
            await responce.save()
            const dto = new UserDto(responce)
            const tokens =await tokenServices.generateUpdateToken(dto)
            return tokens
        
      }
      async login(mail,password){
        
  
            const candidate = await User.findOne({mail})
            
            const pass = candidate ? await bccrypt.compare(password,candidate.password) : null
    
            if (!candidate || !pass) {
                throw ApiError.forbidden('неверен email или пароль')
            }
           
            const dto = new UserDto(candidate)
            const tokens = tokenServices.generateUpdateToken(dto)
      
            return tokens
        
    }
      async getOne(id){
        try {
            console.log(id,'tty');
        const response =await User.findOne({_id:id}).populate('basket')
        return response
        } catch (error) {
            console.log(error);
        }
        
    }



      async refresh(refreshToken){
       
          
        if (!refreshToken) {
          throw ApiError.unauthorized()
        }
        const response =await tokenServices.validateRefreshToken(refreshToken)
        const tokenFromDataBase =await tokenServices.getOne(refreshToken)
        if (!response || !tokenFromDataBase) {
          throw ApiError.unauthorized()
       
        }
        const user =await  User.findOne({_id:response.id})
        const DtoUSer = new UserDto(user)
        const tokens =await tokenServices.generateUpdateToken(DtoUSer)
      
        return {accessToken:tokens.accessToken,
                refreshToken:tokens.refreshToken}
     
        
        
      } 
      async logout(refreshToken){
        try {
          const token =await tokenServices.removeToken(refreshToken)
        return token
        } catch (e) {
            console.log(e);
        }
        
      }

   
}
module.exports =new userServices()