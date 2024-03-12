import axios from "axios";

const NewsBreakingAPI = {
  createNews: (newsId: any, title: any) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return axios
      .post(
        "http://localhost:8080/api/news-breaking",
        { newsId, title },
        { headers }
      )
      .then((response) => response.data);
  },

  getNews: () =>
    axios
      .get("http://localhost:8080/api/news-breaking", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data),

  deleteNews: (id: any) => {
    axios
      .delete(`http://localhost:8080/api/news-breaking/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data);
  },
};

export default NewsBreakingAPI;
