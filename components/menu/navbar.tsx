"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { MobileMenu } from "./mobile-menu";

export const Navbar = () => {
  return (
    <nav className="fixed z-20 inset-x-0 top-0 px-10 shadow-neonLight align-middle flex flex-row justify-between items-center w-full h-16 bg-background">
      <Link
        href={"/"}
        className="text-2xl font-bold text-primary min-w-[200px]"
      >
        Tube Mind Sync
      </Link>
      <div className="md:hidden text-muted-foreground">

        <MobileMenu/>
      </div>
      <div className="hidden md:flex flex-row gap-5 align-middle items-center justify-end w-full">
        <Link
          href={"/settings"}
          className="text-sm text-muted-foreground hover:text-primary"
        >
          Settings
        </Link>
        <Link
          href={"/"}
          className=""
        >
          <Button variant="destructiveLight">
            Upgrade
          </Button>
        </Link>
        <div className="flex flex-row justify-evenly items-center gap-5">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </nav>
  );
};
