import express from "express";
import {createWalletController,getWalletBalanceController,importWalletController,} from "../controllers/walletController.js";

const router = express.Router();

router.post("/create", createWalletController);
router.post("/import", importWalletController);
router.post("/balance",getWalletBalanceController)

export default router;
