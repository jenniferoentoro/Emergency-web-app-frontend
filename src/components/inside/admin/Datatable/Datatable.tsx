// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import TextField from "@mui/material/TextField";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import Modal from "bootstrap/js/dist/modal";
import UserAPI from "../../../../apis/UserAPI";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "bootstrap/dist/css/bootstrap.css";
import NavbarInside from "../../../components/inside/navbar/admin/NavbarInside";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IncidentCategoryAPI from "../../../../apis/IncidentCategoryAPI";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TutorialAPI from "../../../../apis/TutorialAPI";

import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router";
import { set } from "react-hook-form";
import NewsAPI from "../../../../apis/NewsAPI";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
export default function DatatableAdmin({ titlePage, columnHeader }) {
  const [categoryName, setCategoryName] = useState("");
  const [incidentCategories, setIncidentCategories] = useState([]);
  const [categoryDialog, setIncidentCategoryDialog] = useState(false);
  const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false);
  const [deleteCategoriesDialog, setDeleteCategoriesDialog] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageShow, setImageShow] = useState<File | null>(null);

  const [incidentCategoryId, setIncidentCategoryId] = useState<number | null>(
    null
  );
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");

  const [headerName, setHeaderName] = useState("Add " + titlePage);

  const [incidentCategory, setIncidentCategory] = useState(null);

  const [selectedCategories, setSelectedCategories] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const MySwal = withReactContent(Swal);
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  const [incidentCategoriesOption, setIncidentCategoriesOption] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const userDetailsResponse = await UserAPI.getMySelf();
        setUserDetails(userDetailsResponse);
        const hasAdminRole = userDetailsResponse.roles.some(
          (role) => role.role === "ADMIN"
        );

        if (!hasAdminRole) {
          navigate("/home");
          return;
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        navigate("/login");
        return;
      }
    }

    changeDateFormat();
    fetchUserDetails();

    if (titlePage === "Incident Category") {
      IncidentCategoryAPI.getIncidentCategories().then((data) => {
        const mappedData = data.map(
          (apiItem: { id: any; name: any }, index: number) => ({
            id: apiItem.id,
            code: index + 1,
            name: apiItem.name,
          })
        );
        setIncidentCategories(mappedData);
      });
    } else if (titlePage === "News") {
      NewsAPI.getNews().then((data) => {
        const mappedData = data.map(
          (
            apiItem: {
              id: any;
              title: any;
              description: any;
              date: any;
              image: any;
              incidentCategory: { id: any; name: any };
            },
            index: number
          ) => {
            // Format the date into a specific date and time format
            const formattedDate = new Date(apiItem.date).toLocaleString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            );

            return {
              id: apiItem.id,
              code: index + 1,
              title: apiItem.title,
              description: apiItem.description,
              date: formattedDate, // Use the formatted date
              image: apiItem.image,
              category: apiItem.incidentCategory.name,
              categoryId: apiItem.incidentCategory.id,
            };
          }
        );
        setIncidentCategories(mappedData);
      });

      fetchIncidentCategories();
    } else if (titlePage === "Tutorial") {
      fetchIncidentCategories();

      TutorialAPI.getTutorials().then((data) => {
        const mappedData = data.map(
          (
            apiItem: {
              id: any;
              title: any;
              description: any;
              videoFile: any;
              incidentCategory: { id: any; name: any };
            },
            index: number
          ) => {
            // Format the date into a specific date and time format

            return {
              id: apiItem.id,
              code: index + 1,
              title: apiItem.title,
              description: apiItem.description,

              video: apiItem.videoFile,
              category: apiItem.incidentCategory.name,
              categoryId: apiItem.incidentCategory.id,
            };
          }
        );
        setIncidentCategories(mappedData);
      });
    }
  }, []);
  async function fetchIncidentCategories() {
    try {
      const incidentCategoriesResponse =
        await IncidentCategoryAPI.getIncidentCategories();
      setIncidentCategoriesOption(incidentCategoriesResponse);
    } catch (error) {
      console.error("Error fetching incident categories:", error);
    }
  }
  function changeDateFormat() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear();
    const date = `${year}-${month}-${day}`;
    setDate(date);
  }

  function changeDateFormatWithParam(date) {
    const dateObject = new Date(date);
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate);
  }

  const openNew = () => {
    setHeaderName("Add " + titlePage);
    // setProduct(emptyProduct);

    setIncidentCategoryDialog(true);
  };

  const hideDialog = () => {
    setIncidentCategory(null);
    setCategoryName("");
    setTitle("");
    setDescription("");
    changeDateFormat();
    setImage(null);
    setFileName("No selected file");
    setImageShow(null);
    setIncidentCategoryId(null);

    setIncidentCategoryDialog(false);
  };

  const hideDeleteCategoryDialog = () => {
    setDeleteCategoryDialog(false);
  };

  const hideDeleteCategoriesDialog = () => {
    setDeleteCategoriesDialog(false);
  };

  const editProduct = (category) => {
    setHeaderName("Edit " + titlePage);
    setIncidentCategory({ ...category });
    if (titlePage === "News") {
      setTitle(category.title);
      setDescription(category.description);
      changeDateFormatWithParam(category.date);
      setImageShow("/newsPhotos/" + category.image);
      setFileName(category.image);
      // set(category.incidentCategory.id);
      setIncidentCategoryId(category.categoryId);
    } else if (titlePage === "Incident Category") {
      setCategoryName(category.name);
    } else if (titlePage === "Tutorial") {
      setTitle(category.title);
      setDescription(category.description);
      // changeDateFormatWithParam(category.date);
      setImageShow("/videoTutorials/" + category.video);
      setFileName(category.video);
      setIncidentCategoryId(category.categoryId);
    }
    // alert(incidentCategory.id);
    setIncidentCategoryDialog(true);
  };

  const confirmDeleteProduct = (category) => {
    // setProduct(product);
    setIncidentCategory(category);
    setDeleteCategoryDialog(true);
  };

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

  function openVideoModal(imageUrl: string) {
    const modal = new Modal(document.getElementById("videoModal")!);
    const modalImage = document.getElementById(
      "modalVideo"
    ) as HTMLImageElement;

    if (modalImage) {
      modalImage.src = imageUrl;
      modal.show();
    }
  }

  async function deleteProduct() {
    if (titlePage === "News") {
      const deleteprod = await NewsAPI.deleteNewsById(
        incidentCategory.id
      ).catch((response) => {
        MySwal.fire({
          title: "Error!",
          text: titlePage + " deletion failed!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
    } else if (titlePage === "Incident Category") {
      const deleteprod = await IncidentCategoryAPI.deleteIncidentCategory(
        incidentCategory.id
      ).catch((response) => {
        MySwal.fire({
          title: "Error!",
          text: titlePage + " deletion failed!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
    } else if (titlePage === "Tutorial") {
      const deleteprod = await TutorialAPI.deleteTutorialById(
        incidentCategory.id
      ).catch((response) => {
        MySwal.fire({
          title: "Error!",
          text: titlePage + " deletion failed!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
    }

    let _incidentCategories = incidentCategories.filter(
      (val) => val.id !== incidentCategory.id
    );

    setIncidentCategories(_incidentCategories);

    // setProducts(_products);
    setDeleteCategoryDialog(false);
    setIncidentCategory(null);
    MySwal.fire({
      title: "Success!",
      text: titlePage + " deleted successfully!",
      icon: "success",
      confirmButtonText: "OK",
    });
  }

  async function handleCreateCategory() {
    if (incidentCategory) {
      try {
        let _incidentCategories = [...incidentCategories];

        if (titlePage === "News") {
          const updatedNews = await NewsAPI.updateNews(
            incidentCategory.id,
            title,
            description,
            date,
            image,
            incidentCategoryId
          ).catch((response) => {
            const errors = response.response.data.errors;
            let errorMessage = "";

            if (errors.length > 1) {
              for (const error of errors) {
                if (errors.indexOf(error) === errors.length - 1) {
                  errorMessage += error.error;
                } else {
                  errorMessage += error.error + ", ";
                }
              }
            } else {
              errorMessage = errors[0].error;
            }

            MySwal.fire({
              title: "Error!",
              text: errorMessage,
              icon: "error",
              confirmButtonText: "OK",
            });
          });

          if (updatedNews) {
            setIncidentCategoryDialog(false);
            const date = new Date(updatedNews.date);

            const formattedDate = date.toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            MySwal.fire({
              title: "Success!",
              text: `${titlePage} updated successfully on ${formattedDate}!`,
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              setTitle("");
              setDescription("");
              changeDateFormat();
              setImage(null);
              setFileName("No selected file");
              setImageShow(null);
              setIncidentCategoryId(null);

              _incidentCategories[incidentCategory.code - 1].title = title;
              _incidentCategories[incidentCategory.code - 1].description =
                description;
              _incidentCategories[incidentCategory.code - 1].date =
                formattedDate;
              _incidentCategories[incidentCategory.code - 1].image =
                updatedNews.image;
              _incidentCategories[incidentCategory.code - 1].category =
                incidentCategoriesOption[
                  incidentCategoriesOption.findIndex(
                    (category) => category.id === incidentCategoryId
                  )
                ].name;

              setIncidentCategories(_incidentCategories);
            });
          }
        } else if (titlePage === "Incident Category") {
          const updatedCategory =
            await IncidentCategoryAPI.updateIncidentCategory(
              incidentCategory.id,
              categoryName
            ).catch((response) => {
              const errors = response.response.data.errors;
              let errorMessage = "";

              if (errors.length > 1) {
                for (const error of errors) {
                  if (errors.indexOf(error) === errors.length - 1) {
                    errorMessage += error.error;
                  } else {
                    errorMessage += error.error + ", ";
                  }
                }
              } else {
                errorMessage = errors[0].error;
              }

              MySwal.fire({
                title: "Error!",
                text: errorMessage,
                icon: "error",
                confirmButtonText: "OK",
              });
            });

          if (updatedCategory) {
            setIncidentCategoryDialog(false);
            MySwal.fire({
              title: "Success!",
              text: titlePage + " updated successfully!",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              setCategoryName("");
              _incidentCategories[incidentCategory.code - 1].name =
                categoryName;

              setIncidentCategories(_incidentCategories);
            });
          }
        } else if (titlePage === "Tutorial") {
          const updatedTutorial = await TutorialAPI.updateTutorial(
            incidentCategory.id,
            title,
            description,
            null,
            incidentCategoryId,
            image
          ).catch((response) => {
            const errors = response.response.data.errors;
            let errorMessage = "";

            if (errors.length > 1) {
              for (const error of errors) {
                if (errors.indexOf(error) === errors.length - 1) {
                  errorMessage += error.error;
                } else {
                  errorMessage += error.error + ", ";
                }
              }
            } else {
              errorMessage = errors[0].error;
            }

            MySwal.fire({
              title: "Error!",
              text: errorMessage,
              icon: "error",
              confirmButtonText: "OK",
            });
          });

          if (updatedTutorial) {
            setIncidentCategoryDialog(false);
            MySwal.fire({
              title: "Success!",
              text: titlePage + " updated successfully!",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              setTitle("");
              setDescription("");
              changeDateFormat();
              setImage(null);
              setIncidentCategoryId(null);

              _incidentCategories[incidentCategory.code - 1].title = title;
              _incidentCategories[incidentCategory.code - 1].description =
                description;
              _incidentCategories[incidentCategory.code - 1].category =
                incidentCategoriesOption[
                  incidentCategoriesOption.findIndex(
                    (category) => category.id === incidentCategoryId
                  )
                ].name;

              setIncidentCategories(_incidentCategories);
            });
          }
        }
      } catch (error) {
        // console.error("Failed to update incident category:", error);
      }
    } else {
      try {
        if (titlePage === "News") {
          const formData = new FormData();
          formData.append("title", title);
          formData.append("description", description);
          formData.append("date", date);
          formData.append("image", image);
          formData.append("incidentCategoryId", incidentCategoryId);

          const newNews = await NewsAPI.createNews(
            title,
            description,
            date,
            image,
            incidentCategoryId
          ).catch((response) => {
            const errors = response.response.data.errors;
            let errorMessage = "";

            if (errors.length > 1) {
              for (const error of errors) {
                if (errors.indexOf(error) === errors.length - 1) {
                  errorMessage += error.error;
                } else {
                  errorMessage += error.error + ", ";
                }
              }
            } else {
              errorMessage = errors[0].error;
            }

            MySwal.fire({
              title: "Error!",
              text: errorMessage,
              icon: "error",
              confirmButtonText: "OK",
            });
          });

          if (newNews) {
            setIncidentCategoryDialog(false);
            const date = new Date(newNews.date);

            const formattedDate = date.toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            MySwal.fire({
              title: "Success!",
              text: `${titlePage} created successfully on ${formattedDate}!`,
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              setTitle("");
              setDescription("");
              changeDateFormat();
              setImage(null);
              setFileName("No selected file");
              setImageShow(null);
              setIncidentCategoryId(null);

              const newNewsObject = {
                id: newNews.id,
                code: incidentCategories.length + 1,
                title: newNews.title,
                description: newNews.description,
                date: formattedDate, // Use the formatted date and time
                image: newNews.image,
                category: newNews.incidentCategory.name,
              };
              setIncidentCategories((prevCategories) => [
                ...prevCategories,
                newNewsObject,
              ]);
            });
          }
        } else if (titlePage === "Incident Category") {
          const newCategory = await IncidentCategoryAPI.createIncidentCategory(
            categoryName
          ).catch((response) => {
            const errors = response.response.data.errors;
            let errorMessage = "";

            if (errors.length > 1) {
              for (const error of errors) {
                if (errors.indexOf(error) === errors.length - 1) {
                  errorMessage += error.error;
                } else {
                  errorMessage += error.error + ", ";
                }
              }
            } else {
              errorMessage = errors[0].error;
            }

            MySwal.fire({
              title: "Error!",
              text: errorMessage,
              icon: "error",
              confirmButtonText: "OK",
            });
          });

          if (newCategory) {
            setIncidentCategoryDialog(false);
            MySwal.fire({
              title: "Success!",
              text: titlePage + " created successfully!",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              setCategoryName("");
              const newCategoryObject = {
                id: newCategory.id,
                code: incidentCategories.length + 1,
                name: newCategory.name,
              };
              setIncidentCategories((prevCategories) => [
                ...prevCategories,
                newCategoryObject,
              ]);
            });
          }
        } else if (titlePage === "Tutorial") {
          const newTutorial = await TutorialAPI.createTutorial(
            title,
            description,
            null,
            incidentCategoryId,
            image
          ).catch((response) => {
            console.log(response);
            const errors = response.response.data.errors;
            let errorMessage = "";

            if (errors.length > 1) {
              for (const error of errors) {
                if (errors.indexOf(error) === errors.length - 1) {
                  errorMessage += error.error;
                } else {
                  errorMessage += error.error + ", ";
                }
              }
            } else {
              errorMessage = errors[0].error;
            }

            MySwal.fire({
              title: "Error!",
              text: errorMessage,
              icon: "error",
              confirmButtonText: "OK",
            });
          });

          if (newTutorial) {
            setIncidentCategoryDialog(false);
            MySwal.fire({
              title: "Success!",
              text: titlePage + " created successfully!",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              setTitle("");
              setDescription("");
              changeDateFormat();
              setIncidentCategoryId(null);

              const newTutorialObject = {
                id: newTutorial.id,
                code: incidentCategories.length + 1,
                title: newTutorial.title,
                description: newTutorial.description,
                category: newTutorial.incidentCategory.name,
                video: newTutorial.videoFile,
              };
              setIncidentCategories((prevCategories) => [
                ...prevCategories,
                newTutorialObject,
              ]);
            });
          }
        }
      } catch (error) {
        console.error(titlePage + " creation failed:", error);
      }
    }
  }

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteCategoriesDialog(true);
  };

  async function deleteSelectedCategories() {
    const _select = [];
    for (const category of selectedCategories) {
      _select.push(category.id);
    }

    const deleteprod = await IncidentCategoryAPI.deleteIncidentCategories(
      _select
    ).catch((response) => {
      MySwal.fire({
        title: "Error!",
        text: titlePage + " deletion failed!",
        icon: "error",
        confirmButtonText: "OK",
      });
    });

    let _incidentCategories = incidentCategories.filter(
      (val) => !selectedCategories.includes(val)
    );

    setIncidentCategories(_incidentCategories);

    setSelectedCategories(null);

    setDeleteCategoriesDialog(false);

    MySwal.fire({
      title: "Success!",
      text: titlePage + " deleted successfully!",
      icon: "success",
      confirmButtonText: "OK",
    });
  }

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedCategories || !selectedCategories.length}
        />
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon={<EditIcon />}
          rounded
          outlined
          className="mr-2 buttonEdit"
          onClick={() => editProduct(rowData)}
        />

        <Button
          icon={<DeleteIcon />}
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <div className="flex gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedCategories || !selectedCategories.length}
        />
        <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        />
      </div>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  const categoryDialogFooter = (
    <Button
      type="button"
      className="buttonA"
      variant="contained"
      // color="red-200"
      onClick={handleCreateCategory}
    >
      Save
    </Button>
  );
  const deleteCategoryDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteCategoryDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteCategoriesDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteCategoriesDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedCategories}
      />
    </React.Fragment>
  );

  return (
    // <div className="color-background h-screen">
    //   <NavbarInside>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          <h1 className="text-center text-4xl">Manage {titlePage}</h1>

          <Toast ref={toast} />
          <div className="card">
            <DataTable
              ref={dt}
              value={incidentCategories}
              selection={selectedCategories}
              onSelectionChange={(e) => setSelectedCategories(e.value)}
              dataKey="id"
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate={`Showing {first} to {last} of {totalRecords} ${titlePage}`}
              globalFilter={globalFilter}
              header={header}
            >
              <Column selectionMode="multiple" exportable={false}></Column>
              {columnHeader.map((header, index) => {
                if (header === "Code" || header === "Category") {
                  return (
                    <Column
                      key={index}
                      field={header.toLowerCase()}
                      header={header}
                      sortable
                      style={{ minWidth: "4rem" }}
                    ></Column>
                  );
                } else if (header === "Description") {
                  return (
                    <Column
                      key={index}
                      field={header.toLowerCase()}
                      header={header}
                      sortable
                      style={{ minWidth: "16rem" }}
                      body={(rowData) => {
                        return (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: rowData[header.toLowerCase()],
                            }}
                          />
                        );
                      }}
                    ></Column>
                  );
                } else if (header === "Image") {
                  return (
                    <Column
                      key={index}
                      field={header.toLowerCase()}
                      header={header}
                      sortable
                      style={{ minWidth: "12rem" }}
                      body={(rowData) => {
                        return (
                          <div>
                            <img
                              src={
                                `/newsPhotos/` + rowData[header.toLowerCase()]
                              }
                              alt="Image"
                              style={{ width: "100%" }}
                              onClick={() =>
                                openImageModal(
                                  `/newsPhotos/` + rowData[header.toLowerCase()]
                                )
                              }
                            />
                          </div>
                        );
                      }}
                    ></Column>
                  );
                } else if (header === "Video") {
                  return (
                    <Column
                      key={index}
                      field={header.toLowerCase()}
                      header={header}
                      sortable
                      style={{ minWidth: "12rem" }}
                      body={(rowData) => {
                        return (
                          <div>
                            <video
                              src={
                                `/videoTutorials/` +
                                rowData[header.toLowerCase()]
                              }
                              alt="Image"
                              style={{ width: "100%" }}
                              onClick={() =>
                                openVideoModal(
                                  `/videoTutorials/` +
                                    rowData[header.toLowerCase()]
                                )
                              }
                            />
                          </div>
                        );
                      }}
                    ></Column>
                  );
                } else {
                  return (
                    <Column
                      key={index}
                      field={header.toLowerCase()}
                      header={header}
                      sortable
                      style={{ minWidth: "8rem" }}
                    ></Column>
                  );
                }
              })}

              <Column
                header="Actions"
                body={actionBodyTemplate}
                exportable={false}
                style={{ minWidth: "12rem" }}
              ></Column>
            </DataTable>
          </div>

          <Dialog
            visible={categoryDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header={headerName}
            modal
            size="xl"
            className="p-fluid"
            footer={categoryDialogFooter}
            onHide={hideDialog}
          >
            {titlePage === "Incident Category" && (
              <TextField
                label="Category Name"
                variant="standard"
                fullWidth
                margin="none"
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            )}
            {titlePage === "Tutorial" && (
              <>
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

                    {incidentCategoriesOption.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <main>
                  <form
                    className="formNews"
                    onClick={() =>
                      document.querySelector(".input-field").click()
                    }
                  >
                    <input
                      type="file"
                      accept="video/*"
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
                      <video
                        controls
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
              </>
            )}

            {titlePage === "News" && (
              <>
                <TextField
                  label="Date and Time"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  type="datetime-local" // Use datetime-local type
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
                      accept="image/*, video/*"
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

                    {incidentCategoriesOption.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
          </Dialog>

          <Dialog
            visible={deleteCategoryDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Confirm"
            modal
            footer={deleteCategoryDialogFooter}
            onHide={hideDeleteCategoryDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {incidentCategory && (
                <span>
                  Are you sure you want to delete <b>{incidentCategory.name}</b>
                  ?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteCategoriesDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Confirm"
            modal
            footer={deleteCategoriesDialogFooter}
            onHide={hideDeleteCategoriesDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {incidentCategories && (
                <span>
                  Are you sure you want to delete the selected categories?
                </span>
              )}
            </div>
          </Dialog>

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

          <div className="modal fade" id="videoModal" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <button
                    className="btn-close float-right"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                  <div className="row justify-content-center">
                    <video
                      controls
                      id="modalVideo"
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
      </div>
    </div>
    //   </NavbarInside>
    // </div>
  );
}
