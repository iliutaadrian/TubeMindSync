"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { useState } from "react";

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="border-none shadow-neonLight">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-5 items-center w-full mt-5 text-foreground">
           <Link
            href={"/"}
            className="text-sm hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>         <Link
            href={"/quick-translate"}
            className="text-sm hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Quick Translate
          </Link>
          <Link
            href={"/settings"}
            className="text-sm hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Settings
          </Link>
          <Button
            variant="destructiveLight"
            className="w-full"
            onClick={() => setOpen(false)}
          >
            Upgrade
          </Button>
          <div className="flex flex-row justify-evenly items-center gap-5">
            <ModeToggle />
            <UserButton />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
