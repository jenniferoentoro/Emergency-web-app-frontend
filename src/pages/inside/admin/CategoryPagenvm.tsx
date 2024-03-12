import React, { useEffect, useState } from "react";
import UserAPI from "../../../apis/UserAPI";
import NavbarInside from "../../../components/inside/navbar/admin/NavbarInside";
import Button from "@mui/material/Button";
import Modal from "bootstrap/js/dist/modal";
import TextField from "@mui/material/TextField";
import IncidentCategoryAPI from "../../../apis/IncidentCategoryAPI";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import Sidebar from '../../../components/inside/Sidebar/Sidebar';
type Category = {
  id: number;
  name: string;
};

function CategoryPagenvm() {
  const [userDetails, setUserDetails] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [incidentCategories, setIncidentCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const userDetailsResponse = await UserAPI.getMySelf();
        setUserDetails(userDetailsResponse);
        if (userDetailsResponse.roles[0].role !== "ADMIN") {
          window.location.href = "/home";
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        window.location.href = "/login";
        return;
      }
    }

    fetchUserDetails();

    const myModal = new Modal(document.getElementById("staticBackdrop")!);
    myModal.hide();
    async function fetchIncidentCategories() {
      try {
        const incidentCategoriesResponse =
          await IncidentCategoryAPI.getIncidentCategories();
        setIncidentCategories(incidentCategoriesResponse);
        // console.log('Incident categories:', incidentCategoriesResponse);
      } catch (error) {
        console.error("Error fetching incident categories:", error);
      }
    }

    fetchIncidentCategories();
  }, []);

  const MySwal = withReactContent(Swal);

  function openModal() {
    const myModal = new Modal(document.getElementById("staticBackdrop")!);
    myModal.show();
  }

  async function handleCreateCategory() {
    try {
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
        MySwal.fire({
          title: "Success!",
          text: "Incident category created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          setCategoryName("");
          setIncidentCategories((prevCategories) => [
            ...prevCategories,
            newCategory,
          ]);
        });
      }
    } catch (error) {
      console.error("Incident category creation failed:", error);
    }
  }

  return (
    <div className="color-background min-h-screen">
      <NavbarInside>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <h1 className="text-center text-2xl">Incident Categories</h1>
            </div>
          </div>

          <div className="row justify-content-end">
            <div className="col-3">
              <Button variant="contained" onClick={openModal}>
                + New Category
              </Button>
            </div>
          </div>

          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
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
                    <div className="col-10">
                      <h1 className="text-center text-xl">Add New Category</h1>
                      <TextField
                        label="Category Name"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-3 mt-2">
                      <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={handleCreateCategory}
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
              {/* <div className="card"> */}
              <table className="table mt-4 ">
                <thead className="pinkColor">
                  <tr className="text-center">
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                  </tr>
                </thead>
                <tbody className="text-center transparent">
                  {incidentCategories.map((category, index) => (
                    <tr key={category.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{category.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* </div> */}
            </div>
          </div>
        </div>
      </NavbarInside>
    </div>
  );
}

export default CategoryPagenvm;
