// @ts-nocheck
import "./ContentMain.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UserAPI from "../../../../../../apis/UserAPI";
import ConnectChatAPI from "../../../../../../apis/ConnectChatAPI";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import "./Tutorial.css";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import TutorialAPI from "../../../../../../apis/TutorialAPI";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IosShareIcon from "@mui/icons-material/IosShare";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { Link } from "react-router-dom";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IncidentCategoryAPI from "../../../../../../apis/IncidentCategoryAPI";

import { Modal } from "react-bootstrap";

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

const ContentTutorialUser = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [news, setNews] = useState<News[]>([]);
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
        const newsResponse = await TutorialAPI.getTutorials();
        setNews(newsResponse);
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
        const newsResponse = await TutorialAPI.getTutorials();
        setNews(newsResponse);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    } else {
      // try {
      //   const newsResponse = await TutorialAPI.getTutorialsByTitle(newSearchQuery);
      //   setNews(newsResponse);
      // } catch (error) {
      //   console.error("Error fetching news:", error);
      // }
    }
  };

  const handleFilterIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (selectedCategories.length === 0) {
      TutorialAPI.getTutorials()
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
    // try {
    //   const newsResponse = await TutorialAPI.getTutorialsByCategories(
    //     selectedCategories
    //   );
    //   setNews(newsResponse);
    // } catch (error) {
    //   console.error("Error fetching news:", error);
    // }
  };

  const [selectedNewsItem, setSelectedNewsItem] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "category-popover" : undefined;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (newsItem) => {
    setSelectedNewsItem(newsItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="main-content-holder">
      <div className="color-background min-vh-100 d-flex flex-column">
        <div className="flex-grow-1">
          <div className="container-fluid">
            <h1 className="text-center">Tutorial Videos</h1>
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
              {news.map((newsItem, index) => (
                <div
                  class="col-sm-12 col-md-6 col-lg-4 col-xl-4 my-6"
                  key={index}
                >
                  <article
                    className="cardTutor cursor-pointer"
                    onClick={() => openModal(newsItem)}
                  >
                    <div className="video-container">
                      <video
                        width="100%"
                        onMouseOver={(event) => event.target.play()}
                        onMouseOut={(event) => event.target.pause()}
                      >
                        <source
                          src={`/videoTutorials/${newsItem.videoFile}`}
                          type="video/mp4"
                        />
                      </video>
                    </div>
                    <div className="card__info">
                      <span className="card__category">
                        {newsItem.incidentCategory.name}
                      </span>
                      <h3 className="card__title">{newsItem.title}</h3>
                      <span className="card__by">
                        <a href="#" className="card__author" title="author">
                          {newsItem.date}
                        </a>
                      </span>
                    </div>
                  </article>
                </div>
              ))}
            </div>

            {isModalOpen && selectedNewsItem && (
              <Modal centered show={isModalOpen} onHide={closeModal} size="md">
                <Modal.Body className="rounded-md" align="center">
                  <button
                    type="button"
                    class="btn-close float-right"
                    aria-label="Close"
                    onClick={closeModal}
                  ></button>
                  <h4 className="mt-2">{selectedNewsItem.title}</h4>
                  <video width="100%" controls>
                    <source
                      src={`/videoTutorials/${selectedNewsItem.videoFile}`}
                      type="video/mp4"
                    />
                  </video>
                  <p>{selectedNewsItem.description}</p>
                </Modal.Body>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentTutorialUser;
