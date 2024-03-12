// @ts-nocheck
import axios from "axios";
import React, { useEffect, useState } from "react";
import UserAPI from "../../apis/UserAPI";
import NavbarInside from "../../components/inside/navbar/NavbarInside";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import "./News.css";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import NewsAPI from "../../apis/NewsAPI";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NewsHighlightAPI from "../../apis/NewsHighlightAPI";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IosShareIcon from "@mui/icons-material/IosShare";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { Link } from "react-router-dom";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IncidentCategoryAPI from "../../apis/IncidentCategoryAPI";
import NewsBreakingAPI from "../../apis/NewsBreakingAPI";

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

type NewsBreaking = {
  id: number;
  title: string;
  newsId: number;
};
function News() {
  const [userDetails, setUserDetails] = useState(null);
  const [news, setNews] = useState<News[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [newsBreaking, setNewsBreaking] = useState<NewsBreaking[]>([]);

  const [newsHighlight, setNewsHighlight] = useState<News[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categories = await IncidentCategoryAPI.getIncidentCategories();
        setCategoryList(categories);
      } catch (error) {
        console.error("Error fetching incident categories:", error);
      }
    }
    fetchCategories();

    async function fetchUserDetails() {
      try {
        const userDetailsResponse = await UserAPI.getMySelf();
        setUserDetails(userDetailsResponse);
      } catch (error) {
        console.error("Error fetching user details:", error);
        window.location.href = "/login";
      }
    }

    fetchUserDetails();
  }, []);

  useEffect(() => {
    async function fetchNews() {
      try {
        const newsResponse = await NewsAPI.getNews();
        setNews(newsResponse);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }

    async function fetchNewsHighlight() {
      try {
        const newsHighlightResponse = await NewsHighlightAPI.getNews();
        setNewsHighlight(newsHighlightResponse);
        console.log(newsHighlight);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }

    async function fetchNewsBreaking() {
      try {
        const newsBreakingResponse = await NewsBreakingAPI.getNews();
        setNewsBreaking(newsBreakingResponse);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }

    fetchNews();

    fetchNewsHighlight();

    fetchNewsBreaking();
  }, []);
  const handleSearchChange = async (event) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);

    // Call the API to get news based on the search query

    if (newSearchQuery === "") {
      try {
        const newsResponse = await NewsAPI.getNews();
        setNews(newsResponse);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    } else {
      try {
        const newsResponse = await NewsAPI.getNewsByTitle(newSearchQuery);
        setNews(newsResponse);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }
  };

  const handleFilterIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (selectedCategories.length === 0) {
      NewsAPI.getNews()
        .then((newsResponse) => {
          setNews(newsResponse);
        })
        .catch((error) => {
          console.error("Error fetching news:", error);
        });
    } else {
      updateNewsByCategories(selectedCategories);
      console.log(selectedCategories);
    }
  }, [selectedCategories]);

  const handleCategoryCheck = (categoryName: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categoryName)) {
        console.log(selectedCategories.length);

        return prevSelectedCategories.filter((name) => name !== categoryName);
      } else {
        return [...prevSelectedCategories, categoryName];
      }
    });

    console.log(selectedCategories);
  };

  const isCategorySelected = (categoryName: string) =>
    selectedCategories.includes(categoryName);

  const updateNewsByCategories = async (selectedCategories) => {
    try {
      const newsResponse = await NewsAPI.getNewsByCategories(
        selectedCategories
      );
      setNews(newsResponse);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "category-popover" : undefined;

  return (
    <div className="color-background min-h-screen">
      <NavbarInside>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex justify-content-between align-items-center breaking-news bg-white">
                <div className="d-flex flex-row flex-grow-1 flex-fill justify-content-center bg-danger py-2 text-white px-1 news">
                  <span className="d-flex align-items-center">Hot News</span>
                </div>
                <marquee className="news-scroll">
                  {newsHighlight.map((news) => (
                    <>
                      <Link to={`/news/${news.id}`} href="#">
                        {news.title}{" "}
                      </Link>{" "}
                      <span className="dot"></span>{" "}
                    </>
                  ))}{" "}
                </marquee>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <Carousel>
                {newsHighlight.map((news) => (
                  <Carousel.Item key={news.id}>
                    <Link to={`/news/${news.id}`} className="nounder">
                      <img
                        src={"/newsPhotos/" + news.image}
                        alt={news.title}
                        className="d-block w-100"
                      />
                      <Carousel.Caption>
                        <h5
                          className="font-bold italic"
                          style={{ textShadow: "#000000 1px 0 10px" }}
                        >
                          {news.title}
                        </h5>
                      </Carousel.Caption>
                    </Link>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>

          <div className="row height d-flex justify-content-center align-items-center mt-3">
            <div className="col-md-6">
              <div className="form">
                <SearchIcon className="searcha" />
                <input
                  type="text"
                  className="form-control form-input"
                  placeholder="Search anything..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <span className="left-pan">
                  <FilterAltIcon
                    className="micr cursor-pointer"
                    onClick={handleFilterIconClick}
                  />
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                  >
                    <List>
                      {categoryList.map((category) => (
                        <ListItem
                          key={category.id}
                          button
                          onClick={() => handleCategoryCheck(category.name)} // Use category.name
                        >
                          <Checkbox
                            checked={isCategorySelected(category.name)}
                          />{" "}
                          {/* Use category.name */}
                          <ListItemText primary={category.name} />
                        </ListItem>
                      ))}
                    </List>
                    {/* <Button
                      onClick={handleApplyFilter}
                      variant="contained"
                      color="primary"
                    >
                      Apply Filter
                    </Button> */}
                  </Popover>
                </span>
              </div>
            </div>
          </div>
          <div className="row justify-content-center text-center mt-3">
            {news.map((newsItem) => (
              <div
                className="col-12 col-md-5 col-lg-4 col-xl-3 my-2"
                key={newsItem.id}
              >
                <Link to={`/news/${newsItem.id}`} className="nounder">
                  <Card
                    id={newsItem.id}
                    className="cursor-pointer"
                    style={{ height: "100%" }}
                  >
                    <div className="position-relative">
                      <span className="badge badge-primary position-absolute top-1 start-1 m-2 px-1 rounded-full bg-red-700">
                        {newsItem.incidentCategory.name}
                      </span>
                      <Card.Img
                        src={"/newsPhotos/" + newsItem.image}
                        alt="Card image"
                        className="py-2 px-2 imgRound fixed-img"
                      />
                    </div>
                    <Card.Body className="notop" style={{ height: "100%" }}>
                      <Card.Title className="font-bold text-left udnerline">
                        {newsItem.title}
                      </Card.Title>
                      <Card.Text className="d-flex justify-content-start align-items-center text-left text-sm">
                        <div>
                          <PlayCircleFilledIcon />{" "}
                        </div>
                        <div className="font-bold ml-1 readMore">
                          Read more...
                        </div>
                      </Card.Text>
                      <Card.Text className="float-right text-sm align-items-end">
                        {newsItem.date}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </NavbarInside>
    </div>
  );
}

export default News;
