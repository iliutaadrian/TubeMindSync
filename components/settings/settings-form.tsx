"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import axios from "axios";
import Link from "next/link";

const projectFormSchema = z.object({
  ok: z
    .string({
      required_error: "Please enter your OpenAI API key.",
    })
    .min(10, {
      message: "Please enter a valid OpenAI API key.",
    })
    .max(100, {
      message: "Please enter a valid OpenAI API key.",
    }),
});

type SettingsFormValues = z.infer<typeof projectFormSchema>;

const defaultValues: Partial<SettingsFormValues> = {
  // prompt: "do not translate name Liniuta",
  ok: localStorage.getItem("ok") || "",
  // translate: "fr",
};

export const SettingsForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: SettingsFormValues) => {
    setIsLoading(true);

    try {
      const response = await axios.post("/api/settings", {
        ...data,
      });

      if (response.status === 200) {
        localStorage.setItem("ok", data.ok);
        toast({
          description: "Settings saved.",
        });
      } else {
        toast({
          variant: "destructive",
          description: response.data,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        // @ts-ignore
        description: error.response.data,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10 max-w-3xl"
      >
        <FormField
          control={form.control}
          name="ok"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>OpenAI API Key</FormLabel>
              <FormDescription>
                Get your API key from{" "}
                <a
                  href="https://beta.openai.com/account/api-keys"
                  target="_blank"
                  rel="noreferrer"
                  className="underline cursor-pointer italic"
                >
                  OpenAI
                </a>
              </FormDescription>
              <Input
                type="password"
                placeholder="Your OpenAI API Key..."
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem className="flex flex-col">
          <FormLabel>Billing</FormLabel>
          <FormDescription>
            See your plan and billing information
          </FormDescription>
          <div>
            Your are on the free account plan.
          </div>
          <Button
            disabled={isLoading}
            variant="destructiveLight"
          >
            Upgrade
          </Button>
          <FormMessage />
        </FormItem>

        <div className="flex w-full gap-5">
          <Link
            href={"/"}
            className=" shadow-neonLight w-full flex items-center justify-center"
          >
            Back
          </Link>
          <Button type="submit" className="w-full">Save Project</Button>
        </div>
      </form>
    </Form>
  );
};
