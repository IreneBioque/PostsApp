import { useEffect, useState } from "react";
import Form from "./Form";
import Header from "./Header";
import "../styles.scss"

function Posts() {
  const [posts, setPosts] = useState([]);

  function createPost(data) {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((newPost) => setPosts([newPost, ...posts]));
  }

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((posts) => setPosts(posts));
  }, []);

  return (
    <div>
      <Header />
      <Form submit={createPost} />

      <section className="sectionPosts">
        {posts.map((post) => (
          <article key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Posts;
