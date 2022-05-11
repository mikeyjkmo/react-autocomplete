import { useCallback, useState } from "react";
import { fetchMarvelCharacters } from "./marvelApi";
import { AutocompleteDropdown } from "./AutocompleteDropdown";

import "./App.css";

function App() {
  const [searchButtonDisabled, setSearchButtonDisabled] = useState(true);

  const renderItems = useCallback(async (text) => {
    if (text.length === 0) {
      return [];
    }

    return fetchMarvelCharacters(text).then((res) =>
      res.data.results.map((character) => character.name)
    );
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
            renderItems={renderItems}
            onTextInput={onTextInput}
          />
          <button className="form-button" disabled={searchButtonDisabled}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
