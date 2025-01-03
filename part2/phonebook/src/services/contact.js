import axios from "axios";

function getAll() {
  return axios
    .get("http://localhost:3001/persons")
    .then((response) => response.data);
}

function create(newObject) {
  return axios
    .post("http://localhost:3001/persons", newObject)
    .then((response) => response.data);
}

function update(id, newObject) {
  return axios
    .put(`http://localhost:3001/persons/${id}`, newObject)
    .then((response) => response.data);
}

function remove(id) {
  return axios
    .delete(`http://localhost:3001/persons/${id}`)
    .then((response) => response.data);
}

export default { getAll, create, update, remove };
