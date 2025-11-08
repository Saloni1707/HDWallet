import {useState} from "react";
import {sendTransaction} from "../api/walletApi";

interface SendTransactionProps{
    privateKey:string;
}

export default function SendTransaction({privateKey}:SendTransactionProps){
    const [recipient,setRecipient] = useState("")
    const [amount,setAmount] = useState("")
    const [error,setError] = useState("")
    const [txHash,setTxHash] = useState("")

    const handleSend = async() => {
        if(!privateKey){
            setError("Sender private key is required")
            return;
        }
        if(!recipient || !amount){
            setError("Recipient address and amount are required")
            return;
        }

        try{
            setError("");
            setTxHash("");

            const result = await sendTransaction(privateKey,recipient,amount);
            setTxHash(result.transactionHash);
        }catch(err:unknown){
            if(err instanceof Error){
                setError(err.message);
            }else{
                setError(String(err));
            }
        }; 
    }

    return (
        <div style={{marginTop:"20px",border:"1px solid #ccc",padding:"20px",borderRadius:"5px"}}>
            <h3>Send ETH</h3>
            <div style={{marginTop:"10px"}}>
                <input 
                type="text"
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e)=>setRecipient(e.target.value)}
                style={{width:300,marginRight:"10px"}}
                />
            </div>
            <div style={{marginTop:"10px"}}>
                <input
                type="text"
                placeholder="Amount in ETH"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
                style={{width:300,marginRight:"10px"}}
                />
            </div>
            <button onClick={handleSend}>Send</button>
            {txHash && (
                <div style={{marginTop:"10px",color:"green"}}>
                    <strong>Transaction Hash:</strong> 
                    <p>Tx Hash: {txHash}</p>
                </div>
            )}
            {
                error && (
                    <div style={{marginTop:"10px",color:"red"}}>
                        <strong>Error:</strong>
                        <p>{error}</p>
                    </div>
                )
            }
        </div>
    )

}