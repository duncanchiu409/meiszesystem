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

const PSP = () => {
  const [search, setSearch] = useState("");
  const [PSP, setPSP] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = [
    {
      field: "name",
      headerName: t("Purchase Service List.Service"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "plan",
      headerName: t("Purchase Service List.Plan"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "quantity",
      headerName: t("Purchase Service List.Quantity"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "sd",
      headerName: t("Purchase Service List.Start Day"),
      flex: 1,
      headerClassName: "custom-container-table-head",
    },
    {
      field: "ed",
      headerName: t("Purchase Service List.End Day"),
      type: "number",
      headerClassName: "custom-container-table-head",
    },
    {
      field: "pb",
      headerName: t("Purchase Service List.Purchase By"),
      type: "number",
      headerClassName: "custom-container-table-head",
    },
    {
      field: "actions",
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
    const getPSP = () => {
      onValue(ref(db, "PSP"), (snapshot) => {
        if (snapshot.val() !== null) {
          const obj = snapshot.val();
          setPSP(() =>
            Object.keys(obj).map((key) => ({ id: key, ...obj[key] }))
          );
        }
      });
    };

    getPSP();
  }, []);

  const tableRef = useRef(null);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <div className="text-end">
            <h1>{t("table.Purchase Service List")}</h1>
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
                filename="Purchase Service table"
                sheet="Purchase Service"
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
                rows={PSP}
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
                <th style={{ textAlign: "center" }}>Service</th>
                <th style={{ textAlign: "center" }}>Plan</th>
                <th style={{ textAlign: "center" }}>Quantity</th>
                <th style={{ textAlign: "center" }}>Start Day</th>
                <th style={{ textAlign: "center" }}>End Day</th>
                <th style={{ textAlign: "center" }}>Purchased By</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(PSP)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? PSP[id]
                    : PSP[id].name.toLowerCase().includes(search);
                })
                .sort((a, b) => (PSP[a].name > PSP[b].name ? 1 : -1))
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>{PSP[id].name}</td>
                      <td style={{ textAlign: "center" }}>{PSP[id].plan}</td>
                      <td style={{ textAlign: "center" }}>
                        {PSP[id].quantity}
                      </td>
                      <td style={{ textAlign: "center" }}>{PSP[id].sd}</td>
                      <td style={{ textAlign: "center" }}>{PSP[id].ed}</td>
                      <td style={{ textAlign: "center" }}>{PSP[id].pb}</td>
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

export default PSP;
