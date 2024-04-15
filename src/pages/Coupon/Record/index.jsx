import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

function Record() {
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  const history = [
    {
      id: 1,
      product: "card a",
      pts: 200,
      date: new Date(),
    },
    {
      id: 2,
      product: "card a",
      pts: 200,
      date: new Date(),
    },
    {
      id: 3,
      product: "card a",
      pts: 200,
      date: new Date(),
    },
  ];

  const columns = [
    {
      field: "product",
      headerName: "Product",
      flex: 0.5,
      headerClassName: "custom-container-table-head",
    },
    {
      field: "pts",
      headerName: "Points",
      flex: 0.3,
      headerClassName: "custom-container-table-head",
    },
    {
      field: "date",
      type: "Date",
      flex: 0.3,
      headerName: "Transaction Time",
      headerClassName: "custom-container-table-head",
    },
  ];

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <div className="text-end">
            <h1>{t("table.Customers List")}</h1>
            {/* <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="input-wrapper">
                <FaSearch id="search-icon" />
                <input
                  type="text"
                  className="inputField"
                  placeholder="Search Customer"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </div>
            </div> */}

            {/* div wtih .custom-container to override the bootstrap css */}
            <div className="custom-container">
              <Box sx={{ mt: 1, color: "white" }}>
                <DataGrid
                  autoHeight
                  sx={{ minHeight: 400, color: "var(--sidebar-font-color)" }}
                  rows={history}
                  columns={columns}
                  initialState={{
                    pagination: { paginationModel: { page: 0, pageSize: 5 } },
                  }}
                  pageSizeOptions={[5, 10]}
                  slots={{toolbar: GridToolbar}}
                />
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Record;
