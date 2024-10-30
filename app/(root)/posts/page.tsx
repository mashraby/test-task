import React from "react";
import { getOwnPosts, getPosts } from "@/services/post.service";
import { getUsers } from "@/services/user.service";
import { IPost, IUser } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreatePostModal from "./components/create";
import { auth, currentUser } from "@clerk/nextjs/server";
import Actions from "./components/actions";

export default async function PostsPage() {
  const { userId } = await auth();
  const user = await currentUser();
  const posts = (await getPosts()) as IPost[];
  const users = (await getUsers()) as IUser[];
  const ownPosts = (await getOwnPosts(userId!)) as IPost[];

  console.log(userId);

  console.log(ownPosts);

  const usersMap = new Map<number, IUser>();
  users.forEach((user) => usersMap.set(user.id, user));

  return (
    <main className="bg-background min-h-screen py-6">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex justify-between items-center space-y-4 mb-6">
          <h1 className="text-xl font-bold">Posts</h1>
          <CreatePostModal userId={userId!} />
        </div>
        <div className="space-y-4">
          {ownPosts.length > 0 &&
            ownPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
              >
                <div className="flex justify-between items-start">
                  {user && (
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.fullName}`}
                          alt={user.fullName!}
                        />
                        <AvatarFallback>
                          {user.fullName!.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{user.fullName}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                  )}
                  <Actions post={post} />
                </div>
                <h2 className="text-lg font-semibold mt-4 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{post.body}</p>
              </div>
            ))}

          {posts.map((post) => {
            const user = usersMap.get(post.userId);
            return (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
              >
                {user && (
                  <div className="flex items-center space-x-3 mb-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
                        alt={user.name}
                      />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        @{user.username}
                      </p>
                    </div>
                  </div>
                )}
                <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
