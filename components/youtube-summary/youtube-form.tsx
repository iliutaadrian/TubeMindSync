"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Markdown from "react-markdown";

const projectFormSchema = z.object({
  link: z
    .string()
    .max(50, {
      message: "Links cannot be larger than 50 chars",
    }),
});

type TranslateFormValues = z.infer<typeof projectFormSchema>;

const defaultValues: Partial<TranslateFormValues> = {
  // prompt: "do not translate golf related specific terms like Tee, Hole",
  // translate: "fr",
  link: "https://www.youtube.com/watch?v=-v8pD0d5Bmk",
};

export const YoutubeForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(localStorage.getItem("summary") || "");
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<TranslateFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
  });

  if (!isMounted) return null;

  const onSubmit = async (data: TranslateFormValues) => {
    setIsLoading(true);

    if (!localStorage.getItem("ok")) {
      toast({
        variant: "destructive",
        description: "Please enter your OpenAI API key in Settings.",
      });
      setIsLoading(false);
      return;
    }

    const formData = {
      ...data,
      ok: localStorage.getItem("ok"),
    };

    try {
      await axios.post("api/youtube-summary", {
        ...formData,
      }).then((data) => {
        console.log(data);
        let summary = "";
        data.data && data.data.map((item: any) => {
          summary += `${item.summary} `;
        });
        // window.location.href = `/chat/${data.data.chatId}`
        localStorage.setItem("summary", summary);
        setValue(summary);
      });
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

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast({
      description: "Copied to clipboard",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10 max-w-3xl"
      >
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Youtube Link</FormLabel>
              <Input placeholder="Youtube Lihk..." {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full font-semibold"
        >
          Summarize
        </Button>
        <Markdown>
          {value}
        </Markdown>
      </form>
    </Form>
  );
};
