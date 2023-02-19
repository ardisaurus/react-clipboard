import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useLocalStorage } from "./useStorage";
import uuid from "react-uuid";
import "./App.css";

function App() {
  const [newItemName, setNewItemName] = useState("");
  const [newItemNValue, setNewItemValue] = useState("");
  const [clipboard, setClipboard, removeClipboard] = useLocalStorage(
    "clipboard",
    []
  );

  const addItem = () => {
    const items = [
      ...clipboard,
      { id: uuid(), name: newItemName, value: newItemNValue },
    ];
    setClipboard(items);
    setNewItemValue("");
    setNewItemName("");
  };

  return (
    <div className="App">
      <h1>Vite + React</h1>
      {clipboard.map((item) => (
        <div key={item.id}>
          {item.name} -{" "}
          <CopyToClipboard
            text={item.value}
            // onCopy={() => this.setState({ copied: true })}
          >
            <button>Copy</button>
          </CopyToClipboard>
        </div>
      ))}
      <div>---Add---</div>
      <div>
        <label>Name </label>
        <input onChange={(e) => setNewItemName(e.target.value)} />
      </div>
      <div>
        <label>Value </label>
        <input onChange={(e) => setNewItemValue(e.target.value)} />
      </div>

      <button onClick={addItem}>Save</button>
    </div>
  );
}

export default App;
