import React, { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("deposit");

  const createAccount = async () => {
    await fetch("http://localhost:8080/api/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    });
    setName("");
    fetchAccounts();
  };

  const transact = async (id) => {
    await fetch(
      `http://localhost:8080/api/transaction/${id}?amount=${amount}&type=${type}`,
      { method: "POST" }
    );
    fetchAccounts();
  };

  const fetchAccounts = async () => {
    const res = await fetch("http://localhost:8080/api/account");
    const data = await res.json();
    setAccounts(data);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bank App</h2>

      <input
        placeholder="Account Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={createAccount}>Create Account</button>

      <h3>Accounts</h3>

      {accounts.map((acc) => (
        <div key={acc.id}>
          <p>
            {acc.name} - Balance: ₹{acc.balance}
          </p>

          <input
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
          />

          <select onChange={(e) => setType(e.target.value)}>
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
          </select>

          <button onClick={() => transact(acc.id)}>Submit</button>
        </div>
      ))}
    </div>
  );
}

export default App;
