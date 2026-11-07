import ExcelJs, { Workbook } from "exceljs";
import path from "path";
import { createExcel_type } from '../../types/excel types/types';
import fs from "fs/promises";

const createExcel = async (payload: createExcel_type) => {
    try {
        const columns: Record<string, any>[] = payload.columns || [];
        const rows: Record<string, any>[] = payload.rows || [];
        const excelWorkbook = new ExcelJs.Workbook();
        excelWorkbook.created = new Date();
        const workSheet = excelWorkbook.addWorksheet(payload.sheetName !== "" ? payload.sheetName : "Sheet1")

        if (columns?.length > 0) {
            const columnsKey = Object.keys(columns[0]);
            workSheet.columns = columnsKey.map((key: any) => ({
                header: key,
                key: key,
                width: 20
            }))
        }

        if (columns?.length > 0) {
            workSheet.addRows(columns)
        }

        workSheet.getRow(1).font = {
            bold: true
        }

        const folderPath = path.join(process.cwd(), "public", "excel")

        // checking the whether the file name is already exists or not
        const folderIsExists = await fs.readdir(folderPath)
        const idFileExists = folderIsExists.includes(`${payload.name}.xlsx`)
        if (idFileExists) {
            return {
                type: "error",
                message: "File name is already exists"
            }
        }
        await fs.mkdir(folderPath, { recursive: true })
        const filepath = path.join(folderPath, `${payload.name}.xlsx`)
        await excelWorkbook.xlsx.writeFile(filepath)

        return {
            type: "Success",
            message: "excel file successfully created",
            // componentData :{
            //     path : filepath
            // }
        }

    } catch (error: any) {
        return {
            type: "error",
            message: error.message,
            componentData: null
        }
    }
}

export default createExcel
