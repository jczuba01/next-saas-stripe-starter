import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";

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
      <div className="flex flex-col gap-5">{/* Your content here */}</div>
    </>
  );
}
