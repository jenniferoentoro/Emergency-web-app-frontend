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

import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router";
import { set } from "react-hook-form";
import NewsAPI from "../../../../apis/NewsAPI";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AuthAPI from "../../../../apis/AuthAPI";
import HelperInformationAPI from "../../../../apis/HelperInformationAPI";
export default function DatatableUser({ titlePage, columnHeader }) {
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

  const [admin, setAdmin] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [identityCardNumber, setidentityCardNumber] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [roles, setRoles] = useState([]);
  const handleRoleChange = (role) => {
    if (roles.includes(role)) {
      setRoles(roles.filter((r) => r !== role));
    } else {
      setRoles([...roles, role]);
    }
  };
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

    if (titlePage === "Admin & Helper") {
      fetchIncidentCategories();
      UserAPI.getAdmins().then((data) => {
        const mappedData = data.map(
          (
            apiItem: {
              id: any;
              firstName: any;
              lastName: any;
              birthDate: any;
              address: any;
              identityCardNumber: any;
              email: any;
              username: any;
              phoneNumber: any;
            },
            index: number
          ) => ({
            id: apiItem.id,
            code: index + 1,
            firstName: apiItem.firstName,
            lastName: apiItem.lastName,
            birthDate: apiItem.birthDate,
            address: apiItem.address,
            identityCardNumber: apiItem.identityCardNumber,
            email: apiItem.email,
            username: apiItem.username,
            phoneNumber: apiItem.phoneNumber,
          })
        );
        setAdmin(mappedData);
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

  async function fetchIncidentCategories() {
    try {
      const incidentCategoriesResponse =
        await IncidentCategoryAPI.getIncidentCategories();
      setIncidentCategoriesOption(incidentCategoriesResponse);
    } catch (error) {
      console.error("Error fetching incident categories:", error);
    }
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
    if (titlePage === "Admin & Helper") {
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
      alert("edit");
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
        const newUser = await AuthAPI.registerAny(
          username,
          confirmPassword,
          password,
          email,
          firstName,
          LastName,
          date,
          phoneNumber,
          identityCardNumber,
          address,
          roles
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

        if (newUser) {
          setIncidentCategoryDialog(false);
          const date = new Date();

          const formattedDate = date.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });

          if (roles.includes("HELPER")) {
            const addHelperInformation =
              await HelperInformationAPI.addHelperInformation(
                newUser.id,
                companyName,
                incidentCategoryId
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
          }

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
              id: newUser.id,
              code: incidentCategories.length + 1,
              title: newUser.title,
              description: newUser.description,
              date: formattedDate, // Use the formatted date and time
              image: newUser.image,
              category: newUser.incidentCategory.name,
            };
            setIncidentCategories((prevCategories) => [
              ...prevCategories,
              newNewsObject,
            ]);
          });
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
                      field={header}
                      header={header}
                      sortable
                      style={{ minWidth: "4rem" }}
                    ></Column>
                  );
                } else if (header === "Description") {
                  return (
                    <Column
                      key={index}
                      field={header}
                      header={header}
                      sortable
                      style={{ minWidth: "16rem" }}
                      body={(rowData) => {
                        return (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: rowData[header],
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
                      field={header}
                      header={header}
                      sortable
                      style={{ minWidth: "12rem" }}
                      body={(rowData) => {
                        return (
                          <div>
                            <img
                              src={`/newsPhotos/` + rowData[header]}
                              alt="Image"
                              style={{ width: "100%" }}
                              onClick={() =>
                                openImageModal(`/newsPhotos/` + rowData[header])
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
                      field={header}
                      header={header}
                      sortable
                      style={{ minWidth: "12rem" }}
                      body={(rowData) => {
                        return (
                          <div>
                            <video
                              src={`/videoTutorials/` + rowData[header]}
                              alt="Image"
                              style={{ width: "100%" }}
                              onClick={() =>
                                openVideoModal(
                                  `/videoTutorials/` + rowData[header]
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
                      field={header}
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
            <>
              <TextField
                label="First Name"
                variant="standard"
                fullWidth
                margin="normal"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <TextField
                label="Last Name"
                variant="standard"
                fullWidth
                margin="normal"
                type="text"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              <TextField
                label="Username"
                variant="standard"
                fullWidth
                margin="normal"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                label="Password"
                variant="standard"
                fullWidth
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <TextField
                label="Confirm Password"
                variant="standard"
                fullWidth
                margin="normal"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <TextField
                label="Email"
                variant="standard"
                fullWidth
                margin="normal"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                label="Identity Card Number"
                variant="standard"
                fullWidth
                margin="normal"
                type="text"
                value={identityCardNumber}
                onChange={(e) => setidentityCardNumber(e.target.value)}
              />

              <TextField
                label="Phone Number"
                variant="standard"
                fullWidth
                margin="normal"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />

              <TextField
                label="Address"
                variant="standard"
                fullWidth
                margin="normal"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <TextField
                label="Birth Date"
                variant="standard"
                fullWidth
                margin="normal"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <FormGroup>
                <InputLabel>Select Roles</InputLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={roles.includes("ADMIN")}
                      onChange={() => handleRoleChange("ADMIN")}
                    />
                  }
                  label="ADMIN"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={roles.includes("HELPER")}
                      onChange={() => handleRoleChange("HELPER")}
                    />
                  }
                  label="HELPER"
                />
              </FormGroup>

              {roles.includes("HELPER") && (
                <>
                  <TextField
                    label="Company Name"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />

                  <FormControl
                    variant="standard"
                    className="m-0"
                    fullWidth
                    sx={{ m: 1 }}
                  >
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
            </>
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
