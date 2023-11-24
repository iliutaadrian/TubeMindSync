"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Copy } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism"; // You can choose different styles
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { LanguageSelect } from "../language-select/language-select";
const projectFormSchema = z.object({
  note: z
    .string()
    .max(50, {
      message: "Prompt must not be longer than 50 characters.",
    }).optional(),
  language: z.string({
    required_error: "Please select a language to translate.",
  }),
  file: z.string({
    required_error: "Please select a file.",
  }).max(5000, {
    message: "File must not be longer than 5000 characters.",
  }),
});

type TranslateFormValues = z.infer<typeof projectFormSchema>;

const defaultValues: Partial<TranslateFormValues> = {
  // prompt: "do not translate golf related specific terms like Tee, Hole",
  // translate: "fr",
};

export const TranslateForm = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");

  const form = useForm<TranslateFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
  });

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
      await axios.post("/api/quick-translate", {
        ...formData,
      }).then((data) => {
        // window.location.href = `/chat/${data.data.chatId}`
        setValue(data.data);
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
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language to translate</FormLabel>
              <FormDescription>
                Select the language you want to translate your file into
              </FormDescription>
              <LanguageSelect form={form} field={field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom Prompt</FormLabel>
              <FormDescription>
                Enter a custom prompt to help translation if needed.
              </FormDescription>
              <FormControl>
                <Input placeholder="Your custom prompt..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormDescription>
                Enter your yml file below
              </FormDescription>
              <FormControl>
                <>
                  <Textarea
                    placeholder="Your file"
                    {...field}
                    className="min-h-[200px]"
                  />
                  <SyntaxHighlighter
                    language="yml"
                    style={darcula}
                    className="text-sm"
                  >
                    {field.value}
                  </SyntaxHighlighter>
                </>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full font-semibold"
        >
          Translate
        </Button>
        <FormItem>
          <FormLabel>Translated File</FormLabel>
          <FormDescription>
            Translated file form above with the selected language
          </FormDescription>
          <FormControl>
            <div className="shadow-neonLight h-full relative">
              {value
                ? (
                  <div>
                    <Copy
                      className="w-6 h-6 text-muted-foreground right-3 top-3 absolute hover:text-primary cursor-pointer"
                      onClick={() => {
                        handleCopy();
                      }}
                    />
                    <SyntaxHighlighter
                      language="yml"
                      style={darcula}
                    >
                      {value}
                    </SyntaxHighlighter>
                  </div>
                )
                : (
                  <div className="p-5 text-muted-foreground">
                    Your Translated File will appear here
                  </div>
                )}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      </form>
    </Form>
  );
};
// <Textarea
//   placeholder="Your file"
//   className="min-h-[300px]"
// />
