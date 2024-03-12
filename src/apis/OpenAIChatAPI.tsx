// @ts-nocheck
import axios from "axios";

const OpenAIChatAPI = {
  // Function to get chat response by providing a prompt
  getChatResponse: (prompt) => {
    const apiUrl = `http://localhost:8080/openai/chat?prompt=${encodeURIComponent(prompt)}`;
   

    return axios.get(apiUrl, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }, })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching chat response:", error);
        throw error; // You can handle errors as needed
      });
  },
};

export default OpenAIChatAPI;
