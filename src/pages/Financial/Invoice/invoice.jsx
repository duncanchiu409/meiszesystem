import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db, storage } from "../../../firebase";
import { onValue, ref, remove } from "firebase/database";
import { getDownloadURL, ref as sRef } from "firebase/storage";
import { FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import "../../../App.css";
import { Box, CssBaseline } from "@mui/material";
import { bgcolor, height, width } from "@mui/system";
import { number } from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

const Invoice = () => {
  const [search, setSearch] = useState("");
  const [invoice, setInvoice] = useState([]);
  const [resume, setResume] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = [
    {
      field: "no",
      headerName: t("Invoice List.Invoice no"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "date",
      headerName: t("Invoice List.Date"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "bt",
      headerName: t("Invoice List.Billed to"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "item",
      headerName: t("Invoice List.Item"),
      flex: 1,
      headerClassName: "custom-container-table-head",
    },
    {
      field: "quantity",
      headerName: t("Invoice List.Quantity"),
      type: "number",
      headerClassName: "custom-container-table-head",
    },
    {
      field: "price",
      headerName: t("Invoice List.Price"),
      type: "number",
      headerClassName: "custom-container-table-head",
    },
    {
      field: "total",
      headerName: t("Invoice List.Total"),
      type: "number",
      headerClassName: "custom-container-table-head",
    },
    {
      field: "status",
      headerName: t("Invoice List.Status"),
      headerClassName: "custom-container-table-head",
      renderCell: (params) => {
        return <div style={ params.value === 'Accepted' ? { color: 'green' } : { color: 'red' }}>{ params.value }</div>
      }
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

  // const onDeleteById = id =>{

  //   setInvoice(oldValues =>{
  //     return (

  //       Object.keys(oldValues).filter(invoice => invoice[id] !== id)

  //       )
  //   })
  // }

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    getDownloadURL(sRef(storage, "meisze-invoice-template-pdf.pdf")).then(
      (url) => {
        setResume(url);
      }
    );
  });

  useEffect(() => {
    const getInvoice = () => {
      onValue(ref(db, "Invoice"), (snapshot) => {
        if (snapshot.val() !== null) {
          const obj = snapshot.val();
          setInvoice(() =>
            Object.keys(obj).map((key) => ({ id: key, ...obj[key] }))
          );
        }
      });
    };

    getInvoice();
  }, []);

  const tableRef = useRef(null);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <div className="text-end">
            <h1>{t("table.Invoice List")}</h1>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="input-wrapper">
                <FaSearch id="search-icon" style={{ marginRight: "5px" }} />
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
                filename="Invoice table"
                sheet="Invoice"
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

          {/* div wtih .custom-container to override the bootstrap css */}
          <div className="custom-container">
            <Box sx={{ mt: 1, color: "white" }}>
              <DataGrid
                autoHeight
                sx={{ minHeight: 400, color: "var(--sidebar-font-color)" }}
                rows={invoice}
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
                  {t("Invoice List.Invoice no")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Invoice List.Date")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Invoice List.Billed to")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Invoice List.Item")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Invoice List.Quantity")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Invoice List.Price")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Invoice List.Total")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Invoice List.Status")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Invoice List.Action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {invoice
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? invoice[id]
                    : invoice[id].no.toLowerCase().includes(search);
                })
                .sort((a, b) => (invoice[a].no > invoice[b].no ? 1 : -1))
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>{invoice[id].no}</td>
                      <td style={{ textAlign: "center" }}>
                        {invoice[id].date}
                      </td>
                      <td style={{ textAlign: "center" }}>{invoice[id].bt}</td>
                      <td style={{ textAlign: "center" }}>
                        {invoice[id].item}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {invoice[id].quantity}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ${invoice[id].price}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ${invoice[id].total}
                      </td>
                      {invoice[id].status === "Accepted" ? (
                        <td style={{ textAlign: "center", color: "green" }}>
                          {invoice[id].status}
                        </td>
                      ) : (
                        <td style={{ textAlign: "center" }}>
                          {invoice[id].status}
                        </td>
                      )}

                      <td style={{ textAlign: "center" }}>
                        <NavLink to={`update/${id}`} className="btn-edit">
                          Edit
                        </NavLink>
                        <button
                          className="btn-delete"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure that you wanted to delete that invoice?"
                              )
                            ) {
                              remove(ref(db, "Invoice/" + id));
                              remove(ref(db, "Contract/" + id));
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

export default Invoice;
