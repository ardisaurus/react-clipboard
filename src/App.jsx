import { useState, Fragment } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useLocalStorage } from "./useStorage";
import uuid from "react-uuid";
import "./App.css";

function App() {
  const [newItemName, setNewItemName] = useState("");
  const [newItemValue, setNewItemValue] = useState("");
  const [clipboard, setClipboard] = useLocalStorage("clipboard", []);

  const addItem = () => {
    const items = [
      ...clipboard,
      { id: uuid(), name: newItemName, value: newItemValue },
    ];
    setClipboard(items);
    resetForm();
  };

  const removeItem = (id) => {
    const items = clipboard.filter((item) => item.id !== id);
    setClipboard(items);
  };

  const resetForm = () => {
    setNewItemValue("");
    setNewItemName("");
  };

  return (
    <div className="App">
      <h1>React Clipboard</h1>
      {clipboard.map((item) => (
        <div key={item.id}>
          {item.name} -{" "}
          <CopyToClipboard
            text={item.value}
            // onCopy={() => this.setState({ copied: true })}
          >
            <button>Copy</button>
          </CopyToClipboard>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      {clipboard.length > 0 ? (
        <Fragment>
          <hr />
          <button onClick={() => setClipboard([])}>Clear</button>
        </Fragment>
      ) : null}
      <hr />
      <div>Add New Item</div>
      <div>
        <label>Name </label>
        <input
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
      </div>
      <div>
        <label>Value </label>
        <input
          value={newItemValue}
          onChange={(e) => setNewItemValue(e.target.value)}
        />
      </div>

      <button onClick={addItem}>Save</button>
      <button onClick={resetForm}>Reset</button>
    </div>
  );
}

export default App;
