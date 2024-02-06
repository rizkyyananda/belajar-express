import { web } from "./application/web.js";
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT
const baseUrl = process.env.APP_ENV
web.listen(port, () => {
    console.log(baseUrl+":"+port)
});
