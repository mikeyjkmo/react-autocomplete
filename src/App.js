import { useState } from "react";
import "./App.css";

const ITEMS = ["hello", "goodbye", "foobar"];

function AutocompleteDropdown() {
  const [text, setText] = useState("");
  const [inFocus, setInFocus] = useState(false);

  function filteredItems() {
    return ITEMS.filter((item) => item.startsWith(text));
  }

  function dropDown() {
    if (!inFocus) {
      return null;
    }

    return (
      <div className="autocomplete-dropdown">
        {filteredItems().map((item) => (
          <div key={item}>
            <button onMouseDown={e => e.preventDefault()} onClick={() => {
              setText(item);
            }}>{item}</button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="autocomplete">
      <input
        type="text"
        className="autocomplete-input"
        value={text}
        onInput={(e) => setText(e.target.value)}
        onFocus={() => setInFocus(true)}
        onBlur={() => setInFocus(false)}
      />
      {dropDown()}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <AutocompleteDropdown />
    </div>
  );
}

export default App;
