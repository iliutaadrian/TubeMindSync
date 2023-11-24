"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { Folder, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export const MenuList = () => {
  const projects:any = []
  const handleSubscription = async () => {
    try {
      await axios.get("/api/stripe")
        .then((data) => {
          window.location.href = data.data.url;
        });
    } catch (error) {
      toast({
        variant: "destructive",
        // @ts-ignore
        description: error.response.data,
      });
    } finally {
    }
  };

  return (
    <div className={"hidden md:flex flex-col justify-between h-full"}>
      <div className="flex flex-col gap-5 w-full">
        <Link
          href="/"
          className="flex gap-5 text-sm hover:bg-background/50 shadow-neonLight p-5 cursor-pointer"
        >
          <LayoutDashboard />
          Dashboard
        </Link>
        {projects.map((project) => {
          return (
            <Link
              href={`/project/${project.id}`}
              className="flex gap-5 text-sm bg-background hover:bg-background/50 shadow-neonLight p-5 cursor-pointer"
              key={project.id}
            >
              <Folder />
              {project.name}
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between items-center">
          <Button
            onClick={handleSubscription}
            variant="defaultLight"
            className="w-full"
          >
            Create New Project
          </Button>
        </div>

        <div className="flex flex-row justify-between items-center">
          <Button
            onClick={handleSubscription}
            variant="destructiveLight"
            className="w-full"
          >
            Upgrade
          </Button>
        </div>
      </div>
    </div>
  );
};
