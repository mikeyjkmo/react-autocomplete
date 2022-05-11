import { useEffect, useState } from "react";
import "./App.css";

// Hook - I did not write this hook
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

async function fakeFetchMarvelCharacteres(nameStartsWith) {
  return {
    data: {
      results: [
        { name: "iron man" },
        { name: "thor" },
        { name: "loki" },
        { name: "captain america" },
      ].filter(({ name }) => name.startsWith(nameStartsWith)),
    },
  };
}

function AutocompleteDropdown() {
  const [text, setText] = useState("");
  const [inputRef, setInputRef] = useState();
  const [inFocus, setInFocus] = useState();

  const [matchingItems, setMatchingItems] = useState([]);
  const debouncedText = useDebounce(text, 1000);

  useEffect(() => {
    fakeFetchMarvelCharacteres(debouncedText)
      .then((res) => res.data.results.map((character) => character.name))
      .then(setMatchingItems);
  }, [debouncedText]);

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
        {matchingItems.map((item) => (
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
        ref={input => setInputRef(input)}
        onFocus={() => setInFocus(true)}
        onBlur={() => setInFocus(false)}
      />
      {renderDropDown()}
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
