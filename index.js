import express from 'express'
import path from "path"
import {fileURLToPath} from "url"

// ----------ROUTES--------
import home_route from "./routes/home.js"
import product_route from "./product.js"


let app = express()



const __absolute=fileURLToPath(import.meta.url)
const __dirtricpath=path.dirname(__absolute)


export const public_folder=path.join(__dirtricpath,"public")


app.use('/',home_route)

app.use(express.static(public_folder))

app.usee('/product',product_route







app.listen(3000, () => console.log("Server running on port 3000"))


