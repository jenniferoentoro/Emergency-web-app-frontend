import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DatatableAdminIncident from "../../../../../../components/inside/admin/Datatable/DatatableIncident";
import "./ContentMain.css";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function IncidentReport() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="main-content-holder">
      <div className="color-background d-flex flex-column">
        <div className="flex-grow-1">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab label="Waiting" {...a11yProps(0)} />
                      <Tab label="Inprogress" {...a11yProps(1)} />
                      <Tab label="Fixed" {...a11yProps(2)} />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={value} index={0}>
                    <DatatableAdminIncident
                      titlePage="Waiting"
                      columnHeader={[
                        "Code",
                        "Title",
                        "Description",
                        "Category",
                        "Image",
                        "date",
                        "user",
                      ]}
                    />
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                    <DatatableAdminIncident
                      titlePage="In Progress"
                      columnHeader={[
                        "Code",
                        "Title",
                        "Description",
                        "Category",
                        "Image",
                        "date",
                        "user",
                      ]}
                    />
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={2}>
                    <DatatableAdminIncident
                      titlePage="Fixed"
                      columnHeader={[
                        "Code",
                        "Title",
                        "Description",
                        "Category",
                        "Image",
                        "date",
                        "user",
                      ]}
                    />
                  </CustomTabPanel>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
