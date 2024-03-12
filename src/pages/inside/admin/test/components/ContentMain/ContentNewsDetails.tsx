import "./ContentMain.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsAPI from "../../../../../../apis/NewsAPI";
type News = {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  incidentCategory: {
    id: number;
    name: string;
  };
};
const ContentNewsDetails = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState<News | null>(null);

  useEffect(() => {
    async function fetchNewsItem() {
      try {
        const newsResponse = await NewsAPI.getNewsById(id); // Implement this API call
        setNewsItem(newsResponse);
      } catch (error) {
        console.error("Error fetching news item:", error);
      }
    }

    fetchNewsItem();
  }, [id]);

  if (!newsItem) {
    return <div>Loading...</div>;
  }

  function changeDateFormatWithParam(date: any) {
    const dateObject = new Date(date);
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    const formattedDate = `${day} - ${month} - ${year}`;
    return formattedDate;
  }

  return (
    <div className="main-content-holder">
      <div className="color-background min-vh-100 d-flex flex-column">
        <div className="flex-grow-1">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <p className="text-l mb-0 italic">
                  {newsItem.incidentCategory.name}
                </p>
                <h1 className="text-3xl font-bold">{newsItem.title}</h1>
                <p className="text-xl">
                  {changeDateFormatWithParam(newsItem.date)}
                </p>
                <img
                  style={{ width: "100%" }}
                  src={`/newsPhotos/${newsItem.image}`}
                  alt="News"
                />

                <p
                  className="text-xl mt-2"
                  dangerouslySetInnerHTML={{ __html: newsItem.description }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentNewsDetails;
