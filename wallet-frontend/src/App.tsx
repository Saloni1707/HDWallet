import { useState } from "react";
import {
  createWallet,
  importWallet,
  getWalletBalance,
  type WalletData,
  type BalanceData,
} from "./api/walletApi";
import SendTransaction from "./component/SendTransaction";
import "./App.css";

function App() {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [balance, setBalance] = useState<BalanceData | null>(null);
  const [mnemonicInput, setMnemonicInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleCreateWallet = async () => {
    try {
      const data = await createWallet();
      setWallet(data);
      setBalance(null);
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const handleImportWallet = async () => {
    try {
      const data = await importWallet(mnemonicInput.trim());
      setWallet(data);
      setBalance(null);
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const handleGetBalance = async () => {
    if (!wallet) return;
    try {
      const data = await getWalletBalance(wallet.address);
      setBalance(data);
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="wallet-container">
      <h1 className="app-title fade">Web3 Wallet</h1>

      <div className="section-card fade">
        <h2>Create Wallet</h2>
        <button onClick={handleCreateWallet}>Create New Wallet</button>
      </div>

      <div className="section-card fade">
        <h2>Import Wallet</h2>
        <input
          type="text"
          placeholder="Enter mnemonic phrase"
          value={mnemonicInput}
          onChange={(e) => setMnemonicInput(e.target.value)}
        />
        <button onClick={handleImportWallet}>Import Wallet</button>
      </div>

      {wallet && (
        <div className="section-card fade wallet-info">
          <h2>Wallet Details</h2>

          <p>
            <span className="label">Address:</span> {wallet.address}
          </p>
          <p>
            <span className="label">Private Key:</span> {wallet.privateKey}
          </p>
          <p>
            <span className="label">Mnemonic:</span> {wallet.mnemonic}
          </p>

          <button onClick={handleGetBalance}>Get Balance</button>
        </div>
      )}

      {balance && (
        <div className="section-card fade balance-info">
          <h2>Wallet Balance</h2>
          <p>
            <span className="label">Address:</span> {balance.address}
          </p>
          <p>
            <span className="label">Balance:</span> {balance.balance} ETH
          </p>
        </div>
      )}

      
      {error && (
        <div className="section-card danger-card fade">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}

      
      {wallet && (
        <div className="section-card fade">
          <SendTransaction privateKey={wallet.privateKey} />
        </div>
      )}
    </div>
  );
}

export default App;
