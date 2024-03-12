import "./ContentMain.css";
import "bootstrap/dist/css/bootstrap.css";
import DatatableUser from "../../../../../../components/inside/admin/Datatable/DatatableUser";
const ContentManageUser = () => {
  return (
    <div className="main-content-holder">
      <div className="color-background min-vh-100 d-flex flex-column">
        <div className="flex-grow-1">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <DatatableUser
                  titlePage="Admin & Helper"
                  columnHeader={[
                    "code",
                    "username",
                    "firstName",
                    "lastName",
                    "email",
                    "phoneNumber",
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManageUser;
