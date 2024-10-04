"use client";

import CircleLogo from "@/components/Icons/CircleLogo";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Link from "next/link";
import { useState } from "react";

interface INavbarContent {
  href: string;
  text: string;
}

const navbarContent: INavbarContent[] = [
  {
    href: "/settings",
    text: "Settings",
  },
];

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState<boolean>(false);

  return (
    <nav className="top-0 left-0 fixed w-full bg-white border-b shadow-sm z-40">
      <div className="hidden h-16 px-8 md:m-auto md:flex md:flex-row md:justify-between">
        <Link href="/" className="self-center">
          <img src="/assets/circle-logo.png" className="w-36 h-10" alt="Logo" />
        </Link>
        <div className="flex flex-row gap-4 items-center">
          <div className="hidden flex-row gap-8 md:flex">
            {navbarContent.map(({ href, text }) => (
              <Link
                href={href}
                className="font-light text-sm"
                key={href + text}
              >
                {text}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex px-4 m-auto flex-row justify-between h-16 md:hidden">
        <div className="flex flex-row items-center gap-4">
          <div
            className="cursor-pointer select-none"
            onClick={() => setShowNavbar(!showNavbar)}
          >
            {!showNavbar ? (
              <Bars3Icon className="h-8 w-8" />
            ) : (
              <XMarkIcon className="h-8 w-8" />
            )}
          </div>
          <Link href="/">
            <img
              src="/assets/circle-logo.png"
              className="w-36 h-10"
              alt="Logo"
            />
          </Link>
        </div>
      </div>
      <div className={classNames(showNavbar ? "z-40 w-dvw h-dvh" : "hidden")}>
        <div className="flex flex-col px-16 py-4 gap-4">
          {navbarContent.map(({ href, text }) => (
            <Link href={href} className="text-lg" key={href + text}>
              {text}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
