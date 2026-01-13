import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { ContentContainer } from "@/components/dashboard/content-container";

export const metadata = constructMetadata({
  title: "Dashboard",
  description: "Dashboard page",
});

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <>
      <DashboardHeader
        heading="Dashboard"
        text={`Welcome, ${user?.name || user?.email}`}
      />
      <ContentContainer>
        {/* Your content here */}
      </ContentContainer>
    </>
  );
}
