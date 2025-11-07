import { createWallet,importWalletFromMnemonic,getWalletBalance } from "../services/walletService.js";

export async function importWallet(req,res){
    try{
        const {mnemonic} = req.body;
        if(!mnemonic){
            return res.status(400).json({error:"Mnemonic phrase is required"});
        }
        const walletData = await importWalletFromMnemonic(mnemonic);
        return res.status(200).json(walletData);
    }catch(error){
        console.error("Error importing wallet:", error);
        return res.status(500).json({error:error.message});
    }
}

export async function createWalletController(req, res) {
  try {
    const wallet = await createWallet();
    return res.status(200).json(wallet);
  } catch (error) {
    console.error("Error creating wallet:", error);
    return res.status(500).json({ error: error.message });
  }
}

export async function importWalletController(req, res) {
  try {
    const { mnemonic } = req.body;
    if (!mnemonic) {
      return res.status(400).json({ error: "Mnemonic phrase is required" });
    }

    const walletData = await importWalletFromMnemonic(mnemonic);
    return res.status(200).json(walletData);
  } catch (error) {
    console.error("Error importing wallet:", error);
    return res.status(500).json({ error: error.message });
  }
}

export async function getWalletBalanceController(req, res) {
  try {
    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ error: "Wallet address is required" });
    }

    const balance = await getWalletBalance(address);
    return res.status(200).json({ address, balance });
  } catch (error) {
    console.error("Error fetching wallet balance:", error);
    return res.status(500).json({ error: error.message });
  }
}