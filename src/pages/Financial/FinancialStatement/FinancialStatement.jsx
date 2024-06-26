import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../../firebase";
import { onValue, ref, remove } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import { format } from "date-fns";
import "../../../App.css";
import { BarChart, Bar, Rectangle, XAxis, YAxis } from "recharts";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

const FinancialStatement = () => {
  const [search, setSearch] = useState("");
  const [FS, setFS] = useState([]);
  const [newBudget, setNewBudget] = useState([]);
  const [newBalance, setNewBalance] = useState([]);
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
      headerName: t("Financial Statement.Ref no"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "date",
      headerName: t("Financial Statement.Date"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "account",
      headerName: t("Financial Statement.Amount"),
      headerClassName: "custom-container-table-head",
    },
    {
      field: "item",
      headerName: t("Financial Statement.Item"),
      flex: 1,
      headerClassName: "custom-container-table-head",
    },
    {
      field: "total",
      headerName: t("Financial Statement.Total"),
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
    const getBalance = () => {
      onValue(ref(db, `annualbalance/${year}/`), (snapshot) => {
        if (snapshot.val() !== null) {
          setNewBalance({ ...snapshot.val() });
        }
      });
    };

    getBalance();
  }, [year]);

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

  useEffect(() => {
    const getBudget = () => {
      onValue(ref(db, `budget/`), (snapshot) => {
        if (snapshot.val() !== null) {
          setNewBudget({ ...snapshot.val() });
        } else {
          setNewBudget({ income: 0, expense: 0, balance: 0 });
        }
      });
    };

    getBudget();
  }, []);

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

  const bData = [
    newBalance.Jan,
    newBalance.Feb,
    newBalance.Mar,
    newBalance.Apr,
    newBalance.May,
    newBalance.Jun,
    newBalance.Jul,
    newBalance.Aug,
    newBalance.Sep,
    newBalance.Oct,
    newBalance.Nov,
    newBalance.Dec,
  ];

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <div className="text-end">
            <h1>{t("table.Financial Statement")}</h1>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                filename="Financial Statement table"
                sheet="Financial Statement"
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
                <th style={{ textAlign: "center" }}>{t("Financial Statement.Ref no")}</th>
                <th style={{ textAlign: "center" }}>{t("Financial Statement.Date")}</th>
                <th style={{ textAlign: "center" }}>{t("Financial Statement.Amount")}</th>
                <th style={{ textAlign: "center" }}>{t("Financial Statement.Item")}</th>
                <th style={{ textAlign: "center" }}>{t("Financial Statement.Total")}</th>
                <th style={{ textAlign: "center" }}>{t("Financial Statement.Action")}</th>
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
                      <td style={{ textAlign: "center" }}>
                        <NavLink to={`update/${id}`} className="btn-edit">
                          Edit
                        </NavLink>
                        <button
                          className="btn-delete"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure that you wanted to delete that Financial Statement?"
                              )
                            ) {
                              remove(ref(db, "FS/" + id));
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
            <h5>Annual Balance Chart</h5>
          </div>
          <div className="stats">
            <BarChart
              width={550}
              height={300}
              data={bData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />

              <Bar
                dataKey="value"
                fill="#7734a9d9"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            </BarChart>
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
              <h5>Total Balance</h5>
              <span className="balance">${`${newShowBalance.value}`}</span>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div>
              <h5>Income</h5>
              <span className="income">${`${newShowIncome.value}`}</span>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div>
              <h5>Expense</h5>
              <span className="expense">${`${newShowExpense.value}`}</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <h5>Budget</h5>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <div>
              <h5>Total Balance</h5>
              <span className="balance">${`${newBudget.balance}`}</span>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div>
              <h5>Income</h5>
              <span className="income">${`${newBudget.income}`}</span>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div>
              <h5>Expense</h5>
              <span className="expense">${`${newBudget.expense}`}</span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <NavLink to={`buget`} className="btn-edit">
              Edit Budget
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialStatement;
