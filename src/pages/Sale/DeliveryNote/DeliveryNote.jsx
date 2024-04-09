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

const DeliveryNote = () => {
  const [search, setSearch] = useState("");
  const [DeliveryNote, setDeliveryNote] = useState([]);
  const [resume, setResume] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = [
    {
      field: 'no',
      flex: 0.3,
      headerName: t("Delivery Note List.Delivery Note no"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: 'to',
      flex: 0.3,
      headerName: t("Delivery Note List.Delivery To"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: 'date',
      flex: 0.3,
      headerName: t("Delivery Note List.Date"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: 'item',
      flex: 0.3,
      headerName: t("Delivery Note List.Item"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: 'quantity',
      flex: 0.3,
      headerName: t("Delivery Note List.Quantity"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: 'price',
      flex: 0.3,
      headerName: t("Delivery Note List.Price"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: 'total',
      flex: 0.3,
      headerName: t("Delivery Note List.Total"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "actions",
      type: "actions",
      flex: 0.3,
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
    const getDeliveryNote = () => {
      onValue(ref(db, "DeliveryNote"), (snapshot) => {
        if (snapshot.val() !== null) {
          const obj = snapshot.val();
          setDeliveryNote(() =>
            Object.keys(obj).map((key) => ({ id: key, ...obj[key] }))
          );
        }
      });
    };

    getDeliveryNote();
  }, []);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    getDownloadURL(sRef(storage, "meisze-delivery-note-template-pdf.pdf")).then(
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
            <h1>{t("table.Delivery Note List")}</h1>
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
                filename="Delivery Note table"
                sheet="Delivery Note"
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
            <Box sx={{ mt: 1 }}>
              <DataGrid
                autoHeight
                sx={{ minHeight: 400 }}
                rows={DeliveryNote}
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
                  {t("Delivery Note List.Delivery Note no")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Delivery Note List.Delivery To")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Delivery Note List.Date")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Delivery Note List.Item")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Delivery Note List.Quantity")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Delivery Note List.Price")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Delivery Note List.Total")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Delivery Note List.Action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(DeliveryNote)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? DeliveryNote[id]
                    : DeliveryNote[id].no.toLowerCase().includes(search);
                })
                .sort((a, b) =>
                  DeliveryNote[a].no > DeliveryNote[b].no ? 1 : -1
                )
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {DeliveryNote[id].no}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {DeliveryNote[id].to}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {DeliveryNote[id].date}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {DeliveryNote[id].item}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {DeliveryNote[id].quantity}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ${DeliveryNote[id].price}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ${DeliveryNote[id].total}
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
                                "Are you sure that you wanted to delete that delivery note?"
                              )
                            ) {
                              remove(ref(db, "DeliveryNote/" + id));
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

export default DeliveryNote;
