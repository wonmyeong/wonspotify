const clientId = "4b80e1f0ce6e4ad1b024b23ae37a05c2";
const clientSecret = "51faffc22d5d4938a72c4cb2f87bbbda";
let token;

const genre = document.getElementById("genre-list");

const _getToken = async () => {
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
    // body: "grant_type = client_credentials",
    //공백이 있으면 안된다??? 이건 뭐냐
  });

  const data = await result.json();
  token = data.access_token;
  return token;
};
//token값을 가져오기 위한 코드이다. 바로 _getToken의 return 값으로 가져올 수가 없다. 비동기식 표현 때문인데 정확히 이유는 모르겠다!!
_getToken().then((token) => {
  _getGenres(token); // Log the token when the promise is resolved
});

const _getGenres = async (token) => {
  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories?locale=sv_US`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  const data = await result.json();
  const genreData = data.categories.items;
  console.log(data.categories.items);

  let genreHTMl = genreData
    .map(
      (genre) => `<li onclick=moveToGenre(${genre.id})>${genre.name}</li>
    `
    )
    .join("");

  genre.innerHTML = genreHTMl;
};
const moveToGenre = (id) => {
  console.log("click");
};
