import express from "express";
import cors from "cors";
import router from "./controller.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(cors());

app.use("/", router);

export default app;
