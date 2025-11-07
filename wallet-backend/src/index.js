import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import walletRoutes from "./routes/walletRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/wallet",walletRoutes);

app.get("/",(req,res) => {
    res.send("Wallet Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server is running on port ${PORT}`));