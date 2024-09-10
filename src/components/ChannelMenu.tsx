import {
  ChangeEvent,
  FormEvent,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

import { ChatContext } from "../stores/ChatContext";
import useMessaging from "../hooks/useMessaging";

interface IChannel {
  id: number;
  name: string;
}

const ChannelMenu = () => {
  const [id, setId] = useState("1");
  const { createChannel, fetchChannels } = useMessaging();
  const [newChannel, setNewChannel] = useState("");
  const [channels, setChannels] = useState<IChannel[]>([]);
  const { setChannelId, setChannelName, setUiStep } = useContext(ChatContext);

  useLayoutEffect(() => {
    fetchChannels().then((data: IChannel[]) => {
      setChannels(data);
    });
  }, [fetchChannels]);

  const setChannelNameById = (id: number) => {
    const channel = channels.find((channel) => channel.id === id);
    if (channel) setChannelName(channel.name);
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setId(e.target.value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewChannel(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setChannelId(id);
    setChannelNameById(Number(id));
    setUiStep(2);
  };

  const handleCreateChannel = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newChannel !== "") {
      const channel = await createChannel(newChannel);
      setChannelId(channel.id);
      setChannelName(channel.name);
      setUiStep(2);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-xl">Select a chat channel</h1>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="channel">Channel:</label>
            <select
              className="text-center text-slate-700 rounded-md h-10"
              id="channel"
              value={id}
              onChange={handleChange}
            >
              {channels.map((channel) => (
                <option key={channel.id} value={channel.id}>
                  {channel.name}
                </option>
              ))}
            </select>
          </div>

          <button
            className="justify-self-center h-10 w-[40%] font-semibold rounded-md border border-slate-200 hover:border:none hover:bg-slate-200 hover:text-slate-700"
            type="submit"
          >
            Set channel
          </button>
        </div>
      </form>
      <form className="mt-4" onSubmit={handleCreateChannel}>
        <h1 className="text-xl">OR create a new chat</h1>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="channel">Channel:</label>
            <input
              className="text-center text-slate-700 rounded-md h-10"
              type="text"
              id="nickname"
              value={newChannel}
              onChange={handleInputChange}
            />
          </div>

          <button
            className="justify-self-center h-10 w-[40%] font-semibold rounded-md border border-slate-200 hover:border:none hover:bg-slate-200 hover:text-slate-700"
            type="submit"
          >
            Create channel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChannelMenu;
