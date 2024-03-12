import "./ContentMain.css";
import "bootstrap/dist/css/bootstrap.css";
import DatatableAdmin from "../../../../../../components/inside/admin/Datatable/Datatable";
const ContentMain = () => {
  return (
    <div className="main-content-holder">
      <div className="color-background min-vh-100 d-flex flex-column">
        <div className="flex-grow-1">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <DatatableAdmin
                  titlePage="Incident Category"
                  columnHeader={["Code", "Name"]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentMain;
