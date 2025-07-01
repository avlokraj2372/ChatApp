import React, { useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  const sendMessages = async (message) => {
    setLoading(true);
    try {
      // ✅ Store response
      const res = await axios.post(
        `http://localhost:4002/message/send/${selectedConversation._id}`,
        { message },
        {
          withCredentials: true, // ✅ sends cookies (e.g., JWT)
        }
      );

      // ✅ Use res.data
      setMessage([...messages, res.data]);
    } catch (error) {
      console.log("Error in send messages", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessages };
};

export default useSendMessage;
