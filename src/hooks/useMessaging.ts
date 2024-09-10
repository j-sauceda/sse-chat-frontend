import axios from "axios";
import { useCallback, useContext } from "react";
import { ChatContext } from "../stores/ChatContext";

const api_url = import.meta.env.VITE_API_URL;

const useMessaging = () => {
  const { channelId } = useContext(ChatContext);

  const createChannel = async (name: string) => {
    try {
      console.log(name);

      const result = await axios.post(`${api_url}/channel`, { name });
      return result.data;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const fetchChannels = useCallback(async () => {
    try {
      const result = await axios.get(`${api_url}/channels`);

      return result.data.channels;
    } catch (error) {
      console.error(error);
      return [];
    }
  }, []);

  const fetchPastMessages = useCallback(async () => {
    console.log("fetching past messages");
    try {
      const url = `${api_url}/messages/${channelId}`;
      const result = await axios.get(url);

      return result.data.messages;
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [channelId]);

  const postMessage = async (content: string, username: string) => {
    try {
      const result = await axios.post(`${api_url}/message/${channelId}`, {
        content,
        username,
      });

      return result.data;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  return { createChannel, fetchChannels, fetchPastMessages, postMessage };
};

export default useMessaging;
