import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db, storage } from "../../../firebase";
import { onValue, ref, remove } from "firebase/database";
import { getDownloadURL, ref as sRef } from "firebase/storage";
import { FaSearch } from "react-icons/fa";
import "../../../App.css";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

const Quotation = () => {
  const [search, setSearch] = useState("");
  const [Quotation, setQuotation] = useState([]);
  const [resume, setResume] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = [
    {
      field: "no",
      headerName: t("Quotation List.Quotation no"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "date",
      flex: 0.4,
      headerName: t("Quotation List.Date"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "item",
      headerName: t("Quotation List.Item"),
      flex: 1,
      headerClassName: "custom-container-table-head",
    },
    {
      field: "quantity",
      headerName: t("Quotation List.Quantity"),
      type: "number",
      headerClassName: "custom-container-table-head",
    },
    {
      field: "price",
      headerName: t("Quotation List.Price"),
      type: "number",
      headerClassName: "custom-container-table-head",
    },
    {
      field: "total",
      headerName: t("Quotation List.Total"),
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
  ];

  useEffect(() => {
    const getQuotation = () => {
      onValue(ref(db, "Quotation"), (snapshot) => {
        if (snapshot.val() !== null) {
          const obj = snapshot.val();
          setQuotation(() =>
            Object.keys(obj).map((key) => ({ id: key, ...obj[key] }))
          );
        }
      });
    };

    getQuotation();
  }, []);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    getDownloadURL(sRef(storage, "meisze-quotation-template-pdf.pdf")).then(
      (url) => {
        setResume(url);
      }
    );
  });

  const tableRef = useRef(null);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <div className="text-end">
            <h1>{t("table.Quotation List")}</h1>
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
                filename="Quotation table"
                sheet="Quotation"
                currentTableRef={tableRef.current}
              >
                <button className="btn-create">
                  {" "}
                  {t("Excel.Export Excel")}{" "}
                </button>
              </DownloadTableExcel>
              <button
                className="btn-create"
                onClick={() => openInNewTab(resume)}
              >
                {t("Excel.Export PDF")}
              </button>
            </div>
          </div>

          <div className="custom-container">
            <Box sx={{ mt: 1, color: "white" }}>
              <DataGrid
                autoHeight
                sx={{ minHeight: 400, color: "var(--sidebar-font-color)" }}
                rows={Quotation}
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
                <th style={{ textAlign: "center" }}>
                  {t("Quotation List.Quotation no")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Quotation List.Date")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Quotation List.Item")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Quotation List.Quantity")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Quotation List.Price")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Quotation List.Total")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Quotation List.Action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(Quotation)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? Quotation[id]
                    : Quotation[id].no.toLowerCase().includes(search);
                })
                .sort((a, b) => (Quotation[a].no > Quotation[b].no ? 1 : -1))
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {Quotation[id].no}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {Quotation[id].date}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {Quotation[id].item}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {Quotation[id].quantity}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {Quotation[id].price}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {Quotation[id].total}
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
                                "Are you sure that you wanted to delete that quotation?"
                              )
                            ) {
                              remove(ref(db, "Quotation/" + id));
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
          </table> */}
        </div>
      </div>
    </div>
  );
};

export default Quotation;
