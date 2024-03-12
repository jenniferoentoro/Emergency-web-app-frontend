// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import TextField from "@mui/material/TextField";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

import UserAPI from "../../../apis/UserAPI";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "bootstrap/dist/css/bootstrap.css";
import NavbarInside from "../../../../components/inside/navbar/admin/NavbarInside";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { useNavigate } from "react-router";
import DatatableAdmin from "../../../../components/inside/admin/Datatable/Datatable";
export default function TutorialPage() {
  return (
    <div className="color-background min-h-screen">
      <NavbarInside>
        <DatatableAdmin
          titlePage="Tutorial"
          columnHeader={["Code", "Title", "Description", "Video", "Category"]}
        />
      </NavbarInside>
    </div>
  );
}
