import userService from "../service/user-service.js"

const register = async (req, res, next) =>{

    try {
        const result = await userService.register(req.body);
        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error); 
    }
}

const getUser = async (req, res, next) =>{

    try {
        const result = await userService.getUser();
        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error); 
    }
}
const getById = async (req, res, next) =>{

    try {
        const { username } = req.query;
        const result = await userService.getById(username);
        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error); 
    }
}


export default{
    register,
    getUser,
    getById
}