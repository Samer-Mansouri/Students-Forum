import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./Options";
const config = {
  botName: "3aweni.tn ChatBot",
  initialMessages: [
    createChatBotMessage(`Welcome to our platform, i'm here to help you.`, {
      widget: "options",
    }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },

  ],
};

export default config;