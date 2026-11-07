import express from "express"
import { createExcel_controller } from "../controllers/excelControllers.ts";

const Routes = express.Router()

console.log("routest file")

Routes.post("/createExcel", createExcel_controller)

export default Routes