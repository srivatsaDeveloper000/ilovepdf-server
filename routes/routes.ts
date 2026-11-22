import express from "express"
import { createExcel_controller } from "../controllers/excelControllers.ts";
import { loginController } from "../controllers/loginController.ts";

const Routes = express.Router();

Routes.post("/createExcel", createExcel_controller)
Routes.post("/login" , loginController)

export default Routes;