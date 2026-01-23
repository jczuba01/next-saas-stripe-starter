import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Home",
  description: "Home page",
});

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold">
        Welcome, {user?.name || user?.email}! 👋
      </h1>
      <p className="text-lg text-muted-foreground">
        This is your home page. Use the sidebar to navigate.
      </p>
    </div>
  );
}
