import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";

export const metadata = constructMetadata({
  title: "Charts",
  description: "Charts page",
});

export default function ChartsPage() {
  return (
    <>
      <DashboardHeader heading="Charts" text="Your charts here." />
      <div className="flex flex-col gap-5">{/* Your charts here */}</div>
    </>
  );
}
