"use client";

import { NavBar } from "./Navbar";
import Link from "next/link";
import React from "react";
import Footer from "./Footer";
import Image from "next/image";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="mx-auto p-4 max-w-[750px]">
      <header className="mb-2">
        <NavBar />
        <div className="flex items-center gap-2">
          <Image
            src="/blue-sphere.png"
            height={60}
            width={60}
            alt="Blue spheres banner image"
          />
          <div className="flex flex-col">
            <Link href={"/"} className="hover:cursor-pointer hover:underline">
              <h1 className="text-2xl font-bold  text-gray-800 ">ben-jiito</h1>
            </Link>
          </div>
        </div>
      </header>
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
};
