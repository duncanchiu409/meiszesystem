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

const SP = () => {
  const [search, setSearch] = useState("");
  const [shift, setShift] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const getShift = () => {
      onValue(ref(db, "shiftpattern"), (snapshot) => {
        if (snapshot.val() !== null) {
          const obj = snapshot.val();
          setShift(() =>
            Object.keys(obj).map((key) => ({ id: key, ...obj[key] }))
          );
        }
      });
    };

    getShift();
  }, []);

  const columns = [
    {
      field: "position",
      flex: 0.3,
      headerName: t("Shift Pattern List.Shift"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "shiftpattern",
      flex: 0.3,
      headerName: t("Shift Pattern List.Shift Pattern"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "actions",
      flex: 0.3,
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

  const tableRef = useRef(null);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <div className="text-end">
            <h1>{t("table.Shift Pattern List")}</h1>
            <div style={{ display: "flex", flexDirection: 'row' }}>
              <div className="input-wrapper">
                <FaSearch id="search-icon" />
                <input
                  type="text"
                  className="inputField"
                  placeholder="Search Shift Pattern"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </div>
              <NavLink to="add" className="btn-create">
                {t("Excel.Create")}
              </NavLink>
              <DownloadTableExcel
                filename="Shift Pattern table"
                sheet="Shift Pattern"
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
                rows={shift}
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
                <th style={{ textAlign: "center" }}>Shift</th>
                <th style={{ textAlign: "center" }}>Shift Pattern</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(shift)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? shift[id]
                    : shift[id].position.toLowerCase().includes(search);
                })
                .sort((a, b) =>
                  shift[a].position > shift[b].position ? 1 : -1
                )
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {shift[id].position}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {shift[id].shiftpattern}
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
                                "Are you sure that you wanted to delete that shift pattern?"
                              )
                            ) {
                              remove(ref(db, "shiftpattern/" + id));
                              window.location.reload(true);
                            }
                          }}
                        >
                          Delete
                        </button>
                        <NavLink to={`view/${id}`} className="btn-view">
                          View
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

export default SP;
