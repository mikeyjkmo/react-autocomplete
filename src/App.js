import { useCallback, useState } from "react";
import { fetchMarvelCharacters } from "./marvelApi";
import { AutocompleteDropdown } from "./AutocompleteDropdown";
import PropTypes from 'prop-types';

import "./App.css";

function FormButton({ disabled, children }) {
  const classes = [
    "form-button",
  ]

  if (disabled) {
    classes.push("disabled");
  }

  return (
      <button className={classes.join(" ")}>{ children }</button>
  );
}

FormButton.propTypes = {
  disabled: PropTypes.bool,
}

function App() {
  const [autoCompletionItems, setAutoCompletionItems] = useState([]);
  const [searchButtonDisabled, setSearchButtonDisabled] = useState(true);

  const onDebouncedTextInput = useCallback((text) => {
    if (text.length === 0) {
      setAutoCompletionItems([]);
      return;
    }

    return fetchMarvelCharacters(text)
      .then((res) => res.data.results.map((character) => character.name))
      .then(setAutoCompletionItems);
  }, []);

  const onTextInput = useCallback((text) => {
    if (text.length > 0) {
      setSearchButtonDisabled(false);
    } else {
      setSearchButtonDisabled(true);
    }
  }, []);

  return (
    <div className="App">
      <div className="mvform">
        <div className="row field-name">Search</div>
        <div className="row">
          <AutocompleteDropdown
            autoCompletionItems={autoCompletionItems}
            onDebouncedTextInput={onDebouncedTextInput}
            onTextInput={onTextInput}
          />
          <FormButton disabled={searchButtonDisabled}>Search</FormButton>
        </div>
      </div>
    </div>
  );
}

export default App;
