import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../../firebase";
import { onValue, ref, remove } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import "../../../App.css";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

const SR = () => {
  const [search, setSearch] = useState("");
  const [staff, setStaff] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = [
    {
      field: "staffno",
      headerName: t("Salary And MPF Report.Staff no"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "name",
      flex: 1,
      headerName: t("Salary And MPF Report.Staff Name"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "position",
      headerName: t("Salary And MPF Report.Position"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "month",
      headerName: t("Salary And MPF Report.Month"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "salary",
      headerName: t("Salary And MPF Report.Salary"),
      type: "number",
      headerClassName: "custom-container-table-head",
    },
    {
      field: "commission",
      headerName: t("Salary And MPF Report.Commission"),
      type: "number",
      headerClassName: "custom-container-table-head",
    },
    {
      field: "MPF",
      flex: 1,
      headerName: t("Salary And MPF Report.MPF"),
      type: "number",
      headerClassName: "custom-container-table-head",
      valueGetter: (value, row) => {
        return row.salary > 30000 ? 1500 : row.salary * 0.05;
      },
    },
    {
      field: "idk",
      headerName: t("Salary And MPF Report.Salary After deduct MPF"),
      headerClassName: "custom-container-table-head",
      valueGetter: (value, row) => {
        return row.salary > 30000 ? 1500 : row.salary * 0.05;
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: t("Table Actions.actions"),
      headerClassName: "custom-container-table-head",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          onClick={() => {
            navigate(`view/${params.id}`);
          }}
          label={t("Table Actions.view")}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => {
            navigate(`update/${params.id}`);
          }}
          label={t("Table Actions.edit")}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={() => {}}
          label={t("Table Actions.delete")}
          showInMenu
        />,
      ],
    },
  ];

  useEffect(() => {
    const getStaff = () => {
      onValue(ref(db, "salaryreport"), (snapshot) => {
        if (snapshot.val() !== null) {
          const obj = snapshot.val();
          setStaff(() =>
            Object.keys(obj).map((key) => ({ id: key, ...obj[key] }))
          );
        }
      });
    };

    getStaff();
  }, []);

  const tableRef = useRef(null);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <div className="text-end">
            <h1>{t("table.Salary And MPF Report")}</h1>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="input-wrapper">
                <FaSearch id="search-icon" />
                <input
                  type="text"
                  className="inputField"
                  placeholder="Search Staff"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </div>
              <NavLink to="add" className="btn-create">
                {t("Excel.Create")}
              </NavLink>
              <DownloadTableExcel
                filename="Salary Report table"
                sheet="Salary Report"
                currentTableRef={tableRef.current}
              >
                <button className="btn-create">
                  {" "}
                  {t("Excel.Export Excel")}{" "}
                </button>
              </DownloadTableExcel>
            </div>
          </div>

          {/* div wtih .custom-container to override the bootstrap css */}
          <div className="custom-container">
            <Box sx={{ mt: 1, color: "white" }}>
              <DataGrid
                autoHeight
                sx={{ minHeight: 400, color: "var(--sidebar-font-color)" }}
                rows={staff}
                columns={columns}
                initialState={{
                  pagination: { paginationModel: { page: 0, pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10]}
              />
            </Box>
          </div>

          <table className="styled-table" ref={tableRef} style={{ display: 'none' }}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Staff No.</th>
                <th style={{ textAlign: "center" }}>Staff Name</th>
                <th style={{ textAlign: "center" }}>Position</th>
                <th style={{ textAlign: "center" }}>Month</th>
                <th style={{ textAlign: "center" }}>Salary</th>
                <th style={{ textAlign: "center" }}>Commission</th>
                <th style={{ textAlign: "center" }}>MPF</th>
                <th style={{ textAlign: "center" }}>Salary After deduct MPF</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(staff)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? staff[id]
                    : staff[id].name.toLowerCase().includes(search);
                })
                .sort((a, b) => (staff[a].name > staff[b].code ? 1 : -1))
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {staff[id].staffno}
                      </td>
                      <td style={{ textAlign: "center" }}>{staff[id].name}</td>
                      <td style={{ textAlign: "center" }}>
                        {staff[id].position}
                      </td>
                      <td style={{ textAlign: "center" }}>{staff[id].month}</td>
                      <td style={{ textAlign: "center" }}>
                        ${staff[id].salary}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ${staff[id].commission}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        $
                        {staff[id].salary > 30000
                          ? 1500
                          : staff[id].salary * 0.05}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        $
                        {staff[id].salary -
                          (staff[id].salary > 30000
                            ? 1500
                            : staff[id].salary * 0.05)}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <NavLink to={`update/${id}`} className="btn-edit">
                          Edit
                        </NavLink>
                        <button
                          className="btn-delete"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure that you wanted to delete that Salary and MPF report?"
                              )
                            ) {
                              remove(ref(db, "salaryreport/" + id));
                              window.location.reload(true);
                            }
                          }}
                        >
                          Delete
                        </button>
                        <NavLink to={`view/${id}`} className="btn-view">
                          Receipt
                        </NavLink>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SR;
