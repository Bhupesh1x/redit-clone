import { ChevronUpIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";
import Avatar from "./Avatar";

function SubredditRows({ index, topic }) {
  return (
    <div className="flex items-center px-4 py-2 last:rounded-b border-t space-x-2 bg-white">
      <p>{index + 1}</p>
      <ChevronUpIcon className="h-4 w-4 text-green-400" />
      <Avatar seed={`subbreddit/${topic}`} />
      <p className="flex-1 truncate">r/{topic}</p>
      <Link href={`/subreddit/${topic}`}>
        <div className=" bg-blue-400 rounded-full p-1 text-white font-bold px-3">
          View
        </div>
      </Link>
    </div>
  );
}

export default SubredditRows;
