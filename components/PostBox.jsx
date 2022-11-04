import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { ADD_POST, ADD_SUBREDDIT } from "../graphql/mutations";
import client from "../applolo-client";
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from "../graphql/queries";
import toast from "react-hot-toast";

function PostBox({ subreddit }) {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POSTS, "getPostList"],
  });
  const [addSubreddit] = useMutation(ADD_SUBREDDIT);
  const [isImageBoxOpen, setIsImageBoxOpen] = useState(false);

  async function onSubmit(formData) {
    const notification = toast.loading("Creating new post ...");

    try {
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: { topic: subreddit || formData.subreddit },
      });

      const subRedditExist = getSubredditListByTopic?.length > 0;

      if (!subRedditExist) {
        await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        });

        const image = formData.postImage || "";

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            title: formData.postTitle,
            username: session?.user?.name,
            image: image,
            subreddit_id: newSubreddit.id,
          },
        });
        console.log("New New Post Created", newPost);
        toast.success("New Post Created", {
          id: notification,
        });
      } else {
        // use existing subreddit
        const image = formData.postImage || "";

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            title: formData.postTitle,
            username: session?.user?.name,
            image: image,
            subreddit_id: getSubredditListByTopic[0].id,
          },
        });
        console.log("New New Post Created", newPost);
        toast.success("New Post Created", {
          id: notification,
        });
      }

      setValue("postBody", "");
      setValue("postTitle", "");
      setValue("postImage", "");
      setValue("subreddit", "");
    } catch (error) {
      toast.error("Whoops! There is an error creating post", {
        id: notification,
      });
    }
  }

  return (
    <form
      className="bg-white rounded-md border border-gray-300 sticky top-16 p-2 z-50"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          {...register("postTitle", { required: true })}
          disabled={!session}
          type="text"
          placeholder={
            !session ? "Sign in to post" : "Create a post by entering a title!"
          }
          className="flex-1 bg-gray-100 rounded-md p-2 pl-5 outline-none"
        />
        <PhotographIcon
          className={`h-6 text-gray-300 cursor-pointer ${
            isImageBoxOpen && "text-blue-300"
          }`}
          onClick={() => setIsImageBoxOpen(!isImageBoxOpen)}
        />
        <LinkIcon className="h-6 text-gray-300" />
      </div>
      {!!watch("postTitle") && (
        <div className="my-2">
          <div className="flex items-center">
            <p className="min-w-[90px]">Body : </p>
            <input
              {...register("postBody")}
              type="text"
              placeholder="Text (Optional)"
              className="flex-1 bg-blue-50 p-2 outline-none rounded-md m-2"
            />
          </div>
          {subreddit ? (
            <div className="flex items-center">
              <p className="min-w-[90px]">Subreddit : </p>
              <input
                {...register("subreddit")}
                type="text"
                disabled
                placeholder={`Create a post in r/${subreddit}`}
                className="flex-1 bg-blue-50 p-2 outline-none rounded-md m-2"
              />
            </div>
          ) : (
            <div className="flex items-center">
              <p className="min-w-[90px]">Subreddit : </p>
              <input
                {...register("subreddit", { required: true })}
                type="text"
                placeholder="i.e. reactjs"
                className="flex-1 bg-blue-50 p-2 outline-none rounded-md m-2"
              />
            </div>
          )}
          {isImageBoxOpen && (
            <div className="flex items-center">
              <p className="min-w-[90px]">Image Url : </p>
              <input
                {...register("postImage")}
                type="text"
                placeholder="Image Url (Optional)"
                className="flex-1 bg-blue-50 p-2 outline-none rounded-md m-2"
              />
            </div>
          )}
          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 text-red-500 p-2">
              {errors?.postTitle?.type === "required" && (
                <p>A Post Title Is Required</p>
              )}
              {errors?.subreddit?.type === "required" && (
                <p>A Subreddit Is Required</p>
              )}
            </div>
          )}

          {!!watch("postTitle") && (
            <button
              className="w-full p-2 bg-blue-400 rounded-full text-white"
              type="submit"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  );
}

export default PostBox;
