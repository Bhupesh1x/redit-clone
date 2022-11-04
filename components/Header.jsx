import Image from "next/image";
import React from "react";
import {
  ChevronDownIcon,
  HomeIcon,
  SearchIcon,
  MenuIcon,
} from "@heroicons/react/solid";
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

function Header() {
  const { data: session } = useSession();
  return (
    <header className=" sticky top-0 z-50 flex items-center px-4 py-2 shadow-sm bg-white">
      <Link href="/">
        <div className=" flex items-center space-x-1 flex-shrink-0 cursor-pointer">
          <div className="relative bg-[#F74201] p-1.5 rounded-full">
            <Image
              src="https://img.icons8.com/ios-glyphs/30/FFFFFF/reddit.png"
              layout="fill"
              objectfit="contain"
              width={30}
              height={30}
              alt=""
            />
          </div>
          <p className="font-semibold text-lg">reddit</p>
        </div>
      </Link>
      <div className="flex items-center mx-7 xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="ml-2 flex-1 hidden lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      {/* Search Box */}

      <form className="flex flex-1 items-center border border-gray-200 px-3 py-1 bg-gray-100 rounded-lg">
        <SearchIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search Reddit"
          className="flex-1 outline-none bg-transparent ml-2"
        />
        <button hidden type="submit" />
      </form>

      <div className="items-center text-gray-500 mx-5 space-x-2 hidden lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>
      <div className="lg:hidden ml-5 ">
        <MenuIcon className="icon" />
      </div>

      {/* Sign In / Sign Out Button */}

      <div>
        <div
          className="hidden lg:inline-flex items-center cursor-pointer space-x-2 border border-gray-100 p-2"
          onClick={!session ? signIn : signOut}
        >
          <Image
            src="https://img.icons8.com/ios-glyphs/30/9BA3AF/reddit.png"
            layout="fill"
            width={20}
            height={20}
            alt=""
          />
          <p className="text-gray-400">
            {!session ? (
              "Sign In"
            ) : (
              <div className="flex items-center space-x-2">
                <span className="truncate text-xs ml-1 text-black">
                  {session?.user?.name}
                  <br />
                  <span className="text-gray-400">1 karma</span>
                </span>
                <ChevronDownIcon className="h-5" />
              </div>
            )}
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
