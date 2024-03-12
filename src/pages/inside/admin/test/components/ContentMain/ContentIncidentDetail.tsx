import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IncidentCategoryAPI from "../../../../../../apis/IncidentReportAPI";
import "./IncidentReportDetails.css";
import axios from "axios";
import IncidentReportStatusAPI from "../../../../../../apis/IncidentReportStatusAPI";
import IncidentReportDiscussionAPI from "../../../../../../apis/IncidentReportDiscussionAPI";
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
  location: string;
};

type status = "WAITING" | "IN_PROGRESS" | "FIXED";

type IncidentReportStatus = {
  id: number;
  status: status;
  description: string;
  date: string;
};

type IncidentReportDiscussion = {
  id: number;
  description: string;
  user: {
    id: number;
    username: string;
  };
  date: string;
};

function formatUsername(username: string): string {
  return (
    username.slice(0, 2) +
    "*".repeat(username.slice(2, -2).length) +
    username.slice(-2)
  );
}

function ContentIncidentDetail() {
  const { id } = useParams();
  const [incidentReportItem, setIncidentReportItem] =
    useState<IncidentReport | null>(null);
  const [incidentReportStatus, setIncidentReportStatus] = useState<
    IncidentReportStatus[]
  >([]);
  const [incidentReportDiscussion, setIncidentReportDiscussion] = useState<
    IncidentReportDiscussion[]
  >([]);
  const [newComment, setNewComment] = useState("");
  const handleCommentChange = (e: any) => {
    setNewComment(e.target.value);
  };
  const handleCommentSubmit = async () => {
    try {
      if (newComment.trim() !== "") {
        await IncidentReportDiscussionAPI.createIncidentReportDiscussion(
          newComment,
          id
        );

        setNewComment("");
      }
    } catch (error) {
      console.error("Error creating discussion:", error);
    }
  };
  useEffect(() => {
    if (
      incidentReportItem &&
      incidentReportItem.latitude &&
      incidentReportItem.longitude
    ) {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${incidentReportItem.latitude}&lon=${incidentReportItem.longitude}`;

      axios
        .get(url)
        .then((response) => {
          setIncidentReportItem((prevReport: any) => ({
            ...prevReport,
            location: response.data.address.road,
          }));
          console.log(response.data.address.road);
        })
        .catch((error) => {
          console.error("Error fetching location:", error);
        });
    }
  }, [incidentReportItem]);

  useEffect(() => {
    async function fetchIncidentReport() {
      try {
        const incidentReportResponse =
          await IncidentCategoryAPI.getIncidentCategoryById(id); // Implement this API call
        setIncidentReportItem(incidentReportResponse);
      } catch (error) {
        console.error("Error fetching news item:", error);
      }
    }
    fetchIncidentReport();

    async function fetchIncidentReportStatus() {
      try {
        const incidentReportStatusResponse =
          await IncidentReportStatusAPI.getIncidentReportStatusById(id);
        setIncidentReportStatus(incidentReportStatusResponse);
      } catch (error) {
        console.error("Error fetching news item:", error);
      }
    }

    fetchIncidentReportStatus();
  }, [id]);

  useEffect(() => {
    async function fetchIncidentReportDicussion() {
      try {
        const incidentReportDiscussionResponse =
          await IncidentReportDiscussionAPI.getIncidentReportDiscussionById(id);
        setIncidentReportDiscussion(incidentReportDiscussionResponse);
      } catch (error) {
        console.error("Error fetching news item:", error);
      }
    }

    fetchIncidentReportDicussion();
  }, [incidentReportDiscussion]);

  if (!incidentReportItem) {
    return <div>Loading...</div>;
  }

  const formattedDate = new Date(incidentReportItem.date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const formattedUsername = formatUsername(incidentReportItem.user.username);

  return (
    <div>
      <div className="color-background min-h-screen">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="content">
                <div className="img">
                  <img
                    src={`/incidentReportPhotos/${incidentReportItem.file}`}
                    alt=""
                  />
                </div>

                <div className="text">
                  <h1 className="title mb-0">{incidentReportItem.title}</h1>
                  <h5 className="font-bold mb-0">
                    {incidentReportItem.incidentCategory.name} |{" "}
                    {incidentReportItem.location}
                  </h5>
                  <h5 className="font-bold ">
                    {formattedDate} | By {formattedUsername}
                  </h5>
                  <p
                    className="text-justify"
                    dangerouslySetInnerHTML={{
                      __html: incidentReportItem.description,
                    }}
                  />

                  <section className="notification-section">
                    <div className="group-header">
                      <div className="group-title font-bold">Progress</div>
                    </div>
                    <div className="notification-grid">
                      {incidentReportStatus.map((incidentReport) => (
                        <>
                          <div className="avatar">
                            <img src="/images/admin.jpg" />
                          </div>
                          <div className="notification-card">
                            <div className="notification-header">
                              <svg
                                className="icon svg-inline--fa fa-bell fa-w-14"
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="bell"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                              >
                                <path
                                  fill="currentColor"
                                  d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"
                                ></path>
                              </svg>
                              <div className="notification-title">
                                {incidentReport.status}
                              </div>
                              <div className="notification-time">
                                {new Date(incidentReport.date).toLocaleString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  }
                                )}
                              </div>
                            </div>
                            <div className="notification-content">
                              {incidentReport.description}
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </section>
                </div>
                <div></div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <div className="card py-4 px-8">
                <h5>Discussion</h5>
                {incidentReportDiscussion.map((incidentReportDicuss) => (
                  <>
                    <div className="flex mt-0">
                      <img
                        className="rounded-full img-sm mt-3"
                        alt="Profile Picture"
                        src="/images/admin.jpg"
                      />
                      <div className="ml-4">
                        <a className="text-[#000000] text-lg font-bold">
                          <br />
                          {incidentReportDicuss.user.username}
                        </a>
                        <p className="text-xs text-[#808080]">
                          {new Date(incidentReportDicuss.date).toLocaleString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            }
                          )}
                        </p>
                        <p className="my-0">
                          {incidentReportDicuss.description}
                        </p>
                      </div>
                    </div>
                    <hr className="my-2" />
                  </>
                ))}
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={2}
                  placeholder="What do you think about this incident?"
                  value={newComment} // Bind the comment input to the state
                  onChange={handleCommentChange} // Handle changes in the comment input
                ></textarea>

                <div className="row justify-end">
                  <div className="col-3 float-right">
                    <button
                      type="button"
                      className="btn btn-primary float-right mt-3"
                      onClick={handleCommentSubmit} // Handle the "Comment" button click
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentIncidentDetail;
