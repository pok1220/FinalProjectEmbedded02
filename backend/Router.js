import * as itemController from "./netpieController.js";
import express from "express";

const Netrouter = express.Router();

Netrouter.get("/testNetPie1", itemController.getDeviceStatus);
Netrouter.get("/testNetPie2", itemController.getDeviceStatusShadow);

export default Netrouter;
