import { useEffect, useState } from "react";
import { useDebounce } from "./utils";
import { fakeFetchMarvelCharacteres } from "./marvelApi";

import "./App.css";

function AutocompleteDropdown({
  debounceDelay = 1000,
  autoCompletionItems,
  onTextInput,
}) {
  const [text, setText] = useState("");
  const [inputRef, setInputRef] = useState();
  const [inFocus, setInFocus] = useState();
  const debouncedText = useDebounce(text, debounceDelay);

  useEffect(() => {
    onTextInput(debouncedText);
  }, [debouncedText, onTextInput]);

  function itemTextWithMatch(item) {
    const itemToCompare = item.toLowerCase();
    const textToCompare = text.toLowerCase();

    if (!itemToCompare.startsWith(textToCompare)) {
      return item;
    }

    const firstMatchingIndex = itemToCompare.indexOf(textToCompare);
    return (
      <>
        <span className="matching-letters">
          {item.substr(firstMatchingIndex, text.length)}
        </span>
        {item.substr(firstMatchingIndex + text.length, item.length)}
      </>
    );
  }

  function renderDropDown() {
    if (!inFocus) {
      return null;
    }

    return (
      <div className="autocomplete-dropdown">
        {autoCompletionItems.map((item) => (
          <div key={item}>
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setText(item);
                setInFocus(false);
                inputRef.blur();
              }}
            >
              {itemTextWithMatch(item)}
            </button>
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
        ref={(input) => setInputRef(input)}
        onFocus={() => setInFocus(true)}
        onBlur={() => setInFocus(false)}
      />
      {renderDropDown()}
    </div>
  );
}

function App() {
  const [autoCompletionItems, setAutoCompletionItems] = useState([]);

  const onTextInput = (text) => {
    return fakeFetchMarvelCharacteres(text)
      .then((res) => res.data.results.map((character) => character.name))
      .then(setAutoCompletionItems);
  };

  return (
    <div className="App">
      <AutocompleteDropdown
        autoCompletionItems={autoCompletionItems}
        onTextInput={onTextInput}
      />
    </div>
  );
}

export default App;
