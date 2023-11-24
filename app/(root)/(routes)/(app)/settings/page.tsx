import { SettingsForm } from "@/components/settings/settings-form";
import { Separator } from "@/components/ui/separator";

function Page() {
  return (
    <div className="flex flex-col pb-10">
      <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
      <p className="text-muted-foreground">
        Manage your account settings
      </p>
      <Separator className="bg-muted-foreground my-5" />
      <SettingsForm />
    </div>
  );
}

export default Page;
