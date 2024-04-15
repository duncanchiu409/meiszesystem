import React, { useState, useEffect, useRef } from "react";
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

const PurchaseOrder = () => {
  const [search, setSearch] = useState("");
  const [PurchaseOrder, setPurchaseOrder] = useState([]);
  const { t } = useTranslation();

  const columns = [
    {
      field: "no",
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
    {
      field: "item",
      flex: 0.3,
      headerName: t("Purchase Order List.Item"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "quantity",
      flex: 0.3,
      headerName: t("Purchase Order List.Quantity"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "total",
      flex: 0.3,
      headerName: t("Purchase Order List.Total Amount"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "status",
      flex: 0.3,
      headerName: t("Purchase Planning List.Status"),
      headerClassName: "custom-container-table-head",
      renderCell: (params) => {
        return <div style={ params.value === 'Paid' ? { color: 'green' } : { color: 'red' }}>{ params.value }</div>
      }
    },
  ]

  useEffect(() => {
    const getPurchaseOrder = () => {
      onValue(ref(db, "PurchaseOrder"), (snapshot) => {
        if (snapshot.val() !== null) {
          const obj = snapshot.val();
          setPurchaseOrder(() =>
            Object.keys(obj).map((key) => ({ id: key, ...obj[key] }))
          );
        }
      });
    };

    getPurchaseOrder();
  }, []);

  const tableRef = useRef(null);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <div className="text-end">
            <h1>{t("table.Purchase Order List")}</h1>
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
              <DownloadTableExcel
                filename="Purchase Order table"
                sheet="Purchase Order"
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
                rows={PurchaseOrder}
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
                <th style={{ textAlign: "center" }}>Purchase Order no.</th>
                <th style={{ textAlign: "center" }}>Date</th>
                <th style={{ textAlign: "center" }}>Supplier</th>
                <th style={{ textAlign: "center" }}>Item</th>
                <th style={{ textAlign: "center" }}>Quantity</th>
                <th style={{ textAlign: "center" }}>Total Amount</th>
                <th style={{ textAlign: "center" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(PurchaseOrder)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? PurchaseOrder[id]
                    : PurchaseOrder[id].no.toLowerCase().includes(search);
                })
                .sort((a, b) =>
                  PurchaseOrder[a].no > PurchaseOrder[b].no ? 1 : -1
                )
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {PurchaseOrder[id].no}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {PurchaseOrder[id].date}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {PurchaseOrder[id].supplier}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {PurchaseOrder[id].item}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {PurchaseOrder[id].quantity}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ${PurchaseOrder[id].total}
                      </td>
                      {PurchaseOrder[id].status === "Paid" ? (
                        <td style={{ textAlign: "center", color: "green" }}>
                          {PurchaseOrder[id].status}
                        </td>
                      ) : (
                        <td style={{ textAlign: "center" }}>
                          {PurchaseOrder[id].status}
                        </td>
                      )}
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

export default PurchaseOrder;
