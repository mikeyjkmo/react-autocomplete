export async function fetchMarvelCharacters(nameStartsWith) {
  if (!nameStartsWith || !nameStartsWith.length) {
    return {
      data: {
        results: [],
      },
    };
  }

  const res = await fetch(
    "https://gateway.marvel.com:443/v1/public/characters?" +
      new URLSearchParams({
        nameStartsWith,
        apikey: process.env.REACT_APP_MARVEL_API_KEY,
      })
  );
  return res.json();
}
