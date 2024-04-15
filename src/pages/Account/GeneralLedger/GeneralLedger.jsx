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

const GeneralLedger = () => {
  const [search, setSearch] = useState("");
  const [GeneralLedger, setGeneralLedger] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = [
    {
      field: "date",
      headerName: t("General Ledger List.Date"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "coa",
      flex: 0.4,
      headerName: t("General Ledger List.Category Of Account"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "description",
      headerName: t("General Ledger List.Description"),
      flex: 1,
      headerClassName: "custom-container-table-head",
    },
    {
      field: "amount",
      headerName: t("General Ledger List.Amount"),
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
    const getGeneralLedger = () => {
      onValue(ref(db, "GeneralLedger"), (snapshot) => {
        if (snapshot.val() !== null) {
          const obj = snapshot.val();
          setGeneralLedger(() =>
            Object.keys(obj).map((key) => ({ id: key, ...obj[key] }))
          );
        }
      });
    };

    getGeneralLedger();
  }, []);

  const tableRef = useRef(null);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <div className="text-end">
            <h1>{t("table.General Ledger List")}</h1>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="input-wrapper">
                <FaSearch id="search-icon" />
                <input
                  type="text"
                  className="inputField"
                  placeholder="Search Account..."
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </div>
              <NavLink to="add" className="btn-create">
                {t("Excel.Create")}
              </NavLink>
              <DownloadTableExcel
                filename="General Ledger table"
                sheet="General Ledger"
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
                rows={GeneralLedger}
                columns={columns}
                initialState={{
                  pagination: { paginationModel: { page: 0, pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10]}
              />
            </Box>
          </div>

          {/* <table ={tableRef}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>
                  {t("General Ledger List.Date")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("General Ledger List.Category Of Account")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("General Ledger List.Description")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("General Ledger List.Amount")}
                </th>
                <th style={{ textAlign: "center" }}>
                  {t("General Ledger List.Action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(GeneralLedger)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? GeneralLedger[id]
                    : GeneralLedger[id].coa.toLowerCase().includes(search);
                })
                .sort((a, b) =>
                  GeneralLedger[a].date > GeneralLedger[b].date ? 1 : -1
                )
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {GeneralLedger[id].date}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {GeneralLedger[id].coa}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {GeneralLedger[id].description}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {GeneralLedger[id].amount}
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
                                "Are you sure that you wanted to delete that General Ledger Item?"
                              )
                            ) {
                              remove(ref(db, "GeneralLedger/" + id));
                              remove(ref(db, "BalanceSheet/" + id));
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

export default GeneralLedger;
