import axios from "axios";

const HelperInformationAPI = {
  addHelperInformation: (
    userId: any,
    companyName: any,
    incidentCategoryId: any
  ) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    return axios
      .post(
        "http://localhost:8080/api/helper-information",
        {
          userId,
          companyName,
          incidentCategoryId,
        },
        { headers }
      )
      .then((response) => response.data);
  },
};

export default HelperInformationAPI;
