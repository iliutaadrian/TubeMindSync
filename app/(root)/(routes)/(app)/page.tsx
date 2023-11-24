import { Separator } from "@/components/ui/separator";
import { YoutubeForm } from "@/components/youtube-summary/youtube-form";

function Page() {
  return (
    <div className="flex flex-col pb-10">
      <h2 className="text-2xl font-bold tracking-tight">Youtube Summary</h2>
      <p className="text-muted-foreground">
        This tool will help you summarize YouTube videos.
      </p>
      <Separator className="bg-muted-foreground my-5" />
      <YoutubeForm />
    </div>
  );
}

export default Page;
