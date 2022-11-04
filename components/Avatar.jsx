import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

function Avatar({ large, seed }) {
  const { data: session } = useSession();
  return (
    <div className=" overflow-hidden">
      <Image
        src={
          session
            ? `https://avatars.dicebear.com/api/adventurer/${session?.user?.name}.svg`
            : seed
            ? `https://avatars.dicebear.com/api/adventurer/${seed}.svg`
            : `https://avatars.dicebear.com/api/adventurer/pla.svg`
        }
        layout="fill"
        height={!large ? 45 : 60}
        width={!large ? 45 : 60}
        className={`relative h-10 w-10 rounded-full border border-gray-300 bg-white ${
          large && "h-20 w-20"
        }`}
        alt=""
      />
    </div>
  );
}

export default Avatar;
