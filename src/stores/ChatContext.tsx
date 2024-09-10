import { createContext, FC, PropsWithChildren, useState } from "react";

interface IChatContext {
  uiStep: number;
  username: string;
  channelId: string;
  channelName: string;
  setUiStep: (value: number) => void;
  setUsername: (value: string) => void;
  setChannelId: (value: string) => void;
  setChannelName: (value: string) => void;
}

export const ChatContext = createContext<IChatContext>({
  uiStep: 0,
  username: "",
  channelId: "",
  channelName: "",
  setUiStep: () => {},
  setUsername: () => {},
  setChannelId: () => {},
  setChannelName: () => {},
});

const ChatProvider: FC<PropsWithChildren> = ({ children }) => {
  const [uiStep, setUiStep] = useState(0);
  const [username, setUsername] = useState("");
  const [channelId, setChannelId] = useState("");
  const [channelName, setChannelName] = useState("");

  return (
    <ChatContext.Provider
      value={{
        uiStep,
        username,
        channelId,
        channelName,
        setUiStep,
        setUsername,
        setChannelId,
        setChannelName,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
