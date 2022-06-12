import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Posts from "../components/PostsWithService";

jest.mock("axios");
describe("Posts component", () => {

  describe("when user loads the component", () => {
    it("should list posts", async () => {
      const posts = {
        data: [
          {
            id: 1,
            title: "My post",
            body: "lorem ipsum",
          },
        ],
      };
      axios.get.mockResolvedValueOnce(posts);
      render(<Posts />);

      const post = await screen.findByRole("heading", { name: "My post" });
      expect(post).toBeInTheDocument();
    });
  });

  describe("when user submits a new post", () => {
    it("should list new post", async () => {
      axios.get.mockResolvedValueOnce({ data: [] });
      render(<Posts />);

      const newPost = {
        id: 2,
        title: "My new awesome post",
        content: "An interesting block of text",
      };
      axios.post.mockResolvedValueOnce({ data: newPost });
      const titleInput = screen.getByLabelText(/title/i);
      userEvent.type(titleInput, newPost.title);

      const contentInput = screen.getByLabelText(/content/i);
      userEvent.type(contentInput, newPost.content);

      const button = screen.getByRole("button", { name: /submit/i });
      userEvent.click(button);

      const createdPost = await screen.findByRole("heading", {
        name: newPost.title,
      });
      expect(createdPost).toBeInTheDocument();
    });
  });
});
