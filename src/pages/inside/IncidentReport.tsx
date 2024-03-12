// @ts-nocheck
import axios from "axios";
import React, { useEffect, useState } from "react";
import UserAPI from "../../apis/UserAPI";
import NavbarInside from "../../components/inside/navbar/NavbarInside";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import "./IncidentReport.css";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// import NewsAPI from "../../apis/NewsAPI";
import IncidentReportAPI from "../../apis/IncidentReportAPI";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
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

type IncidentReport = {
  id: number;
  description: string;
  file: string;
  latitude: number;
  longitude: number;
  incidentCategory: {
    id: number;
    name: string;
  };
  title: string;
  statusFixed: boolean;
  user: {
    id: number;
    username: string;
  };
  date: string;
};

function incidentReport() {
  const [userDetails, setUserDetails] = useState(null);
  const [news, setNews] = useState<IncidentReport[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

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
        const newsResponse = await IncidentReportAPI.getIncidentReport();

        // Initialize an array to store updated news items with location data
        const updatedNews = newsResponse.map((item) => ({
          ...item,
          location: "Loading location...", // Set a placeholder location
        }));

        setNews(updatedNews); // Update the state with placeholders

        for (let i = 0; i < newsResponse.length; i++) {
          const newsItem = newsResponse[i];
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${newsItem.latitude}&lon=${newsItem.longitude}`;

          try {
            const locationResponse = await axios.get(url);
            console.log(locationResponse);
            const location =
              locationResponse.data.address.road +
              " " +
              locationResponse.data.address.town;

            updatedNews[i].location = location;

            setNews([...updatedNews]);
          } catch (error) {
            console.error("Error fetching location:", error);
            updatedNews[i].location = "Location not available";
            setNews([...updatedNews]);
          }
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }

    fetchNews();
  }, []);

  const handleSearchChange = async (event) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);

    // Call the API to get news based on the search query

    if (newSearchQuery === "") {
      try {
        // const newsResponse = await NewsAPI.getNews();
        // setNews(newsResponse);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    } else {
      try {
        // const newsResponse = await NewsAPI.getNewsByTitle(newSearchQuery);
        // setNews(newsResponse);
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
      //   NewsAPI.getNews()
      //     .then((newsResponse) => {
      //       setNews(newsResponse);
      //     })
      //     .catch((error) => {
      //       console.error("Error fetching news:", error);
      //     });
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
      //   const newsResponse = await NewsAPI.getNewsByCategories(
      //     selectedCategories
      //   );
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

          <div className="row justify-content-center mt-4">
            {news.map((newsItem) => (
              <div className="col-12 col-xl-6 my-2">
                <Link to={`/incidentreport/${newsItem.id}`} className="nounder">
                  <article class="article-card cursor-pointer">
                    <div class="img-box">
                      <img
                        src={"/incidentReportPhotos/" + newsItem.file}
                        alt=""
                        class="article-banner"
                      />
                    </div>

                    <div class="article-content">
                      <div className="">
                        <p class="m-0 mt-0 text-[#ae6d68]">
                          {newsItem.incidentCategory.name}
                        </p>
                      </div>
                      <h3 class="article-title font-bold">{newsItem.title}</h3>

                      <div class="acticle-content-footer">
                        <div class="author">
                          <div class="author-info">
                            <h4 class="author-name mt-0">
                              {newsItem.location
                                ? newsItem.location
                                : "Loading location..."}
                            </h4>
                            <div class="publish-date mt-0">{newsItem.date}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </NavbarInside>
    </div>
  );
}

export default incidentReport;
