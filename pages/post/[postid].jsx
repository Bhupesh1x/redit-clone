import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Avatar from "../../components/Avatar";
import Post from "../../components/Post";
import TimeAgo from "react-timeago";
import { ADD_COMMENT } from "../../graphql/mutations";
import { GET_POST_BY_ID } from "../../graphql/queries";

function PostPage() {
  const {
    query: { postid },
  } = useRouter();
  const router = useRouter();
  const { data } = useQuery(GET_POST_BY_ID, {
    variables: {
      post_id: postid,
    },
  });
  const { data: session } = useSession();

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_ID, "getPostListByPostId"],
  });

  const post = data?.getPostListByPostId;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  async function onSubmit(formData) {
    const notification = toast.loading("Posting your comment...");

    await addComment({
      variables: {
        post_id: postid,
        username: session?.user?.name,
        text: formData.comment,
      },
    });
    toast.success("Comment Successfully Posted!", {
      id: notification,
    });
    setValue("comment", "");
  }

  console.log(post);

  return (
    <div className="mx-auto my-7 max-w-4xl hover:border hover:border-gray-600">
      <Post post={post} isNoBorderRequired={true} />

      <div className="bg-white p-5 pl-16 rounded-b-md -mt-1">
        <p className="text-sm">
          Comment as <span className="text-red-500">{session?.user?.name}</span>
        </p>
        <form
          action=""
          className="flex flex-col space-y-2 mt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            {...register("comment")}
            placeholder={
              !session
                ? `Please sign in to comment`
                : `What are your thoughts ? ${session?.user?.name}`
            }
            className="h-24 border border-gray-200 p-2 pl-4 outline-none rounded-md disabled:bg-gray-50"
          />
          <button
            type="submit"
            disabled={!watch("comment")}
            className=" bg-red-400 cursor-pointer p-2 rounded-full text-white font-semibold disabled:bg-gray-400"
          >
            Comment
          </button>
        </form>
        <hr className="mt-2 border border-gray-200" />
        <div className="mt-5 relative ">
          {post?.comments?.map((comment) => (
            <div key={comment.id} className="space-y-4">
              <hr className="absolute top-10 left-5 z-0 h-16 border" />
              <div className="flex items-center space-x-2">
                <Avatar seed={comment.username} />
                <div>
                  <p className="text-xs text-gray-400">
                    <span className="text-black font-semibold">
                      {comment.username}{" "}
                    </span>
                    &#x2022; <TimeAgo date={comment.created_at} />{" "}
                  </p>
                  <p className="font-semibold">{comment.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostPage;
