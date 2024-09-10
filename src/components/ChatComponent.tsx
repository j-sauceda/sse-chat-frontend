import {
  ChangeEvent,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { formatDistance } from "date-fns";

import useMessaging from "../hooks/useMessaging";
import { ChatContext } from "../stores/ChatContext";

interface IMessage {
  id: number;
  channelId: string;
  content: string;
  created_at: string;
  username: string;
}

const api_url = import.meta.env.VITE_API_URL;

const ChatComponent = () => {
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { fetchPastMessages, postMessage } = useMessaging();
  const {
    channelId,
    channelName,
    setUiStep,
    setChannelId,
    setUsername,
    username,
  } = useContext(ChatContext);

  useLayoutEffect(() => {
    fetchPastMessages().then((data: IMessage[]) => {
      setMessages([...data]);
    });
  }, [fetchPastMessages]);

  useEffect(() => {
    const url = `${api_url}/events/${channelId}`;
    const source = new EventSource(url);

    source.addEventListener("message", (e) => {
      const data: IMessage = JSON.parse(e.data);
      setMessages((prevMessages) => [data, ...prevMessages]);
    });

    source.addEventListener("error", (e) => {
      console.error("Error: ", e);
    });

    return () => {
      source.close();
    };
  }, [channelId]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = 0;
    }
  }, [messages]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newMessage !== "") {
      await postMessage(newMessage, username);
      setNewMessage("");
    }
  };

  const handleReset = () => {
    setUsername("");
    setChannelId("");
    setUiStep(0);
  };

  return (
    <>
      <div className="flex flex-row mb-3">
        <span className="text-xl w-[60%]">#{channelName}</span>
        <button
          className="h-8 px-2.5 font-semibold rounded-md border border-slate-200 hover:border:none hover:bg-slate-200 hover:text-slate-700"
          onClick={handleReset}
        >
          Change channel
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-row space-x-1.5">
            <textarea
              className="mb-2 p-1 text-slate-700 rounded-md h-20 w-[76%]"
              value={newMessage}
              placeholder="Write a new message"
              onChange={handleInputChange}
            />
            <button
              className="self-center h-8 px-6 font-semibold rounded-md border border-slate-200 hover:border:none hover:bg-slate-200 hover:text-slate-700"
              type="submit"
            >
              Send
            </button>
          </div>
        </div>
      </form>
      <div className="h-[70vh] bg-white rounded-lg p-2">
        <div className="h-[100%] overflow-y-auto p-1.5" ref={chatContainerRef}>
          {messages.map((message) =>
            message.username === username ? (
              <div className="chat chat-end mb-1" key={message.id}>
                <div className="chat-bubble">
                  <span className="text-xs">
                    {message.username} (
                    {formatDistance(new Date(), new Date(message.created_at))}{" "}
                    ago)
                  </span>
                  <br />
                  {message.content}
                </div>
              </div>
            ) : (
              <div className="chat chat-start mb-1" key={message.id}>
                <div className="chat-bubble">
                  <span className="text-xs">
                    {message.username} (
                    {formatDistance(new Date(), new Date(message.created_at))}{" "}
                    ago)
                  </span>
                  <br />
                  {message.content}&nbsp;
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </>
  );
};

export default ChatComponent;
