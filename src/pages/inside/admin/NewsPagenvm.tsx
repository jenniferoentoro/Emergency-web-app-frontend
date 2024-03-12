// @ts-nocheck
import React, { useEffect, useState } from "react";
import UserAPI from "../../../apis/UserAPI";
import NavbarInside from "../../../components/inside/navbar/admin/NavbarInside";
import Button from "@mui/material/Button";
import Modal from "bootstrap/js/dist/modal";
import TextField from "@mui/material/TextField";
import NewsAPI from "../../../apis/NewsAPI";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "bootstrap/dist/css/bootstrap.min.css";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

import MenuItem from "@mui/material/MenuItem";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Editor } from "@tinymce/tinymce-react";
import { Global } from "@emotion/core";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

import IncidentCategoryAPI from "../../../apis/IncidentCategoryAPI";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
type Category = {
  id: number;
  name: string;
};

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

function NewsPagenvm() {
  const [userDetails, setUserDetails] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageShow, setImageShow] = useState<File | null>(null);

  const [incidentCategoryId, setIncidentCategoryId] = useState<number | null>(
    null
  );
  const [news, setNews] = useState<News[]>([]);
  const [incidentCategories, setIncidentCategories] = useState<Category[]>([]);

  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const userDetailsResponse = await UserAPI.getMySelf();
        setUserDetails(userDetailsResponse);
        if (userDetailsResponse.roles[0].role !== "ADMIN") {
          window.location.href = "/home";
        }
      } catch (error) {
        window.location.href = "/login";
        return;
        console.error("Error fetching user details:", error);
      }
    }

    fetchUserDetails();
    changeDateFormat();

    // Initialize Bootstrap modal
    const myModal = new Modal(document.getElementById("newsModal")!);
    myModal.hide(); // Hide the modal initially

    // Fetch news
    async function fetchNews() {
      try {
        const newsResponse = await NewsAPI.getNews();
        setNews(newsResponse);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }

    fetchNews();

    // Fetch incident categories
    async function fetchIncidentCategories() {
      try {
        const incidentCategoriesResponse =
          await IncidentCategoryAPI.getIncidentCategories();
        setIncidentCategories(incidentCategoriesResponse);
      } catch (error) {
        console.error("Error fetching incident categories:", error);
      }
    }

    fetchIncidentCategories();
  }, []);

  function changeDateFormat() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear();
    const date = `${year}-${month}-${day}`;
    setDate(date);
  }

  const MySwal = withReactContent(Swal);

  function openModal() {
    const myModal = new Modal(document.getElementById("newsModal")!);
    myModal.show();
  }

  function openImageModal(imageUrl: string) {
    const modal = new Modal(document.getElementById("imageModal")!);
    const modalImage = document.getElementById(
      "modalImage"
    ) as HTMLImageElement;

    if (modalImage) {
      modalImage.src = imageUrl;
      modal.show();
    }
  }

  const clearEditorContent = () => {
    const editor = document.querySelector(".ck-editor__editable");
    if (editor) {
      editor.innerHTML = "";
    }
  };

  async function handleCreateNews() {
    try {
      if (title && description && date && image && incidentCategoryId) {
        const newNews = await NewsAPI.createNews(
          title,
          description,
          date,
          image,
          incidentCategoryId
        );

        if (newNews) {
          MySwal.fire({
            title: "Success!",
            text: "News created successfully!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            setTitle("");
            setDescription("");
            clearEditorContent();
            changeDateFormat();
            setImage(null);
            setImageShow(null);
            setFileName("No selected file");

            setIncidentCategoryId(null);
            setNews((prevNews) => [...prevNews, newNews]);
          });
        }
      } else {
        MySwal.fire({
          title: "Error!",
          text: "Please fill in all required fields.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("News creation failed:", error);
    }
  }

  function uploadAdapter(loader) {
    return async (file) => {
      // Ensure that the loader argument is of type 'file'
      if (file instanceof File) {
        try {
          const data = await NewsAPI.uploadImagesNews(file);
          const url = data.url;
          return {
            upload: async () => {
              const response = await fetch(url);
              if (!response.ok) {
                throw new Error(
                  `Upload failed with status: ${response.status}`
                );
              }
            },
          };
        } catch (error) {
          console.error("Upload failed:", error);
          throw error;
        }
      }
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <div className="color-background">
      {/* <NavbarInside> */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <h1 className="text-center text-2xl">News</h1>
          </div>
        </div>

        <div className="row justify-content-end">
          <div className="col-3">
            <Button variant="contained" onClick={openModal}>
              + New News
            </Button>
          </div>
        </div>

        <div
          className="modal fade"
          id="newsModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable"
            style={{ zIndex: 2000 }}
          >
            <div className="modal-content border-0">
              <div className="modal-body rounded-lg">
                <div className="row">
                  <div className="col-12">
                    <button
                      className="btn-close float-right"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-10"></div>
                  <div className="col-10">
                    <h1 className="text-center text-2xl font-bold">
                      Add New News
                    </h1>
                    <TextField
                      label="Date"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      type="date"
                      value={date}
                      className="mb-0"
                      onChange={(e) => setDate(e.target.value)}
                    />
                    <TextField
                      label="Title"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />

                    <p className="text-[#a42c24] mt-2">Description</p>

                    <CKEditor
                      className="no-tailwind"
                      config={{
                        extraPlugins: [uploadPlugin],
                      }}
                      editor={ClassicEditor}
                      value={description}
                      data={description}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                        setDescription(data);
                      }}
                    />

                    <p className="text-[#a42c24] mt-2">Image</p>

                    <main>
                      <form
                        className="formNews"
                        onClick={() =>
                          document.querySelector(".input-field").click()
                        }
                      >
                        <input
                          type="file"
                          accept="image/*"
                          className="input-field"
                          hidden
                          onChange={({ target: { files } }) => {
                            files[0] && setFileName(files[0].name);
                            if (files) {
                              setImageShow(URL.createObjectURL(files[0]));
                              setImage(files && files[0]);
                            }
                          }}
                        />

                        {imageShow ? (
                          <img
                            src={imageShow}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "contain",
                            }}
                            alt={fileName}
                          />
                        ) : (
                          <>
                            <CloudUploadIcon color="#1475cf" size={60} />
                            <p>Browse Files to upload</p>
                          </>
                        )}
                      </form>

                      {imageShow ? (
                        <section className="uploaded-row">
                          <InsertDriveFileIcon color="#1475cf" />
                          <span className="upload-content">
                            {fileName} -
                            <DeleteForeverIcon
                              className="cursor-pointer"
                              onClick={() => {
                                setFileName("No selected File");
                                setImage(null);
                                setImageShow(null);
                              }}
                            />
                          </span>
                        </section>
                      ) : null}
                    </main>

                    <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                      <InputLabel id="incidentCategory-label">
                        Select Incident Category
                      </InputLabel>
                      <Select
                        labelId="incidentCategory-label"
                        id="incidentCategory"
                        value={incidentCategoryId ?? ""}
                        onChange={(e) =>
                          setIncidentCategoryId(Number(e.target.value))
                        }
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {incidentCategories.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-3 mt-2 text-center">
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      onClick={handleCreateNews}
                    >
                      Create
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-7">
            <table className="table mt-4">
              <thead className="pinkColor">
                <tr className="text-center">
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Date</th>
                  <th scope="col">Image</th>
                  <th scope="col">Incident Category</th>
                </tr>
              </thead>
              <tbody className="text-center transparent">
                {news.map((newsItem, index) => (
                  <tr key={newsItem.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{newsItem.title}</td>
                    <td>
                      <div className="all-initial">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: newsItem.description,
                          }}
                          className="all-initial "
                        ></div>
                      </div>
                    </td>

                    <td>{newsItem.date}</td>
                    <td>
                      {" "}
                      <img
                        className="imageTable"
                        src={`/newsPhotos/${newsItem.image}`}
                        alt={newsItem.image}
                        onClick={() =>
                          openImageModal(`/newsPhotos/${newsItem.image}`)
                        }
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                    <td>{newsItem.incidentCategory.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="modal fade" id="imageModal" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <button
                  className="btn-close float-right"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
                <div className="row justify-content-center">
                  <img
                    id="modalImage"
                    src=""
                    alt="Modal"
                    className="img-fluid h-80"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* </NavbarInside> */}
      <br />
    </div>
  );
}

export default NewsPagenvm;
