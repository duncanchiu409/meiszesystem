import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../../firebase";
import { onValue, ref, remove } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import "../../../App.css";
import { useTranslation } from "react-i18next";
import { Box } from '@mui/material'
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

const User = () => {
  const [search, setSearch] = useState("");
  const [User, setUser] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate()
  
  const columns = [
    {
      field: "name",
      headerName: t("User List.User Name"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "permission",
      headerName: t("User List.Permission"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "doj",
      headerName: t("User List.Date of Join"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "mobile",
      headerName: t("User List.Mobile"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "email",
      headerName: t("User List.Email"),
      flex: 1,
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
    const getUser = () => {
      onValue(ref(db, "User"), (snapshot) => {
        if (snapshot.val() !== null) {
          const obj = snapshot.val()
          setUser(() => Object.keys(obj).map((key) => ({ id: key, ...obj[key] })));
        }
      });
    };

    getUser();
  }, []);

  const tableRef = useRef(null);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <div className="text-end">
            <h1>{t("table.User List")}</h1>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="input-wrapper">
                <FaSearch id="search-icon" />
                <input
                  type="text"
                  className="inputField"
                  placeholder="Search User"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </div>
              <NavLink to="add" className="btn-create">
                {t("Excel.Create")}
              </NavLink>
              <DownloadTableExcel
                filename="User table"
                sheet="User"
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
            <Box sx={{ mt: 1, color: 'white' }}>
              <DataGrid
                autoHeight
                sx={{ minHeight: 400, color: 'var(--sidebar-font-color)' }}
                rows={User}
                columns={columns}
                initialState={{
                  pagination: { paginationModel: { page: 0, pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10]}
              />
            </Box>
          </div>

          {/* <table className="styled-table" ref={tableRef}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>User Name</th>
                <th style={{ textAlign: "center" }}>Permission</th>
                <th style={{ textAlign: "center" }}>Date of Join</th>
                <th style={{ textAlign: "center" }}>Mobile</th>
                <th style={{ textAlign: "center" }}>Email</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(User)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? User[id]
                    : User[id].name.toLowerCase().includes(search);
                })
                .sort((a, b) => (User[a].name > User[b].code ? 1 : -1))
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>{User[id].name}</td>
                      <td style={{ textAlign: "center" }}>
                        {User[id].permission}
                      </td>
                      <td style={{ textAlign: "center" }}>{User[id].doj}</td>
                      <td style={{ textAlign: "center" }}>{User[id].mobile}</td>
                      <td style={{ textAlign: "center" }}>{User[id].email}</td>
                      <td style={{ textAlign: "center" }}>
                        <NavLink to={`update/${id}`} className="btn-edit">
                          Edit
                        </NavLink>
                        <button
                          className="btn-delete"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure that you wanted to delete that staff?"
                              )
                            ) {
                              remove(ref(db, "staff/" + id));
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
          </table> */}
        </div>
      </div>
    </div>
  );
};

export default User;
