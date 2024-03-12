// @ts-nocheck
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm, Controller, set } from "react-hook-form";
import UserAPI from "../../apis/UserAPI";
import NavbarInside from "../../components/inside/navbar/NavbarInside";
import Swal from "sweetalert2";
import "./IncidentReport.css";
import TextField from "@mui/material/TextField";
import IncidentReportAPI from "../../apis/IncidentReportAPI";
import IncidentCategoryAPI from "../../apis/IncidentCategoryAPI";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import MenuItem from "@mui/material/MenuItem";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Autocomplete } from "@react-google-maps/api";
import { GoogleMapsWrapper } from "./components/GoogleMapsWrapper";
import { GoogleMaps } from "./components/GoogleMaps";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

type Category = {
  id: number;
  name: string;
};
type IncidentReportForm = {
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  incidentCategoryId: number;
  file: File;
};

export const LOCATIONS = [
  { lat: 48.8566, lng: 2.3522 },
  { lat: 47.1533, lng: 2.9123 },
];

function IncidentReportUpload() {
  const { register, handleSubmit, control, setValue } = useForm();
  const [userDetails, setUserDetails] = useState(null);
  const [fileName, setFileName] = useState("No selected File");
  const [imageShow, setImageShow] = useState(null);
  const [image, setImage] = useState(null);
  const [markers, setMarkers] = useState(LOCATIONS);

  const [incidentCategories, setIncidentCategories] = useState([]);
  const [showMapModal, setShowMapModal] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [incidentCategoryId, setIncidentCategoryId] = useState(0);

  const navigate = useNavigate();

  const handleMapModalClose = () => setShowMapModal(false);
  const handleMapClick = (clickedLocation) => {
    // Update the state with the new marker location
    setMarkers([clickedLocation]);
    setLatitude(clickedLocation.lat);
    setLongitude(clickedLocation.lng);
  };
  const handleMapModalSubmit = () => {
    // Update latitude and longitude in the form with the selected location
    setValue("latitude", markers[0].lat);
    setValue("longitude", markers[0].lng);

    // Close the map modal
    setShowMapModal(false);

    // Convert latitude and longitude to address using Nominatim OpenStreetMap API
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${markers[0].lat}&lon=${markers[0].lng}`;

    axios
      .get(url)
      .then((response) => {
        // Extract the address details from the response
        const addressDetails = response.data.address || {};

        // Construct the formatted address using relevant details
        // const formattedAddress = `${addressDetails.road || ""}, ${
        //   addressDetails.city || ""
        // }, ${addressDetails.country || ""}`;

        const formattedAddress = `${addressDetails.house_number || ""}, ${
          addressDetails.road || ""
        }, ${addressDetails.city || ""}, ${addressDetails.country || ""}`;

        // Set the formatted address in the TextField
        setValue("address", formattedAddress);
        // alert(formattedAddress);
        document.getElementById("mapAutocomplete").value = formattedAddress;
      })
      .catch((error) => {
        console.error("Error fetching location:", error);
      });
  };

  const openMapModal = () => setShowMapModal(true);

  const onMapPlaceChanged = () => {
    const autocomplete = document.getElementById("mapAutocomplete");

    const geocodingUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      autocomplete.value
    )}`;

    axios.get(geocodingUrl).then((response) => {
      const firstResult = response.data[0];
      if (firstResult) {
        setMarkers([
          {
            lat: parseFloat(firstResult.lat),
            lng: parseFloat(firstResult.lon),
          },
        ]);

        setLatitude(parseFloat(firstResult.lat));
        setLongitude(parseFloat(firstResult.lon));

        // alert(firstResult.lat);
        // alert(firstResult.lon);
      } else {
        console.error("No results found for the entered address");
      }
    });
  };

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const userDetailsResponse = await UserAPI.getMySelf();
        setUserDetails(userDetailsResponse);
      } catch (error) {
        console.error("Error fetching user details:", error);
        window.location.href = "/login";
      }
    }
    async function fetchIncidentCategories() {
      try {
        const categoriesResponse =
          await IncidentCategoryAPI.getIncidentCategories();
        setIncidentCategories(categoriesResponse);
      } catch (error) {
        console.error("Error fetching incident categories:", error);
      }
    }

    fetchIncidentCategories();
    fetchUserDetails();
  }, []);

  const clearEditorContent = () => {
    const editor = document.querySelector(".ck-editor__editable");
    if (editor) {
      editor.innerHTML = "";
    }
  };

  function uploadAdapter(loader: any) {
    return async (file: any) => {
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

  function uploadPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return uploadAdapter(loader);
    };
  }

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("latitude", parseFloat(markers[0].lat));
      formData.append("longitude", parseFloat(markers[0].lng));
      formData.append("incidentCategoryId", incidentCategoryId.toString());
      formData.append("file", image);

      await IncidentReportAPI.uploadIncidentReport(formData);

      Swal.fire(
        "Success",
        "Incident report submitted successfully",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          // Navigate to /history

          navigate("/incidentreport/history");
        }
      });
    } catch (error) {
      console.error("Error submitting incident report:", error);
      Swal.fire("Error", "Failed to submit incident report", "error");
    }
  };

  return (
    <div className="color-background min-h-screen">
      <NavbarInside>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center">Report new Incident</h1>
            </div>
          </div>
          {/* <form> */}
          <div className="row justify-content-center">
            <div className="col-10">
              <TextField
                label="Title"
                variant="standard"
                fullWidth
                margin="normal"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <div className="row justify-content-center">
                <div className="col-md-8 col-sm-12 align-baseline">
                  {/* Autocomplete component */}
                  <Autocomplete
                    onLoad={(autocomplete) => console.log(autocomplete)}
                    onPlaceChanged={onMapPlaceChanged}
                  >
                    <TextField
                      label="Address"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      type="text"
                      id="mapAutocomplete"
                    />
                  </Autocomplete>
                </div>
                <div className="col-md-4 col-sm-12 align-baseline">
                  <button
                    onClick={openMapModal}
                    className="rounded-lg bg-[#c97d79] text-white py-2 mt-4"
                  >
                    Select from Map
                  </button>
                </div>
              </div>
              <Modal show={showMapModal} onHide={handleMapModalClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Select Location from Map</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <GoogleMapsWrapper>
                    <GoogleMaps
                      locations={markers}
                      onMapClick={handleMapClick}
                    />
                  </GoogleMapsWrapper>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                  <button
                    onClick={handleMapModalSubmit}
                    className="animate__animated animate__fadeIn rounded-full bg-[#bc5c54] text-white px-20 tracking-wider py-2 mt-2"
                  >
                    Save Location
                  </button>
                </Modal.Footer>
              </Modal>

              <p className="text-[#a42c24] mt-2">Description</p>

              <CKEditor
                editor={ClassicEditor}
                value={description}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDescription(data);
                }}
              />
              <FormControl variant="standard" fullWidth>
                <InputLabel id="incidentCategory-label">
                  Select Incident Category
                </InputLabel>
                <Controller
                  name="incidentCategoryId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      labelId="incidentCategory-label"
                      id="incidentCategory"
                      value={incidentCategoryId}
                      onChange={(e) =>
                        setIncidentCategoryId(parseInt(e.target.value))
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
                  )}
                />
              </FormControl>
              <p className="text-[#a42c24] mt-2">Insert Photo</p>

              <main>
                <form
                  className="formNews mt-2"
                  onClick={() => document.querySelector(".input-field").click()}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="input-field"
                    hidden
                    onChange={({ target: { files } }) => {
                      files[0] && setFileName(files[0].name);
                      if (files) {
                        const imageUrl = URL.createObjectURL(files[0]);
                        console.log("Image URL:", imageUrl);
                        setImageShow(imageUrl);
                        setImage(files[0]);
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
                      <CloudUploadIcon />
                      <p>Browse Files to upload</p>
                    </>
                  )}
                </form>

                {imageShow ? (
                  <section className="uploaded-row">
                    <InsertDriveFileIcon />
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
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-10 col-md-3">
              <button
                onClick={handleSubmit(onSubmit)}
                className="rounded-full bg-[#c97d79] text-white py-2 w-100 mt-4"
              >
                Submit
              </button>
            </div>
          </div>
          {/* </form> */}
        </div>
      </NavbarInside>
    </div>
  );
}

export default IncidentReportUpload;
