import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../firebase";
import { onValue, ref } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import "../../App.css";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

const StockDetail = () => {
  const [search, setSearch] = useState("");
  const [StockDetail, setStockDetail] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = [
    {
      field: "product",
      flex: 0.3,
      headerName: t("Purchase Order List.Purchase Order no"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "date",
      flex: 0.3,
      headerName: t("Purchase Order List.Date"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "supplier",
      flex: 0.3,
      headerName: t("Purchase Order List.Supplier"),
      headerClassName: "custom-container-table-head",
    },
  ]

  useEffect(() => {
    const getStockDetail = () => {
      onValue(ref(db, "StockDetail"), (snapshot) => {
        if (snapshot.val() !== null) {
          const obj = snapshot.val()
          // setStockDetail(() => Object.keys(obj).map((key) => ({})));
          console.log(obj)
        }
      });
    };

    getStockDetail();
  }, []);

  const tableRef = useRef(null);
  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <div className="text-end">
            <h1>{t("table.Stock Detail")}</h1>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="input-wrapper">
                <FaSearch id="search-icon" />
                <input
                  type="text"
                  className="inputField"
                  placeholder="Search Product"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </div>
              <NavLink to="add" className="btn-create">
                {t("Excel.Create")}
              </NavLink>
              <DownloadTableExcel
                filename="Stock Detail table"
                sheet="Stock Detail"
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
                rows={StockDetail}
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
                <th style={{ textAlign: "center" }}>Product</th>
                <th style={{ textAlign: "center" }}>Quantity</th>
                <th style={{ textAlign: "center" }}>WareHouse</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(StockDetail)
                .filter((product) => {
                  return search.toLowerCase() === ""
                    ? product
                    : product.toLowerCase().includes(search);
                })
                .sort((a, b) =>
                  StockDetail[a].quantity > StockDetail[b].quantity ? 1 : -1
                )
                .map((product) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>{product}</td>
                      <td style={{ textAlign: "center" }}>
                        {StockDetail[product].quantity}
                      </td>
                      <td style={{ textAlign: "center" }}>Tuen Mun</td>
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

export default StockDetail;
