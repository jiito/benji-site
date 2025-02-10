"use client";

import Link from "next/link";

const SOCIAL_LINKS = [
  {
    name: "twitter",
    href: "https://twitter.com/beeejar",
  },
  {
    name: "github",
    href: "https://github.com/jiito",
  },
];

const Footer = () => {
  return (
    <div className="mt-10 text-gray-500">
      <hr className="w-1/4 mx-auto border-gray-300" />
      <div className="mx-auto flex flex-col items-center justify-center mt-4">
        <div className="flex w-full flex-row justify-center">
          {SOCIAL_LINKS.map((s) => (
            <Link
              key={s.name}
              href={s.href}
              className="mr-2 hover:text-gray-700 transition-colors"
            >
              {s.name}
            </Link>
          ))}
        </div>
        <p className="mt-2 text-sm">built by benji ar © 2023</p>
      </div>
    </div>
  );
};

export default Footer;
