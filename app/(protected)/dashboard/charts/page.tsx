import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { ContentContainer } from "@/components/dashboard/content-container";

export const metadata = constructMetadata({
  title: "Charts",
  description: "Charts page",
});

export default function ChartsPage() {
  return (
    <>
      <DashboardHeader heading="Charts" text="Your charts here." />
      <ContentContainer>
        {/* Charts content here */}
      </ContentContainer>
    </>
  );
}
