import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../../firebase";
import { onValue, ref } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import "../../../App.css";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

const AdvanceInvoice = () => {
  const [search, setSearch] = useState("");
  const [AdvanceInvoice, setAdvanceInvoice] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = [
    {
      field: "no",
      headerName: t("Advance Invoice List.Advance Invoice no"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "date",
      headerName: t("Advance Invoice List.Date"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "bt",
      headerName: t("Advance Invoice List.Bill to"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "item",
      headerName: t("Advance Invoice List.Item"),
      flex: 1,
      headerClassName: "custom-container-table-head",
    },
    {
      field: "total",
      headerName: t("Advance Invoice List.Total Amount"),
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
    const getAdvanceInvoice = () => {
      onValue(ref(db, "AdvanceInvoice"), (snapshot) => {
        if (snapshot.val() !== null) {
          const obj = snapshot.val();
          setAdvanceInvoice(() =>
            Object.keys(obj).map((key) => ({ id: key, ...obj[key] }))
          );
        }
      });
    };

    getAdvanceInvoice();
  }, []);

  const tableRef = useRef(null);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <div className="text-end">
            <h1>{t("table.Advance Invoice List")}</h1>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="input-wrapper">
                <FaSearch id="search-icon" />
                <input
                  type="text"
                  className="inputField"
                  placeholder="Search Bar Code"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </div>
              <NavLink to="add" className="btn-create">
                {t("Excel.Create")}
              </NavLink>
              <DownloadTableExcel
                filename="Advance Invoice table"
                sheet="Advance Invoice"
                currentTableRef={tableRef.current}
              >
                <button className="btn-create">
                  {" "}
                  {t("Excel.Export Excel")}{" "}
                </button>
              </DownloadTableExcel>
            </div>
          </div>

          <div className="custom-container">
            <Box sx={{ mt: 1, color: "white" }}>
              <DataGrid
                autoHeight
                sx={{ minHeight: 400, color: "var(--sidebar-font-color)" }}
                rows={AdvanceInvoice}
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
                  {t("Advance Invoice List.Advance Invoice no")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Advance Invoice List.Date")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Advance Invoice List.Bill to")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Advance Invoice List.Item")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Advance Invoice List.Total Amount")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Advance Invoice List.Action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(AdvanceInvoice)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? AdvanceInvoice[id]
                    : AdvanceInvoice[id].barcode.toLowerCase().includes(search);
                })
                .sort((a, b) =>
                  AdvanceInvoice[a].no > AdvanceInvoice[b].no ? 1 : -1
                )
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {AdvanceInvoice[id].no}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {AdvanceInvoice[id].date}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {AdvanceInvoice[id].bt}
                      </td>

                      <td style={{ textAlign: "center" }}>
                        {AdvanceInvoice[id].item}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ${AdvanceInvoice[id].total}
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

export default AdvanceInvoice;
