import  express from "express";
import router from "./route/index.js";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use('',router);

app.listen(port, ()=>{ console.log(`server up and running on port ${port}`)});