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

const ClientsPurchase = () => {
  const [search, setSearch] = useState("");
  const [ClientsPurchase, setClientsPurchase] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = [
    {
      field: "name",
      flex: 0.3,
      headerName: t("Clients Purchase List.Service"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "total",
      type: 'number',
      flex: 0.3,
      headerName: t("Clients Purchase List.Total Price"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "pb",
      flex: 0.3,
      headerName: t("Clients Purchase List.Purchased By"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "remark",
      flex: 0.3,
      headerName: t("Clients Purchase List.Remark"),
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
          icon={<DeleteIcon />}
          onClick={() => {}}
          label={t("Table Actions.delete")}
        />,
      ],
    },
  ];

  useEffect(() => {
    const getClientsPurchase = () => {
      onValue(ref(db, "ClientsPurchase"), (snapshot) => {
        if (snapshot.val() !== null) {
          const obj = snapshot.val();
          setClientsPurchase(() =>
            Object.keys(obj).map((key) => ({ id: key, ...obj[key] }))
          );
        }
      });
    };

    getClientsPurchase();
  }, []);

  const tableRef = useRef(null);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <div className="text-end">
            <h1>{t("table.Clients Purchase List")}</h1>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="input-wrapper">
                <FaSearch id="search-icon" />
                <input
                  type="text"
                  className="inputField"
                  placeholder="Search Service"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </div>
              <NavLink to="add" className="btn-create">
                {t("Excel.Create")}
              </NavLink>
              <DownloadTableExcel
                filename="Clients Purchase table"
                sheet="Clients Purchase"
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
                rows={ClientsPurchase}
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
                  {t("Clients Purchase List.Service")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Clients Purchase List.Total Price")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Clients Purchase List.Purchased By")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Clients Purchase List.Remark")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Clients Purchase List.Action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(ClientsPurchase)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? ClientsPurchase[id]
                    : ClientsPurchase[id].name.toLowerCase().includes(search);
                })
                .sort((a, b) =>
                  ClientsPurchase[a].name > ClientsPurchase[b].name ? 1 : -1
                )
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {ClientsPurchase[id].name}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {ClientsPurchase[id].total}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {ClientsPurchase[id].pb}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {ClientsPurchase[id].remark}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          className="btn-delete"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure that you wanted to delete that purchase?"
                              )
                            ) {
                              remove(ref(db, "PSP/" + id));
                              window.location.reload(true);
                            }
                          }}
                        >
                          Cancel Purchase
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

export default ClientsPurchase;
