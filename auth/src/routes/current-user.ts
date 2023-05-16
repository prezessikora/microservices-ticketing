import express from "express";
import { json } from "body-parser";

const router = express.Router();

router.get("/api/users/currentuser", () => {

})

app.use(json());

export {router as currentUserRouter };