import { useRouter } from "next/router";
import React from "react";
import Avatar from "../../components/Avatar";
import Feed from "../../components/Feed";
import PostBox from "../../components/PostBox";

function Subreddit() {
  const {
    query: { topic },
  } = useRouter();
  return (
    <div className="h-24 bg-red-400 p-8">
      <div className="bg-white mt-10 -mx-8">
        <div className="mx-auto flex max-w-4xl items-center space-x-4 pb-3">
          <div className="-mt-5">
            <Avatar seed={topic} large />
          </div>
          <div>
            <p className="text-3xl font-semibold">
              Welcome to the r/{topic} subreddit
            </p>
            <p className="text-sm text-gray-400">r/{topic}</p>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-5 pb-10">
        <PostBox subreddit={topic} />
        <Feed topic={topic} />
      </div>
    </div>
  );
}

export default Subreddit;
