import axios from "axios";

export function createPost(data) {
  return axios
    .post("https://jsonplaceholder.typicode.com/posts", data)
    .then((response) => response.data);
}

export function getAllPosts() {
  return axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.data);
}
