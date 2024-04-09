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

const Inventory = () => {
  const [search, setSearch] = useState("");
  const [inventory, setInventory] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate()

  const columns = [
    {
      field: "status",
      headerName: t("Inventory List.Status"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "refno",
      headerName: t("Inventory List.Ref no"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "date",
      headerName: t("Inventory List.Date"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "product",
      headerName: t("Inventory List.Product"),
      flex: 1,
      headerClassName: "custom-container-table-head",
    },
    {
      field: "quantity",
      headerName: t("Inventory List.Quantity"),
      type: "number",
      headerClassName: "custom-container-table-head",
    },
    {
      field: "cost",
      headerName: t("Inventory List.Total Cost"),
      type: "number",
      headerClassName: "custom-container-table-head",
    },
    {
      field: "remark",
      headerName: t("Inventory List.Remark"),
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
    const getInventory = () => {
      onValue(ref(db, "inventory"), (snapshot) => {
        if (snapshot.val() !== null) {
          const obj = snapshot.val()
          setInventory(() => Object.keys(obj).map((key) => ({ id: key, ...obj[key] })));
        }
      });
    };

    getInventory();
  }, []);

  const tableRef = useRef(null);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <div className="text-end">
            <h1>{t("table.Inventory List")}</h1>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="input-wrapper">
                <FaSearch id="search-icon" />
                <input
                  type="text"
                  className="inputField"
                  placeholder="Search Order No."
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </div>
              <NavLink to="add" className="btn-create">
                {t("Excel.Create")}
              </NavLink>
              <DownloadTableExcel
                filename="Inventory table"
                sheet="Inventory"
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
                rows={inventory}
                columns={columns}
                initialState={{
                  pagination: { paginationModel: { page: 0, pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10]}
              />
            </Box>
          </div>

          <table className="styled-table" ref={tableRef}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Status</th>
                <th style={{ textAlign: "center" }}>Ref No</th>
                <th style={{ textAlign: "center" }}>Date</th>
                <th style={{ textAlign: "center" }}>Product</th>
                <th style={{ textAlign: "center" }}>Quantity</th>
                <th style={{ textAlign: "center" }}>Total Cost</th>
                <th style={{ textAlign: "center" }}>Remark</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(inventory)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? inventory[id]
                    : inventory[id].refno.toLowerCase().includes(search);
                })
                .sort((a, b) =>
                  inventory[a].status > inventory[b].status ? 1 : -1
                )
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {inventory[id].status}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {inventory[id].refno}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {inventory[id].date}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {inventory[id].product}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {inventory[id].quantity}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {inventory[id].cost}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {inventory[id].remark}
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
                                "Are you sure that you wanted to delete that inventory?"
                              )
                            ) {
                              remove(ref(db, "inventory/" + id));
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

export default Inventory;
