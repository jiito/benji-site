"use client";

import Link from "next/link";

const NAVLINKS = [
  {
    name: "builds",
    link: "/work",
  },
  {
    name: "words",
    link: "/words",
  },
  {
    name: "dev",
    link: "https://github.com/jiito",
  },
];

export const NavBar = () => {
  return (
    <div className="mb-4">
      <nav className="flex text-base justify-between text-blue-600 pb-1 border-b border-[#f3f3f3]">
        {NAVLINKS.map((item) => (
          <Link
            href={item.link}
            key={item.name}
            className="hover:text-blue-800 transition-colors"
          >
            {"/" + item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};
