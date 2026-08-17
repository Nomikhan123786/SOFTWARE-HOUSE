import express from "express";
import { Router } from "express";
import { register } from "../controller/authController";

Router.post("/register", register);
