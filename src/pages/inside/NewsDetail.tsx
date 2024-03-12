import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsAPI from "../../apis/NewsAPI";
import NavbarInside from "../../components/inside/navbar/NavbarInside";
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
function NewsDetail() {
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

  return (
    <div>
      <div className="color-background min-h-screen">
        <NavbarInside>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <p className="text-l mb-0 italic">
                  {newsItem.incidentCategory.name}
                </p>
                <h1 className="text-3xl font-bold">{newsItem.title}</h1>
                <p className="text-xl">{newsItem.date}</p>
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
        </NavbarInside>
      </div>
    </div>
  );
}

export default NewsDetail;
