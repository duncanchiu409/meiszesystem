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

const Customer = () => {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = [
    {
      field: "group",
      headerName: t("Customers List.Group"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "name",
      headerName: t("Customers List.Name"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "gender",
      headerName: t("Customers List.Gender"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "address",
      headerName: t("Customers List.Address"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "email",
      headerName: t("Customers List.Email"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "mobile",
      headerName: t("Customers List.Mobile"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "doj",
      headerName: t("Customers List.Join Date"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "follow",
      headerName: t("Customers List.Follow-Up"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "source",
      headerName: t("Customers List.Source"),
      headerClassName: "custom-container-table-head",
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
    const getCustomers = () => {
      onValue(ref(db, "customers"), (snapshot) => {
        if (snapshot.val() !== null) {
          const obj = snapshot.val()
          setCustomers(() => Object.keys(obj).map((key) => ({ id: key, ...obj[key] })));
        }
      });
    };

    getCustomers();
  }, []);

  const tableRef = useRef(null);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <div className="text-end">
            <h1>{t("table.Customers List")}</h1>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="input-wrapper">
                <FaSearch id="search-icon" />
                <input
                  type="text"
                  className="inputField"
                  placeholder="Search Customer"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </div>
              <NavLink to="add" className="btn-create">
                {t("Excel.Create")}
              </NavLink>
              <DownloadTableExcel
                filename="Customers table"
                sheet="Customers"
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
                rows={customers}
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
                <th style={{ textAlign: "center" }}>
                  {t("Customers List.Group")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Customers List.Name")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Customers List.Gender")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Customers List.Address")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Customers List.Email")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Customers List.Mobile")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Customers List.Join Date")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Customers List.Follow-Up")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Customers List.Source")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Customers List.Action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(customers)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? customers[id]
                    : customers[id].name.toLowerCase().includes(search);
                })
                .sort((a, b) =>
                  customers[a].name > customers[b].name ? 1 : -1
                )
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {customers[id].group}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {customers[id].name}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {customers[id].gender}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {customers[id].address}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {customers[id].email}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {customers[id].mobile}
                      </td>

                      <td style={{ textAlign: "center" }}>
                        {customers[id].doj}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {customers[id].follow}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {customers[id].source}
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
                                "Are you sure that you wanted to delete that customer?"
                              )
                            ) {
                              remove(ref(db, "customers/" + id));
                              window.location.reload(true);
                            }
                          }}
                        >
                          Delete
                        </button>
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

export default Customer;
