"use client";
import { MenuList } from "@/components/menu/menu-list";
import { Navbar } from "@/components/menu/navbar";

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className={"overflow-hidden w-full hidden flex-col md:w-80 fixed h-screen border-muted-foreground p-7 mt-16 pb-24 bg-primary/10"}
      >
        <MenuList/>
      </div>
      <Navbar />
      <div className={" pt-16 h-full"}>
        <div className={" h-full md:p-10 p-5"}>
          {children}
        </div>
      </div>
    </>
  );
}
