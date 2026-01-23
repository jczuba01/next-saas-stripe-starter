export function ChatContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <div className="chat-container flex h-full flex-col px-6 py-8 gap-4">
    {children}
  </div>
  );
}