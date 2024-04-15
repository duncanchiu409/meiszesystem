import React, { useState, useEffect, useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../../firebase";
import { onValue, ref } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import { format } from "date-fns";
import "../../../App.css";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const IncomeStatement = () => {
  const [search, setSearch] = useState("");
  const [FS, setFS] = useState([]);

  const [newShowIncome, setNewShowIncome] = useState([]);
  const [newShowExpense, setNewShowExpense] = useState([]);
  const [newShowBalance, setNewShowBalance] = useState([]);
  const [newDate, setNewDate] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const convertMonth = (month) => {
    if (month === "01") {
      return "Jan";
    } else if (month === "02") {
      return "Feb";
    } else if (month === "03") {
      return "Mar";
    } else if (month === "04") {
      return "Apr";
    } else if (month === "05") {
      return "May";
    } else if (month === "06") {
      return "Jun";
    } else if (month === "07") {
      return "Jul";
    } else if (month === "08") {
      return "Aug";
    } else if (month === "09") {
      return "Sep";
    } else if (month === "10") {
      return "Oct";
    } else if (month === "11") {
      return "Nov";
    } else if (month === "12") {
      return "Dec";
    }
  };

  const columns = [
    {
      field: "no",
      flex: 0.3,
      headerName: t("Income Statement.Ref no"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "date",
      flex: 0.3,
      headerName: t("Income Statement.Date"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "account",
      flex: 0.3,
      headerName: t("Income Statement.Account"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "item",
      headerName: t("Income Statement.Item"),
      flex: 1,
      headerClassName: "custom-container-table-head",
    },
    {
      field: "total",
      flex: 0.3,
      headerName: t("Income Statement.Total"),
      headerClassName: "custom-container-table-head",
    },
    // {
    //   field: "actions",
    //   type: "actions",
    //   headerName: t("Table Actions.actions"),
    //   headerClassName: "custom-container-table-head",
    //   getActions: (params) => [
    //     <GridActionsCellItem
    //       icon={<VisibilityIcon />}
    //       onClick={() => {
    //         navigate(`view/${params.id}`);
    //       }}
    //       label={t("Table Actions.view")}
    //       showInMenu
    //     />,
    //     <GridActionsCellItem
    //       icon={<EditIcon />}
    //       onClick={() => {
    //         navigate(`update/${params.id}`);
    //       }}
    //       label={t("Table Actions.edit")}
    //       showInMenu
    //     />,
    //     <GridActionsCellItem
    //       icon={<DeleteIcon />}
    //       onClick={() => {}}
    //       label={t("Table Actions.delete")}
    //       showInMenu
    //     />,
    //   ],
    // },
  ];

  var dateParts = newDate.split("/");

  var year = dateParts[2];

  var month = dateParts[1];

  var monthString = convertMonth(month);

  useEffect(() => {
    setNewDate(format(new Date(), "dd/MM/yyyy"));

    const getFS = () => {
      onValue(ref(db, "FS"), (snapshot) => {
        if (snapshot.val() !== null) {
          const obj = snapshot.val();
          setFS(() =>
            Object.keys(obj).map((key) => ({ id: key, ...obj[key] }))
          );
        }
      });
    };

    getFS();
  }, []);

  const tableRef = useRef(null);

  useEffect(() => {
    var monthString = convertMonth(month);

    onValue(ref(db, `annualincome/${year}/${monthString}/`), (snapshot) => {
      if (snapshot.val() !== null) {
        setNewShowIncome({ ...snapshot.val() });
      } else {
        setNewShowIncome({ name: `${monthString}`, value: 0 });
      }
    });
  }, [year, month]);

  useEffect(() => {
    var monthString = convertMonth(month);

    onValue(ref(db, `annualexpense/${year}/${monthString}/`), (snapshot) => {
      if (snapshot.val() !== null) {
        setNewShowExpense({ ...snapshot.val() });
      } else {
        setNewShowExpense({ name: `${monthString}`, value: 0 });
      }
    });
  }, [year, month]);

  useEffect(() => {
    var monthString = convertMonth(month);

    onValue(ref(db, `annualbalance/${year}/${monthString}/`), (snapshot) => {
      if (snapshot.val() !== null) {
        setNewShowBalance({ ...snapshot.val() });
      } else {
        setNewShowBalance({ name: `${monthString}`, value: 0 });
      }
    });
  }, [year, month]);

  // useEffect(() => {
  //   const getBExpense = () => {
  //     onValue(ref(db, `budgetexpense/`), (snapshot) => {
  //       if (snapshot.val() !== null) {
  //         setNewBExpense({ ...snapshot.val() });
  //       }else{
  //         setNewBExpense({value: 0});
  //       }
  //     });
  //   };

  //   getBExpense();
  // }, []);

  // useEffect(() => {
  //   const getBBalance = () => {
  //     onValue(ref(db, `budgetbalance/`), (snapshot) => {
  //       if (snapshot.val() !== null) {
  //         setNewBBalance({ ...snapshot.val() });
  //       }else{
  //         setNewBBalance({value: 0});
  //       }
  //     });
  //   };

  //   getBBalance();
  // }, []);

  // const bData = [
  //   newBalance.Jan,
  //   newBalance.Feb,
  //   newBalance.Mar,
  //   newBalance.Apr,
  //   newBalance.May,
  //   newBalance.Jun,
  //   newBalance.Jul,
  //   newBalance.Aug,
  //   newBalance.Sep,
  //   newBalance.Oct,
  //   newBalance.Nov,
  //   newBalance.Dec,
  // ];

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <div className="text-end">
            <h1>{t("table.Income Statement")}</h1>
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
                filename="Income Statement table"
                sheet="Income Statement"
                currentTableRef={tableRef.current}
              >
                <button className="btn-create">
                  {" "}
                  {t("Excel.Export Excel")}{" "}
                </button>
              </DownloadTableExcel>
            </div>
          </div>
          {/* <table className="styled-table" ref={tableRef}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>{t('Income Statement.Ref no')}</th>
                <th style={{ textAlign: "center" }}>{t('Income Statement.Date')}</th>
                <th style={{ textAlign: "center" }}>{t('Income Statement.Account')}</th>
                <th style={{ textAlign: "center" }}>{t('Income Statement.Item')}</th>
                <th style={{ textAlign: "center" }}>{t('Income Statement.Total')}</th>

              </tr>
            </thead>
            <tbody>
              {Object.keys(FS)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? FS[id]
                    : FS[id].no.toLowerCase().includes(search);
                })
                .sort((a, b) => (FS[a].no > FS[b].no ? 1 : -1))
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>{FS[id].no}</td>
                      <td style={{ textAlign: "center" }}>{FS[id].date}</td>
                      <td style={{ textAlign: "center" }}>{FS[id].account}</td>
                      <td style={{ textAlign: "center" }}>{FS[id].item}</td>
                      <td style={{ textAlign: "center" }}>${FS[id].total}</td>

                    </tr>
                  );
                })}
            </tbody>
          </table> */}

          <div className="custom-container">
            <Box sx={{ mt: 1, color: "white" }}>
              <DataGrid
                autoHeight
                sx={{ minHeight: 400, color: "var(--sidebar-font-color)" }}
                rows={FS}
                columns={columns}
                initialState={{
                  pagination: { paginationModel: { page: 0, pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10]}
              />
            </Box>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <h5>{`${monthString}`}</h5>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <div>
              <h5>Income</h5>
              <span className="income">${`${newShowIncome.value}`}</span>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div>
              <h5>Expense</h5>
              <span className="expense">${`${newShowExpense.value}`}</span>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div>
              <h5>Balance</h5>
              <span className="balance">${`${newShowBalance.value}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeStatement;
