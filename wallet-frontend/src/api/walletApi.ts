export interface WalletData{
    address: string;
    privateKey: string;
    mnemonic: string;
}

export interface BalanceData{
    address: string;
    balance: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createWallet():Promise<WalletData>{
    const response = await fetch(`${API_BASE_URL}/create`,{
        method: "POST",
    });
    if(!response.ok) throw new Error("Failed to create wallet");
    return response.json();
}

export async function importWallet(mnemonic: string):Promise<WalletData>{
    const response = await fetch(`${API_BASE_URL}/import`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({mnemonic})
    });
    if(!response.ok) throw new Error("Failed to import wallet");
    return response.json();
}

export async function getWalletBalance(address:string):Promise<BalanceData>{
    const response = await fetch(`${API_BASE_URL}/balance`,{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify({address}),
    })
    if(!response.ok) throw new Error("Failed to fetch balance");
    return response.json();
    
}

export async function sendTransaction(privateKey:string,to:string,amount:string):Promise<{transactionHash:string}>{
    const response = await fetch(`${API_BASE_URL}/send`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({privateKey,to,amount}),
    });

    if(!response.ok) throw new Error("Failed to send transaction");
    return response.json();
}

