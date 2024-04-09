import React, { useState, useEffect, Reservationef, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../firebase";
import { onValue, ref, remove } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import "../../App.css";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem, useGridApiContext, useGridApiRef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

const Resevation = () => {
  const [search, setSearch] = useState("");
  const [Resevation, setResevation] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = [
    {
      field: "date",
      headerName: t("Reservation List.Date"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "time",
      headerName: t("Reservation List.Time"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "customer",
      headerName: t("Reservation List.Client"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "service",
      flex: 1,
      headerName: t("Reservation List.Service"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "staff",
      headerName: t("Reservation List.Staff"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "room",
      headerName: t("Reservation List.Room"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "site",
      headerName: t("Reservation List.Site"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "actions",
      type: "actions",
      headerName: t("Table Actions.actions"),
      headerClassName: "custom-container-table-head",
      getActions: (params) => [
        // <GridActionsCellItem
        //   icon={<VisibilityIcon />}
        //   onClick={() => {
        //     navigate(`view/${params.id}`);
        //   }}
        //   label={t("Table Actions.view")}
        //   showInMenu
        // />,
        // <GridActionsCellItem
        //   icon={<EditIcon />}
        //   onClick={() => {
        //     navigate(`update/${params.id}`);
        //   }}
        //   label={t("Table Actions.edit")}
        //   showInMenu
        // />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={() => {}}
          label={t("Table Actions.delete")}
        />,
      ],
    },
  ];

  useEffect(() => {
    const getResevation = () => {
      onValue(ref(db, "Reservation"), (snapshot) => {
        if (snapshot.val() !== null) {
          const obj = snapshot.val();
          setResevation(() =>
            Object.keys(obj).map((key) => ({ id: key, ...obj[key] }))
          );
          console.log(Resevation)
        }
      });
    };

    getResevation();
  }, []);

  const tableRef = useRef();
  const gridRef = useGridApiRef()

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <div className="text-end">
            <h1>{t("table.Resevation List")}</h1>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="input-wrapper">
                <FaSearch id="search-icon" />
                <input
                  type="text"
                  className="inputField"
                  placeholder="Search Date..."
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </div>
              <NavLink to="add" className="btn-create">
                {t("Excel.Book")}
              </NavLink>
              <DownloadTableExcel
                filename="Reservation table"
                sheet="Reservation"
                currentTableRef={gridRef.current}
              >
                <button className="btn-create" onClick={() => console.log(tableRef, gridRef)}>
                  {" "}
                  {t("Excel.Export Excel")}{" "}
                </button>
              </DownloadTableExcel>{" "}
            </div>
          </div>

          {/* div wtih .custom-container to override the bootstrap css */}
          <div className="custom-container">
            <Box sx={{ mt: 1, color: "white" }}>
              <DataGrid
                autoHeight
                sx={{ minHeight: 400, color: "var(--sidebar-font-color)" }}
                rows={Resevation}
                columns={columns}
                initialState={{
                  pagination: { paginationModel: { page: 0, pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10]}
                apiRef={gridRef}
              />
            </Box>
          </div>

          <table className="styled-table" ref={tableRef} style={{ display: 'none' }}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Date</th>
                <th style={{ textAlign: "center" }}>Time</th>
                <th style={{ textAlign: "center" }}>Client</th>
                <th style={{ textAlign: "center" }}>Service</th>
                <th style={{ textAlign: "center" }}>Staff</th>
                <th style={{ textAlign: "center" }}>Room</th>
                <th style={{ textAlign: "center" }}>Site</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(Resevation)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? Resevation[id]
                    : Resevation[id].date.toLowerCase().includes(search);
                })
                .sort((a, b) =>
                  Resevation[a].date > Resevation[b].date ? 1 : -1
                )
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {Resevation[id].date}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {Resevation[id].time}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {Resevation[id].customer}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {Resevation[id].service}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {Resevation[id].staff}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {Resevation[id].room}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {Resevation[id].site}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          className="btn-delete"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure that you wanted to delete that Resevation?"
                              )
                            ) {
                              remove(ref(db, "Resevation/" + id));
                              window.location.reload(true);
                            }
                          }}
                        >
                          Cancel Booking
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

export default Resevation;
