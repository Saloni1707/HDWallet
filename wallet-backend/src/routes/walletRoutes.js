import express from "express";
import {createWalletController,getWalletBalanceController,importWalletController,sendTransactionController} from "../controllers/walletController.js";

const router = express.Router();

router.post("/create", createWalletController);
router.post("/import", importWalletController);
router.post("/balance",getWalletBalanceController);
router.post("/send",sendTransactionController);

export default router;
