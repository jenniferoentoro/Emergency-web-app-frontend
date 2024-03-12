import "bootstrap/dist/css/bootstrap.css";
import NavbarInside from "../../../components/inside/navbar/admin/NavbarInside";
import DatatableAdmin from "../../../components/inside/admin/Datatable/Datatable";
export default function CategoryPage() {
  return (
    <div className="color-background min-h-screen">
      <NavbarInside>
        <DatatableAdmin
          titlePage="Incident Category"
          columnHeader={["Code", "Name"]}
        />
      </NavbarInside>
    </div>
  );
}
