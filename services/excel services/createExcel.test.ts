import { describe, test, it, expect } from 'vitest';
import createExcel from './createExcel';
import { excelDummyColumns } from '../../dummy data/excel.ts';

const successPayload = {
    name: "test12345",
    sheetName: "testSheet",
    columns: excelDummyColumns,
    rows: []
}

const duplicatePayload = {
    name: "test1234",
    sheetName: "testSheet",
    columns: excelDummyColumns,
    rows: []
}

const isDuplicate = successPayload.name === duplicatePayload.name;

describe("testing create excel function", () => {
    test.skipIf(isDuplicate)("creating a new excel file", async () => {
        const result = await createExcel(successPayload);
        expect(result).toStrictEqual({ type: "Success", message: "excel file successfully created", })
    })

    test.runIf(isDuplicate)("if the file name is already exists", async () => {
        const result = await createExcel(duplicatePayload);
        expect(result).toStrictEqual({ type: "error", message: "File name is already exists" })
    })
})