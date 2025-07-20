import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const res = await axios.get(
            `https://chatapp-nnoo.onrender.com/message/get/${selectedConversation._id}`,
            {
              withCredentials: true,
            }
          );
          console.log("📩 Fetched messages:", res.data); // Optional: debug
          setMessage(res.data);
          setLoading(false);
        } catch (error) {
          console.log("Error in getting messages", error);
        } finally {
          setLoading(false);
        }
      }
    };
    getMessages();
  }, [selectedConversation, setMessage]);

  return { loading, messages };
};

export default useGetMessage;
