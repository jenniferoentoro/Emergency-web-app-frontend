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
import CheckIcon from "@mui/icons-material/Check";
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
import IncidentReportAPI from "../../../../apis/IncidentReportAPI";
export default function DatatableAdminIncident({ titlePage, columnHeader }) {
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

  const [incidentCategoryId, setIncidentCategoryId] = useState(null);
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

    if (titlePage === "Waiting") {
      IncidentReportAPI.getIncidentReportWaiting().then((data) => {
        const mappedData = data.map(
          (
            apiItem: {
              id: any;
              title: any;
              description: any;
              longitude: any;
              latitude: any;
              incidentCategory: { id: any; name: any };
              file: any;
              date: any;
              user: { id: any; username: any };
            },
            index: number
          ) => {
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
              longitude: apiItem.longitude,
              latitude: apiItem.latitude,
              category: apiItem.incidentCategory.name,
              image: apiItem.file,
              date: formattedDate,
              user: apiItem.user.username,
            };
          }
        );
        setIncidentCategories(mappedData);
      });
    } else if (titlePage === "In Progress") {
      IncidentReportAPI.getIncidentReportInProgress().then((data) => {
        const mappedData = data.map(
          (
            apiItem: {
              id: any;
              title: any;
              description: any;
              longitude: any;
              latitude: any;
              incidentCategory: { id: any; name: any };
              file: any;
              date: any;
              user: { id: any; username: any };
            },
            index: number
          ) => {
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
              longitude: apiItem.longitude,
              latitude: apiItem.latitude,
              category: apiItem.incidentCategory.name,
              image: apiItem.file,
              date: formattedDate,
              user: apiItem.user.username,
            };
          }
        );
        setIncidentCategories(mappedData);
      });
    } else if (titlePage === "Fixed") {
      IncidentReportAPI.getIncidentReportFixed().then((data) => {
        const mappedData = data.map(
          (
            apiItem: {
              id: any;
              title: any;
              description: any;
              longitude: any;
              latitude: any;
              incidentCategory: { id: any; name: any };
              file: any;
              date: any;
              user: { id: any; username: any };
            },
            index: number
          ) => {
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
              longitude: apiItem.longitude,
              latitude: apiItem.latitude,
              category: apiItem.incidentCategory.name,
              image: apiItem.file,
              date: formattedDate,
              user: apiItem.user.username,
            };
          }
        );
        setIncidentCategories(mappedData);
      });
    }
  }, []);

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
      setImageShow("/incidentReportPhotos/" + category.image);
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

  const truncateText = (text, maxLength = 100) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
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

  const toggleModal = (content) => {
    const modal = new Modal(document.getElementById("imageDescription")!);
    const modalContent = document.getElementById("modalContent");

    if (modalContent) {
      modalContent.innerHTML = content.description;
      modal.show();
    }
  };

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
    try {
      let _incidentCategories = [...incidentCategories];

      const updatedNews = await IncidentReportAPI.updateStatus(
        incidentCategoryId,
        categoryName,
        incidentCategory.id
      )
        .then((response) => {
          let _incidentCategories = incidentCategories.filter(
            (val) => val.id !== incidentCategory.id
          );

          setIncidentCategories(_incidentCategories);

          setIncidentCategories(_incidentCategories);
          setIncidentCategory(null);
          setIncidentCategoryDialog(false);
          MySwal.fire({
            title: "Success!",
            text: titlePage + " updated successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
        })

        .catch((response) => {
          MySwal.fire({
            title: "Error!",
            text: titlePage + " update failed!",
            icon: "error",
            confirmButtonText: "OK",
          });
        });

      if (updatedNews) {
      }
    } catch (error) {
      // console.error("Failed to update incident category:", error);
    }
  }

  const exportCSV = () => {
    dt.current.exportCSV();
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

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon={<CheckIcon />}
          rounded
          outlined
          className="mr-2 buttonEdit"
          onClick={() => editProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <div className="flex gap-2">
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
    <div className="container-fluid">
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
                      style={{ minWidth: "1rem" }}
                    ></Column>
                  );
                } else if (header === "Description") {
                  return (
                    <Column
                      key={index}
                      field={truncateText(header.toLowerCase())}
                      header={header}
                      sortable
                      style={{ minWidth: "13rem" }}
                      body={(rowData) => {
                        const truncatedField = truncateText(
                          header.toLowerCase()
                        );
                        const truncatedText =
                          rowData[truncatedField] &&
                          rowData[truncatedField].length > 100
                            ? rowData[truncatedField].substring(0, 100) + "..."
                            : rowData[truncatedField];

                        return (
                          <>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: truncatedText,
                              }}
                            />
                            {rowData[truncatedField] &&
                              rowData[truncatedField].length > 100 && (
                                <span
                                  style={{ color: "blue", cursor: "pointer" }}
                                  onClick={() => toggleModal(rowData)}
                                >
                                  See more...
                                </span>
                              )}
                          </>
                        );
                      }}
                    />
                  );
                } else if (header === "Image") {
                  return (
                    <Column
                      key={index}
                      field={header.toLowerCase()}
                      header={header}
                      sortable
                      style={{ minWidth: "10rem" }}
                      body={(rowData) => {
                        return (
                          <div>
                            <img
                              src={
                                `/incidentReportPhotos/` +
                                rowData[header.toLowerCase()]
                              }
                              alt="Image"
                              style={{ width: "100%" }}
                              onClick={() =>
                                openImageModal(
                                  `/incidentReportPhotos/` +
                                    rowData[header.toLowerCase()]
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
                      style={{ minWidth: "10rem" }}
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

              {titlePage !== "Fixed" && (
                <Column
                  header="Actions"
                  body={actionBodyTemplate}
                  exportable={false}
                  style={{ minWidth: "4rem" }}
                />
              )}
            </DataTable>
          </div>

          <Dialog
            visible={categoryDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Edit Status"
            modal
            size="xl"
            className="p-fluid"
            footer={categoryDialogFooter}
            onHide={hideDialog}
          >
            <FormControl variant="standard" fullWidth>
              <InputLabel id="incidentCategory-label">Select Status</InputLabel>
              <Select
                labelId="incidentCategory-label"
                id="incidentCategory"
                value={incidentCategoryId ?? ""}
                onChange={(e) => setIncidentCategoryId(e.target.value)}
              >
                {titlePage == "Waiting" && (
                  <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                )}

                <MenuItem value="FIXED">Fixed</MenuItem>
              </Select>
            </FormControl>
            <TextField
              className="mt-2"
              label="Description"
              variant="standard"
              fullWidth
              margin="none"
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Dialog>

          <div className="modal fade" id="imageDescription" tabIndex={-1}>
            <div className="modal-dialog modal-xl modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <button
                    className="btn-close float-right"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                  <div className="row justify-content-center">
                    <div id="modalContent"></div>
                  </div>
                </div>
              </div>
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
