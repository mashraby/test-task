import { apiInstance } from "@/lib/api";
import { db } from "@/lib/database/firebase";
import { handleError } from "@/lib/utils";
import { CreatePostParams, UpdatePostParams } from "@/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

async function getPosts() {
  try {
    const posts = await apiInstance.get("/posts").then((res) => res.data);

    return posts;
  } catch (err) {
    handleError(err);
  }
}

async function createPost(params: CreatePostParams) {
  try {
    return await apiInstance.post("/posts", params).then((res) => res.data);
  } catch (err) {
    handleError(err);
  }
}

async function createPostToFirebase(params: CreatePostParams) {
  try {
    return await addDoc(collection(db, "own_posts"), params);
  } catch (err) {
    handleError(err);
  }
}

async function getOwnPosts(userId: string) {
  try {
    const q = query(collection(db, "own_posts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => doc.data());

    return posts;
  } catch (err) {
    handleError(err);
  }
}

async function updatePost(postId: string, params: UpdatePostParams) {
  try {
    const q = query(collection(db, "own_posts"), where("id", "==", +postId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Post not found");
    }

    const docRef = querySnapshot.docs[0].ref;
    await updateDoc(docRef, { ...params });
    return { success: true };
  } catch (err) {
    handleError(err);
  }
}

async function deletePost(postId: string) {
  try {
    const q = query(collection(db, "own_posts"), where("id", "==", +postId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Post not found");
    }

    const docRef = querySnapshot.docs[0].ref;
    await deleteDoc(docRef);
    return { success: true };
  } catch (err) {
    handleError(err);
  }
}

export {
  getPosts,
  createPost,
  createPostToFirebase,
  getOwnPosts,
  updatePost,
  deletePost,
};
