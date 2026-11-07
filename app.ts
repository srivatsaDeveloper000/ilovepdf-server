import express from "express"
import dotenv from "dotenv";
import { requestLogger } from "./middlewares/logger";
import chalk from "chalk";
import Routes from "./routes/routes.ts";
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json())
const base_url : string = process.env.BASE_URL || String(undefined);
app.use(cors())
app.use(requestLogger);
app.use(base_url , Routes)

const PORT: Number = Number(process.env.PORT)

app.listen(PORT, (error) => {
    if (error) {
        console.error(chalk.red(`Error starting server: ${error}`));
    } else {
        console.log(`🚀 Server running at: http://localhost:${PORT}${base_url}`);
        console.log(chalk.green(`Server successfully running at port ${PORT}`))
    }
})