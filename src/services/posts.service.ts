import { func } from "./firebase.service";
import { Post } from "src/types/post";

export const getPosts = async () => func<Post[]>("posts");
