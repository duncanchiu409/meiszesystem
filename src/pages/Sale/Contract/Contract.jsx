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

const Contract = () => {
  const [search, setSearch] = useState("");
  const [Contract, setContract] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = [
    {
      field: "no",
      headerName: t("Contract List.Contract no"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "buyer",
      headerName: t("Contract List.Buyer"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "date",
      headerName: t("Contract List.Date"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "item",
      headerName: t("Contract List.Item"),
      flex: 1,
      headerClassName: "custom-container-table-head",
    },
    {
      field: "quantity",
      headerName: t("Contract List.Quantity"),
      type: "number",
      headerClassName: "custom-container-table-head",
    },
    {
      field: "price",
      headerName: t("Contract List.Price"),
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
    const getContract = () => {
      onValue(ref(db, "Contract"), (snapshot) => {
        if (snapshot.val() !== null) {
          const obj = snapshot.val();
          setContract(() =>
            Object.keys(obj).map((key) => ({ id: key, ...obj[key] }))
          );
        }
      });
    };

    getContract();
  }, []);

  const tableRef = useRef(null);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <div className="text-end">
            <h1>{t("table.Contract List")}</h1>
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
                filename="Contract table"
                sheet="Contract"
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
            <Box sx={{ mt: 1 }}>
              <DataGrid
                autoHeight
                sx={{ minHeight: 400 }}
                rows={Contract}
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
                  {t("Contract List.Contract no")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Contract List.Buyer")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Contract List.Date")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Contract List.Item")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Contract List.Quantity")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Contract List.Price")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Contract List.Total")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Contract List.Action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(Contract)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? Contract[id]
                    : Contract[id].no.toLowerCase().includes(search);
                })
                .sort((a, b) => (Contract[a].no > Contract[b].no ? 1 : -1))
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>{Contract[id].no}</td>
                      <td style={{ textAlign: "center" }}>
                        {Contract[id].buyer}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {Contract[id].date}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {Contract[id].item}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {Contract[id].quantity}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ${Contract[id].price}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ${Contract[id].total}
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
                                "Are you sure that you wanted to delete that contract?"
                              )
                            ) {
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
          </table>
        </div>
      </div>
    </div>
  );
};

export default Contract;
