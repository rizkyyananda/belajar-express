import express from "express"
import userController from "../controller/user-controller.js";


const publicRouter = express.Router();
publicRouter.get("/", function(req, res) {
    res.send(`Welcome to express js`);
});
publicRouter.post("/api/users", userController.register);
publicRouter.get("/api/users", userController.getUser);
publicRouter.get("/api/users/detail", userController.getById);


export{
    publicRouter
}