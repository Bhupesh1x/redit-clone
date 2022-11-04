import React, { useEffect, useState } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  GiftIcon,
  ShareIcon,
  BookmarkIcon,
  DotsHorizontalIcon,
  ChatIcon,
} from "@heroicons/react/outline";
import Avatar from "./Avatar";
import TimeAgo from "react-timeago";
import Link from "next/link";
import { Jelly } from "@uiball/loaders";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_VOTES_BY_POST_ID } from "../graphql/queries";
import { ADD_VOTE } from "../graphql/mutations";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

function Post({ post, isNoBorderRequired }) {
  if (!post)
    return (
      <div className="w-full flex items-center justify-center text-xl p-10">
        <Jelly size={50} color="#FF4501" />
      </div>
    );

  const { data, loading, error } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  });
  const [vote, setVote] = useState();
  const { data: session } = useSession();

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_ALL_VOTES_BY_POST_ID, "getVotesByPostId"],
  });

  useEffect(() => {
    const votes = data?.getVotesByPostId;

    const vote = votes?.find(
      (vote) => vote.username === session?.user?.name
    )?.upvote;

    setVote(vote);
  }, [data]);

  const uploadVote = async (isUpVote) => {
    if (!session) {
      toast.error("! You'll need to sign in to vote");
      return;
    }

    if (vote && isUpVote) return;
    if (vote === false && !isUpVote) return;

    console.log("Voating...", isUpVote);
    await addVote({
      variables: {
        post_id: post?.id,
        username: session?.user?.name,
        upvote: isUpVote,
      },
    });
  };

  const displayVotes = (data) => {
    const votes = data?.getVotesByPostId;

    const displayNumber = votes?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
      0
    );

    if (votes?.length === 0) return 0;

    if (displayNumber === 0) {
      return votes[0]?.upvote ? 1 : -1;
    }

    return displayNumber;
  };

  console.log("vote", vote);

  return (
    <Link href={`/post/${post?.id}`}>
      <div
        className={`flex bg-gray-50 border border-gray-300  rounded-md shadow-sm cursor-pointer ${
          !isNoBorderRequired && "hover:border-gray-600"
        }`}
      >
        {/* Votes */}
        <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
          <ArrowUpIcon
            className={`voteButton hover:text-blue-400 ${
              vote && "text-blue-400"
            }`}
            onClick={() => uploadVote(true)}
          />
          <p className="text-xs text-black font-bold">{displayVotes(data)}</p>
          <ArrowDownIcon
            className={`voteButton hover:text-red-400 ${
              vote === false && "text-red-400"
            }`}
            onClick={() => uploadVote(false)}
          />
        </div>

        {/* Body of Post */}

        <div className="p-3 pb-1">
          {/* Header */}

          <div className="flex items-center">
            <Avatar seed={post.subreddit[0].topic} />
            <p className="text-xs text-gray-500 space-x-2">
              <Link href={`/subreddit/${post?.subreddit[0].topic}`}>
                <span className="ml-2 text-black font-bold hover:text-blue-500 hover:underline">
                  r/{post.subreddit[0].topic}
                </span>
              </Link>{" "}
              &#x2022; Posted by u/
              {post.username} <TimeAgo date={post.created_at} />
            </p>
          </div>
          {/* Post Body */}
          <div>
            <p className="text-xl font-semibold">{post.title}</p>
            <p className="mt-2 text-sm font-light">{post.body}</p>
          </div>
          {/* Post Image */}
          <img src={post.image} alt="" className="w-full" />
          {/* Post Footer */}
          <div className="flex space-x-4">
            <div className="commentButtons">
              <ChatIcon className="h-6 w-6" />
              <p>{post.comments.length} Comments</p>
            </div>
            <div className="commentButtons">
              <GiftIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Awards</p>
            </div>
            <div className="commentButtons">
              <ShareIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Share</p>
            </div>
            <div className="commentButtons">
              <BookmarkIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Save</p>
            </div>
            <div className="commentButtons">
              <DotsHorizontalIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Post;
