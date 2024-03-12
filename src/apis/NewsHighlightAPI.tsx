import axios from "axios";

const NewsHighlightAPI = {
  createNews: (newsId: any) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return axios
      .post("http://localhost:8080/api/news-highlight", { newsId }, { headers })
      .then((response) => response.data);
  },

  getNews: () =>
    axios
      .get("http://localhost:8080/api/news-highlight", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data),

  deleteNews: (id: any) => {
    axios
      .delete(`http://localhost:8080/api/news-highlight/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data);
  },
};

export default NewsHighlightAPI;
