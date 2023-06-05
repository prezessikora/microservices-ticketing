import express from "express";
import { json } from "body-parser";

const router = express.Router();

router.post("/api/users/signin", (req,res) => {
  res.send("Hi there!")
})

export {router as signinRouter };