import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../../firebase";
import { onValue, ref, remove, set } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import "../../../App.css";
import format from "date-fns/format";
import SingleCard from '../../../components/SingleCard';
import { useTranslation } from "react-i18next";

const PurchasePlanning = () => {
  const [search, setSearch] = useState("");
  const [PurchasePlanning, setPurchasePlanning] = useState([]);
  const [newDate, setNewDate] = useState("");
  const [newAIncome, setNewAIncome] = useState([]);
  const [newBalance, setNewBalance] = useState([]);
  const { t } = useTranslation()
  // const [newASale, setNewASale] = useState([]);
  // const [newPASale, setNewPASale] = useState([]);

  useEffect(() => {
    setNewDate(format(new Date(), "dd/MM/yyyy"));

    const getPurchasePlanning = () => {
      onValue(ref(db, "PurchasePlanning"), (snapshot) => {
        if (snapshot.val() !== null) {
          setPurchasePlanning({ ...snapshot.val() });
        }
      });
    };

    getPurchasePlanning();
  }, []);

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

  var dateParts = newDate.split("/");

  var year = dateParts[2];

  var month = dateParts[1];

  var monthString = convertMonth(month);

  useEffect(() => {
    const getAIncome = () => {
      onValue(ref(db, `annualexpense/`), (snapshot) => {
        if (snapshot.val() !== null) {
          setNewAIncome({ ...snapshot.val() });
        }
      });
    };

    getAIncome();
  }, [year, monthString]);

  useEffect(() => {
    const getBalance = () => {
      onValue(ref(db, `annualbalance/`), (snapshot) => {
        if (snapshot.val() !== null) {
          setNewBalance({ ...snapshot.val() });
        }
      });
    };

    getBalance();
  }, [year, monthString]);

  // useEffect(() => {
  //   const getASale = () => {
  //     onValue(ref(db, `annualsale/${year}/${monthString}`), (snapshot) => {
  //       if (snapshot.val() !== null) {
  //         setNewASale({ ...snapshot.val() });
  //       }
  //     });
  //   };

  //   getASale();
  // }, [year, monthString]);

  const tableRef = useRef(null);

  const salesObj = {
    title: `Jan 2024`,
    totalNumber: `600`,
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
      <div
        className="App"
        style={{ width: "100%", padding: "100px", height: "1000px" }}
      >
        <div style={{ padding: "0px 215px" }} className="container">
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

          <div className="text-end">
            <h1>{t('table.Purchase Planning List')}</h1>
            <NavLink to="add" className="btn-create">
              {t('Excel.Create')}
            </NavLink>
            <DownloadTableExcel
              filename="Purchase Planning table"
              sheet="Purchase Planning"
              currentTableRef={tableRef.current}
            >
              <button className="btn-create"> {t('Excel.Export Excel')} </button>
            </DownloadTableExcel>

          </div>
          <table className="styled-table" ref={tableRef}>
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
                        <button
                          className="btn-delete"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure that you wanted to delete that payment request?"
                              )
                            ) {
                              if (PurchasePlanning[id].status === "Paid") {
                                Object.keys(newAIncome).map((m) => {
                                  var dateParts =
                                    PurchasePlanning[id].date.split("/");

                                  var year = dateParts[2];
                                  var month = dateParts[1];

                                  var monthString = convertMonth(month);

                                  if (month === "01") {
                                    set(
                                      ref(
                                        db,
                                        `annualexpense/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newAIncome[year].Jan.value) -
                                          parseInt(PurchasePlanning[id].total),
                                      }
                                    );
                                  } else if (month === "02") {
                                    set(
                                      ref(
                                        db,
                                        `annualexpense/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newAIncome[year].Feb.value) -
                                          parseInt(PurchasePlanning[id].total),
                                      }
                                    );
                                  } else if (month === "03") {
                                    set(
                                      ref(
                                        db,
                                        `annualexpense/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newAIncome[year].Mar.value) -
                                          parseInt(PurchasePlanning[id].total),
                                      }
                                    );
                                  } else if (month === "04") {
                                    set(
                                      ref(
                                        db,
                                        `annualexpense/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newAIncome[year].Apr.value) -
                                          parseInt(PurchasePlanning[id].total),
                                      }
                                    );
                                  } else if (month === "05") {
                                    set(
                                      ref(
                                        db,
                                        `annualexpense/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newAIncome[year].May.value) -
                                          parseInt(PurchasePlanning[id].total),
                                      }
                                    );
                                  } else if (month === "06") {
                                    set(
                                      ref(
                                        db,
                                        `annualexpense/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newAIncome[year].Jun.value) -
                                          parseInt(PurchasePlanning[id].total),
                                      }
                                    );
                                  } else if (month === "07") {
                                    set(
                                      ref(
                                        db,
                                        `annualexpense/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newAIncome[year].Jul.value) -
                                          parseInt(PurchasePlanning[id].total),
                                      }
                                    );
                                  } else if (month === "08") {
                                    set(
                                      ref(
                                        db,
                                        `annualexpense/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newAIncome[year].Aug.value) -
                                          parseInt(PurchasePlanning[id].total),
                                      }
                                    );
                                  } else if (month === "09") {
                                    set(
                                      ref(
                                        db,
                                        `annualexpense/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newAIncome[year].Sep.value) -
                                          parseInt(PurchasePlanning[id].total),
                                      }
                                    );
                                  } else if (month === "10") {
                                    set(
                                      ref(
                                        db,
                                        `annualexpense/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newAIncome[year].Oct.value) -
                                          parseInt(PurchasePlanning[id].total),
                                      }
                                    );
                                  } else if (month === "11") {
                                    set(
                                      ref(
                                        db,
                                        `annualexpense/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newAIncome[year].Nov.value) -
                                          parseInt(PurchasePlanning[id].total),
                                      }
                                    );
                                  } else if (month === "12") {
                                    set(
                                      ref(
                                        db,
                                        `annualexpense/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newAIncome[year].Dec.value) -
                                          parseInt(PurchasePlanning[id].total),
                                      }
                                    );
                                  }
                                  return null;
                                });
                                Object.keys(newBalance).map((m) => {
                                  var dateParts =
                                    PurchasePlanning[id].date.split("/");

                                  var year = dateParts[2];
                                  var month = dateParts[1];

                                  var monthString = convertMonth(month);

                                  if (month === "01") {
                                    set(
                                      ref(
                                        db,
                                        `annualbalance/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newBalance[year].Jan.value) +
                                          parseInt(PurchasePlanning[id].total),
                                      }
                                    );
                                  } else if (month === "02") {
                                    set(
                                      ref(
                                        db,
                                        `annualbalance/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newBalance[year].Feb.value) +
                                          parseInt(PurchasePlanning[id].total),
                                      }
                                    );
                                  } else if (month === "03") {
                                    set(
                                      ref(
                                        db,
                                        `annualbalance/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newBalance[year].Mar.value) +
                                          parseInt(PurchasePlanning[id].total),
                                      }
                                    );
                                  } else if (month === "04") {
                                    set(
                                      ref(
                                        db,
                                        `annualbalance/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newBalance[year].Apr.value) +
                                          parseInt(PurchasePlanning[id].total),
                                      }
                                    );
                                  } else if (month === "05") {
                                    set(
                                      ref(
                                        db,
                                        `annualbalance/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newBalance[year].May.value) +
                                          parseInt(PurchasePlanning[id].total),
                                      }
                                    );
                                  } else if (month === "06") {
                                    set(
                                      ref(
                                        db,
                                        `annualbalance/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newBalance[year].Jun.value) +
                                          parseInt(PurchasePlanning[id].total),
                                      }
                                    );
                                  } else if (month === "07") {
                                    set(
                                      ref(
                                        db,
                                        `annualbalance/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newBalance[year].Jul.value) +
                                          parseInt(PurchasePlanning[id].total),
                                      }
                                    );
                                  } else if (month === "08") {
                                    set(
                                      ref(
                                        db,
                                        `annualbalance/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newBalance[year].Aug.value) +
                                          parseInt(PurchasePlanning[id].total),
                                      }
                                    );
                                  } else if (month === "09") {
                                    set(
                                      ref(
                                        db,
                                        `annualbalance/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newBalance[year].Sep.value) +
                                          parseInt(PurchasePlanning[id].total),
                                      }
                                    );
                                  } else if (month === "10") {
                                    set(
                                      ref(
                                        db,
                                        `annualbalance/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newBalance[year].Oct.value) +
                                          parseInt(PurchasePlanning[id].total),
                                      }
                                    );
                                  } else if (month === "11") {
                                    set(
                                      ref(
                                        db,
                                        `annualbalance/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newBalance[year].Nov.value) +
                                          parseInt(PurchasePlanning[id].total),
                                      }
                                    );
                                  } else if (month === "12") {
                                    set(
                                      ref(
                                        db,
                                        `annualbalance/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newBalance[year].Dec.value) +
                                          parseInt(PurchasePlanning[id].total),
                                      }
                                    );
                                  }
                                  return null;
                                });
                                remove(ref(db, "PurchasePlanning/" + id));
                                remove(ref(db, "PurchaseBudgeting/" + id));
                                remove(ref(db, "PurchaseOrder/" + id));
                                remove(ref(db, "inventory/" + id));
                                remove(ref(db, "FS/" + id));

                                window.location.reload(true);
                              } else {
                                remove(ref(db, "PurchasePlanning/" + id));
                                remove(ref(db, "PurchaseBudgeting/" + id));
                                window.location.reload(true);
                              }
                            }
                          }}
                        >
                          Delete
                        </button>
                        
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
}

export default PurchasePlanning
