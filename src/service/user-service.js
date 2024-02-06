import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { validate } from "../validation/validattion.js"
import {registerUserValidate} from "../validation/user-validation.js"
import bcrypt from "bcrypt"
import { logger } from "../application/logging.js"

const register = async (request) =>{
    const user =  validate(registerUserValidate, request)

    const countUser = await prismaClient.user.count({
        where:{
            username : user.username
        }
    })

    if (countUser === 1){
        logger.info("data already exist")
        throw new ResponseError(400, "Username Already Exist")
    }


    // bcrypt password
    user.password = await bcrypt.hash(user.password, 10)

    return prismaClient.user.create({
        data: user,
        select:{
            username:true,
            name: true
        }
    })
}

const getUser = async () =>{

    const getData = await prismaClient.user.findMany();

    logger.info("data ", getData)

    return {
      list: getData
    };
    
}

const getById = async (request) =>{

    const user = await prismaClient.user.findUnique({
        where: {
          username: request
        }
      });

    if (user === null){
        throw new ResponseError(404, "Data Not found")
    }  

    return {
        user
    };
    
}

export default{
    register,
    getUser,
    getById
}