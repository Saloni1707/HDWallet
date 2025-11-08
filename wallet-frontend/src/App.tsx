import {useState} from 'react';
import {createWallet,importWallet,getWalletBalance,type WalletData,type BalanceData} from './api/walletApi';
import SendTransaction from './component/SendTransaction';

function App(){
    const [wallet,setWallet] = useState<WalletData | null>(null);
    const [balance,setBalance] = useState<BalanceData | null>(null);
    const[mnemonicInput, setMnemonicInput] = useState<string>("");
    const [error,setError] = useState<string>("");

    const handleCreateWallet = async() =>{
        try{
            const data = await createWallet();
            setWallet(data);
            setBalance(null);
            setError("");
        }catch(err: unknown){
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(String(err));
            }
        }
    }

    const handleImportWallet = async() =>{
        try{
            const data = await importWallet(mnemonicInput.trim());
            setWallet(data);
            setBalance(null);
            setError("");
        }catch(err:unknown){
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(String(err));
            }
        }
    };

    const handleGetBalance = async() =>{
        
            if(!wallet) return;
            try{
                const data = await getWalletBalance(wallet.address);
                console.log(data);
                setBalance(data);
                setError("");
            }catch(err: unknown ){
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(String(err));
                }
            }
    };

    return(
        <div style={{padding:"20px", fontFamily:"Arial"}}>
            <h1>Web wallet</h1>
            <button onClick={handleCreateWallet} style={{marginRight:"10px"}}>Create Wallet</button>
            <br/><br/>
            <div style={{marginTop:20}}>
                <input
                type="text"
                placeholder='Enter mnemonic to import'
                value={mnemonicInput}
                onChange={(e)=>setMnemonicInput(e.target.value)}
                style={{width:"300px", marginRight:"10px"}}
                />
                <button onClick={handleImportWallet}>Import Wallet</button>
            </div>

            {wallet && (<div style={{marginTop:20}}>
                <h3>Wallet Details:</h3>
                <p><strong>Address:</strong> {wallet.address}</p>
                <p><strong>Private Key:</strong> {wallet.privateKey}</p>
                <p><strong>Mnemonic:</strong> {wallet.mnemonic}</p>
                <button onClick={handleGetBalance}>Get Balance</button>
            </div>
            )}
            
            {balance &&(<div style={{marginTop:20}}>
                <h3>Balance:</h3>
                <p><strong>Address:</strong> {balance.address}</p>
                <p><strong>Balance:</strong> {balance.balance} ETH</p>
            </div>
            )}

            {error &&(<div style={{marginTop:20, color:"red"}}>
                <h3>Error:</h3>
                <p>{error}</p>
            </div>
            )}
            
            {wallet && (<SendTransaction privateKey={wallet.privateKey} />)}
        </div>
    )
}

export default App;