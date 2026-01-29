import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";  
import { ContentContainer } from "@/components/dashboard/content-container";
import { ChatComponent } from "@/components/chat/chat-component";

export const metadata = constructMetadata({
  title: "Chat",
  description: "Chat page",
});

export default function ChatPage() {
  return (
    <>
      <DashboardHeader heading="Chat" text="Your chat here." />
      <ContentContainer>
        <ChatComponent />
      </ContentContainer>
    </>
  );
}