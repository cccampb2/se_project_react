const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function addNewItem({ name, imageUrl, weather }, jwt) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    body: JSON.stringify({ name: name, imageUrl: imageUrl, weather: weather }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse);
}

function deleteCard({ _id }, jwt) {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse);
}

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export { getItems, addNewItem, deleteCard, checkResponse };
