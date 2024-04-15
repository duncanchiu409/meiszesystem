import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../firebase";
import { onValue, ref, remove } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import "../../App.css";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

const Product = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const [newPQ, setNewPQ] = useState([]);

  const columns = [
    {
      field: "name",
      headerName: t("Products List.Name"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "sku",
      headerName: t("Products List.Bar Code"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "model",
      flex: 1,
      headerName: t("Products List.Model"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "type",
      headerName: t("Products List.Type"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "acessories",
      headerName: t("Products List.Acessories"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "oi",
      headerName: t("Products List.Other Information"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "module",
      headerName: t("Products List.Module"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "attributes",
      headerName: t("Products List.Attributes"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "process",
      headerName: t("Products List.Process"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "price",
      headerName: t("Products List.Price"),
      type: "number",
      headerClassName: "custom-container-table-head",
    },
  ];

  useEffect(() => {
    const getProducts = () => {
      onValue(ref(db, "products"), (snapshot) => {
        if (snapshot.val() !== null) {
          const obj = snapshot.val();
          setProducts(() =>
            Object.keys(obj).map((key) => ({ id: key, ...obj[key] }))
          );
        }
      });
    };

    getProducts();
  }, []);

  const tableRef = useRef(null);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <div className="text-end">
            <h1>{t("table.Products List")}</h1>
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
              <button to="add" className="btn-create">
                {t("Excel.Import Excel")}
              </button>
              <DownloadTableExcel
                filename="Products table"
                sheet="Products"
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
                rows={products}
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
                  {t("Products List.Name")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Products List.Bar Code")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Products List.Model")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Products List.Type")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Products List.Other Information")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Products List.Acessories")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Products List.Module")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Products List.Attributes")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Products List.Process")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Products List.Price")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("Products List.Action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(products)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? products[id]
                    : products[id].barcode.toLowerCase().includes(search);
                })
                .sort((a, b) => (products[a].code > products[b].code ? 1 : -1))
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {products[id].name}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {products[id].sku}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {products[id].model}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {products[id].type}
                      </td>
                      <td style={{ textAlign: "center" }}>{products[id].oi}</td>
                      <td style={{ textAlign: "center" }}>
                        {products[id].acessories}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {products[id].module}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {products[id].attributes}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {products[id].process}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {products[id].price}
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
                                "Are you sure that you wanted to delete that product?"
                              )
                            ) {
                              remove(ref(db, "products/" + id));
                              remove(ref(db, "ProductionOrder/" + id));
                              window.location.reload(true);
                            }
                          }}
                        >
                          Delete
                        </button>
                        <NavLink to={`view/${id}`} className="btn-view">
                          View
                        </NavLink>
                        <button>Purchase</button>
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

export default Product;
