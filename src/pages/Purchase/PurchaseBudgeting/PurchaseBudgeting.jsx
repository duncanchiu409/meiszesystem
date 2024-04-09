import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../../firebase";
import { onValue, ref } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import "../../../App.css";
import SingleCard from "../../../components/SingleCard";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

const PurchaseBudgeting = () => {
  const [search, setSearch] = useState("");
  const [PurchasePlanning, setPurchasePlanning] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const getPurchasePlanning = () => {
      onValue(ref(db, "PurchasePlanning"), (snapshot) => {
        if (snapshot.val() !== null) {
          const obj = snapshot.val()
          setPurchasePlanning(() => Object.keys(obj).map((key) => ({id: key, ...obj[key]})));
        }
      });
    };

    getPurchasePlanning();
  }, []);

  const columns = [
    {
      field: "no",
      flex: 0.3,
      headerName: t("Purchase Budgeting List.Purchase Planning no"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "date",
      flex: 0.3,
      headerName: t("Purchase Budgeting List.Date"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "supplier",
      flex: 0.3,
      headerName: t("Purchase Budgeting List.Supplier"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "item",
      flex: 0.3,
      headerName: t("Purchase Budgeting List.Item"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "quantity",
      flex: 0.3,
      headerName: t("Purchase Budgeting List.Quantity"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "total",
      flex: 0.3,
      headerName: t("Purchase Budgeting List.Total Amount"),
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
    {
      field: "actions",
      flex: 0.3,
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

  const tableRef = useRef(null);

  const salesObj = {
    title: `Jan 2024`,
    totalNumber: `620`,
    icon: "ri-money-dollar-circle-line",
  };

  const PurchaseObj = {
    title: "Dec 2023",
    totalNumber: `4000`,
    icon: "ri-briefcase-4-fill",
  };

  const StockObj = {
    title: "Nov 2023",
    totalNumber: `1100`,
    icon: "ri-store-3-line",
  };

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <div className="text-end">
            <h1>{t("table.Purchase Budgeting List")}</h1>
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
                filename="Purchase Budgeting table"
                sheet="Purchase Budgeting"
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
                rows={PurchasePlanning}
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
                <th style={{ textAlign: "center" }}>Purchase Planning no.</th>
                <th style={{ textAlign: "center" }}>Date</th>
                <th style={{ textAlign: "center" }}>Supplier</th>
                <th style={{ textAlign: "center" }}>Item</th>
                <th style={{ textAlign: "center" }}>Quantity</th>
                <th style={{ textAlign: "center" }}>Total Amount</th>
                <th style={{ textAlign: "center" }}>Status</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(PurchasePlanning)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? PurchasePlanning[id]
                    : PurchasePlanning[id].no.toLowerCase().includes(search);
                })
                .sort((a, b) =>
                  PurchasePlanning[a].no > PurchasePlanning[b].no ? 1 : -1
                )
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {PurchasePlanning[id].no}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {PurchasePlanning[id].date}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {PurchasePlanning[id].supplier}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {PurchasePlanning[id].item}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {PurchasePlanning[id].quantity}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ${PurchasePlanning[id].total}
                      </td>
                      {PurchasePlanning[id].status === "Paid" ? (
                        <td style={{ textAlign: "center", color: "green" }}>
                          {PurchasePlanning[id].status}
                        </td>
                      ) : (
                        <td style={{ textAlign: "center" }}>
                          {PurchasePlanning[id].status}
                        </td>
                      )}
                      <td style={{ textAlign: "center" }}>
                        <NavLink to={`update/${id}`} className="btn-edit">
                          Edit
                        </NavLink>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="dashboard" style={{ textAlign: "center" }}>
            <div className="dashboard_wrapper" style={{ textAlign: "center" }}>
              <div className="dashboard_cards" style={{ textAlign: "center" }}>
                <SingleCard item={salesObj} />

                <SingleCard item={PurchaseObj} />
                <SingleCard item={StockObj} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseBudgeting;
