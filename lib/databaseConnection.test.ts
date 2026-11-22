import { describe, expect, test } from "vitest";
import { db_connection, isTrue } from "./databaseConnection.ts";

describe('Testing db connection', () => {
    test.runIf(isTrue)("if the connection is working", async () => {
        const result = await db_connection();
        expect(result).toStrictEqual({
            type: "Success",
            message: "Mongodb database connected successfully...!!!",
            componentData: null
        })
    })

    test.runIf(isTrue === false)("If the connection went wrong", async () => {
        const result = await db_connection();
        expect(result).toStrictEqual({
            type: "error",
            message: "Database connection failed...!!!",
            componentData: null
        })
    })
})
