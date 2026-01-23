import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { ContentContainer } from "@/components/dashboard/content-container";
import { UserNameForm } from "@/components/forms/user-name-form";
import { DeleteAccountSection } from "@/components/dashboard/delete-account";

export const metadata = constructMetadata({
  title: "Settings",
  description: "Manage your account settings.",
});

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user?.id) redirect("/login");

  return (
    <>
      <DashboardHeader
        heading="Settings"
        text="Manage your account settings."
      />
      <ContentContainer>
        <UserNameForm user={{ id: user.id, name: user.name || "" }} />
        <DeleteAccountSection />
      </ContentContainer>
    </>
  );
}
