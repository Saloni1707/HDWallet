import {generateMnemonic} from "bip39";
import {ethers} from "ethers";

export async function createWallet(){
    const mnemonic = generateMnemonic();
    const wallet = ethers.Wallet.fromPhrase(mnemonic);

    return {
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic:mnemonic,
    };
}

//here we import existing wallet using mnemonic

export async function importWalletFromMnemonic(mnemonic){
    try{
        if(!mnemonic || mnemonic.trim().split(" ").length < 12){
            throw new Error("Invalid mnemonic phrase");
        }

        const wallet = ethers.Wallet.fromPhrase(mnemonic.trim());

        return {
            address : wallet.address,
            privateKey : wallet.privateKey,
            mnemonic : mnemonic.trim(),
        };
    }catch(error){
        throw new Error("Failed to import wallet: " + error.message);
    }
}

export async function getWalletBalance(address){
    try{
        if(!address) throw new Error("Wallet address is required");
        //connecting to sepolia testnet using infura
        const provider = new ethers.InfuraProvider("sepolia",process.env.INFURA_API_KEY);
        const balance = await provider.getBalance(address);
        const etherBalance = ethers.formatEther(balance);
        return {address, balance: etherBalance};
    }catch(error){
        throw new Error("Failed to fetch wallet balance: " + error.message);
    }
}

export async function sendTransaction(privateKey,to,amount){
    try{
        if(!privateKey || !to || !amount){
            throw new Error("Missing parameters");
        }
        const provider = new ethers.JsonRpcProvider(
            `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`
        );
        const wallet = new ethers.Wallet(privateKey,provider);

        const transaction = await wallet.sendTransaction({
            to,
            value:ethers.parseEther(amount), //convert eth to wei
        });
        await transaction.wait();
        return{
            transactionHash:transaction.hash,
        };
    }catch(error){
        throw new Error("Failed to send transaction: " + error.message);
    }
        
}