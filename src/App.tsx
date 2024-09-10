"use client";

import { useContext } from "react";

import UserMenu from "./components/UserMenu";
import ChannelMenu from "./components/ChannelMenu";
import { ChatContext } from "./stores/ChatContext";
import ChatComponent from "./components/ChatComponent";

function App() {
  const { uiStep } = useContext(ChatContext);

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center h-screen">
        <div className="w-[420px] text-center">
          {uiStep == 0 && <UserMenu />}
          {uiStep == 1 && <ChannelMenu />}
          {uiStep == 2 && <ChatComponent />}
        </div>
      </div>
    </div>
  );
}

export default App;
