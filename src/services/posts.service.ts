import { func } from "./firebase.service";
import { EmptyPost, Post } from "src/types/post";

export const getPosts = () => func<Post[]>("posts");

export const addPost = (post: EmptyPost) => func<Post>("addPost", post);
