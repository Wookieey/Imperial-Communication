import RoomList from "./RoomList";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

export default function ChatLayout() {
  return (
    <div className="flex h-screen">
      {/* Left – Rooms */}
      <aside className="w-64 bg-empire-grey p-2">
        <RoomList />
      </aside>

      {/* Middle – Messages */}
      <main className="flex-1 flex flex-col bg-empire-black p-2">
        <MessageList />
        <ChatInput />
      </main>

      {/* Right – User Info / Profile */}
      <aside className="w-64 bg-empire-grey p-2">
        {/* Profile panel goes here */}
      </aside>
    </div>
  );
}
