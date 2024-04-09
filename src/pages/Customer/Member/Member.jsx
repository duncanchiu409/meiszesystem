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

const Member = () => {
  const [search, setSearch] = useState("");
  const [Member, setMember] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = [
    {
      field: "name",
      headerName: t("Member List.Name"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "email",
      flex: 1,
      headerName: t("Member List.Email"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "mobile",
      headerName: t("Member List.Mobile"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "ml",
      headerName: t("Member List.Membership"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "doj",
      headerName: t("Member List.Join Date"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "ed",
      headerName: t("Member List.End Date"),
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
  ]

  useEffect(() => {
    const getMember = () => {
      onValue(ref(db, "Member"), (snapshot) => {
        if (snapshot.val() !== null) {
          const obj = snapshot.val();
          setMember(() =>
            Object.keys(obj).map((key) => ({ id: key, ...obj[key] }))
          );
        }
      });
    };

    getMember();
  }, []);

  const tableRef = useRef(null);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <div className="text-end">
            <h1>{t("table.Member List")}</h1>
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
                filename="Member table"
                sheet="Member"
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
                rows={Member}
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
                <th style={{ textAlign: "center" }}>{t("Member List.Name")}</th>
                <th style={{ textAlign: "center" }}>
                  {t("Member List.Email")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Member List.Mobile")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Member List.Membership")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Member List.Join Date")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Member List.End Date")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Member List.Action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(Member)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? Member[id]
                    : Member[id].name.toLowerCase().includes(search);
                })
                .sort((a, b) => (Member[a].name > Member[b].name ? 1 : -1))
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>{Member[id].name}</td>
                      <td style={{ textAlign: "center" }}>
                        {Member[id].email}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {Member[id].mobile}
                      </td>
                      <td style={{ textAlign: "center" }}>{Member[id].ml}</td>
                      <td style={{ textAlign: "center" }}>{Member[id].doj}</td>
                      <td style={{ textAlign: "center" }}>{Member[id].ed}</td>

                      <td style={{ textAlign: "center" }}>
                        <NavLink to={`update/${id}`} className="btn-edit">
                          Edit
                        </NavLink>
                        <button
                          className="btn-delete"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure that you wanted to delete that member?"
                              )
                            ) {
                              remove(ref(db, "Members/" + id));
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

export default Member;
