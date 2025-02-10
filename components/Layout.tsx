"use client";

import { NavBar } from "./Navbar";
import Link from "next/link";
import React from "react";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="mx-auto p-4 max-w-[750px]">
      <header className="mb-8">
        <NavBar />
        <div className="mt-4">
          <Link href={"/"} className="hover:cursor-pointer hover:underline">
            <h1 className="text-2xl font-bold mb-2 text-gray-800">
              Ben Allan-Rahill
            </h1>
          </Link>
          <p className="italic text-sm font-normal text-gray-500">
            ben [at] [<i>this domain</i>]
          </p>
        </div>
      </header>
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
};
