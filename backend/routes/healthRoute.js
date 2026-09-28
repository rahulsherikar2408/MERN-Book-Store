import express from "express";

import { getHealth } from "../controller/health.js";

const router = express.Router();

router.get("/", getHealth);

export default router;