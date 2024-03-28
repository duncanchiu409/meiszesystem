import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db, storage } from "../../../firebase";
import { onValue, ref, remove, set } from "firebase/database";
import { getDownloadURL, ref as sRef } from "firebase/storage";
import { FaSearch } from "react-icons/fa";
import "../../../App.css";
import format from "date-fns/format";

const PaymentRequest = () => {
  const [search, setSearch] = useState("");
  const [PaymentRequest, setPaymentRequest] = useState([]);
  const [newDate, setNewDate] = useState("");
  const [newAIncome, setNewAIncome] = useState([]);
  const [newBalance, setNewBalance] = useState([]);
  const [newASale, setNewASale] = useState([]);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    setNewDate(format(new Date(), "dd/MM/yyyy"));

    const getPaymentRequest = () => {
      onValue(ref(db, "paymentRequest"), (snapshot) => {
        if (snapshot.val() !== null) {
          setPaymentRequest({ ...snapshot.val() });
        }
      });
    };

    getPaymentRequest();
  }, []);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    getDownloadURL(sRef(storage, "meisze-paymentrequest-template-pdf.pdf")).then(
      (url) => {
        setResume(url);
      }
    );
  });

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
      onValue(ref(db, `annualincome/`), (snapshot) => {
        if (snapshot.val() !== null) {
          setNewAIncome({ ...snapshot.val() });
        }
      });
    };

    

    getAIncome();
  }, [year, monthString]);

  useEffect(() => {
    const getASale = () => {
      onValue(ref(db, `annualsale/`), (snapshot) => {
        if (snapshot.val() !== null) {
          setNewASale({ ...snapshot.val() });
        }
      });
    };

    

    getASale();
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

  const tableRef = useRef(null);

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
            <h1>Payment Request List</h1>
            <NavLink to="add" className="btn-create">
              Create
            </NavLink>
            <DownloadTableExcel
              filename="PaymentRequest table"
              sheet="PaymentRequest"
              currentTableRef={tableRef.current}
            >
              <button className="btn-create"> Export Excel </button>
            </DownloadTableExcel>
            <button className="btn-create" onClick={() => openInNewTab(resume)}>
              Export PDF
            </button>
          </div>
          <table className="styled-table" ref={tableRef}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Payment Request no.</th>
                <th style={{ textAlign: "center" }}>Date</th>
                <th style={{ textAlign: "center" }}>Payment Request to</th>
                <th style={{ textAlign: "center" }}>Item</th>
                <th style={{ textAlign: "center" }}>Quantity</th>
                <th style={{ textAlign: "center" }}>Total Amount</th>
                <th style={{ textAlign: "center" }}>Status</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(PaymentRequest)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? PaymentRequest[id]
                    : PaymentRequest[id].no.toLowerCase().includes(search);
                })
                .sort((a, b) =>
                  PaymentRequest[a].no > PaymentRequest[b].no ? 1 : -1
                )
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {PaymentRequest[id].no}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {PaymentRequest[id].date}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {PaymentRequest[id].prt}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {PaymentRequest[id].item}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {PaymentRequest[id].quantity}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ${PaymentRequest[id].total}
                      </td>
                      {PaymentRequest[id].status === "Paid" ? (
                        <td style={{ textAlign: "center", color: "green" }}>
                          {PaymentRequest[id].status}
                        </td>
                      ) : (
                        <td style={{ textAlign: "center" }}>
                          {PaymentRequest[id].status}
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
                              if (PaymentRequest[id].status === "Paid") {
                                Object.keys(newAIncome).map((m) => {
                                  var dateParts =
                                    PaymentRequest[id].date.split("/");

                                  var year = dateParts[2];
                                  var month = dateParts[1];

                                  var monthString = convertMonth(month);

                                  if (month === "01") {
                                    set(
                                      ref(
                                        db,
                                        `annualincome/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newAIncome[year].Jan.value) -
                                          parseInt(PaymentRequest[id].total),
                                      }
                                    );
                                  } else if (month === "02") {
                                    set(
                                      ref(
                                        db,
                                        `annualincome/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newAIncome[year].Feb.value) -
                                          parseInt(PaymentRequest[id].total),
                                      }
                                    );
                                  } else if (month === "03") {
                                    set(
                                      ref(
                                        db,
                                        `annualincome/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newAIncome[year].Mar.value) -
                                          parseInt(PaymentRequest[id].total),
                                      }
                                    );
                                  } else if (month === "04") {
                                    set(
                                      ref(
                                        db,
                                        `annualincome/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newAIncome[year].Apr.value) -
                                          parseInt(PaymentRequest[id].total),
                                      }
                                    );
                                  } else if (month === "05") {
                                    set(
                                      ref(
                                        db,
                                        `annualincome/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newAIncome[year].May.value) -
                                          parseInt(PaymentRequest[id].total),
                                      }
                                    );
                                  } else if (month === "06") {
                                    set(
                                      ref(
                                        db,
                                        `annualincome/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newAIncome[year].Jun.value) -
                                          parseInt(PaymentRequest[id].total),
                                      }
                                    );
                                  } else if (month === "07") {
                                    set(
                                      ref(
                                        db,
                                        `annualincome/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newAIncome[year].Jul.value) -
                                          parseInt(PaymentRequest[id].total),
                                      }
                                    );
                                  } else if (month === "08") {
                                    set(
                                      ref(
                                        db,
                                        `annualincome/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newAIncome[year].Aug.value) -
                                          parseInt(PaymentRequest[id].total),
                                      }
                                    );
                                  } else if (month === "09") {
                                    set(
                                      ref(
                                        db,
                                        `annualincome/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newAIncome[year].Sep.value) -
                                          parseInt(PaymentRequest[id].total),
                                      }
                                    );
                                  } else if (month === "10") {
                                    set(
                                      ref(
                                        db,
                                        `annualincome/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newAIncome[year].Oct.value) -
                                          parseInt(PaymentRequest[id].total),
                                      }
                                    );
                                  } else if (month === "11") {
                                    set(
                                      ref(
                                        db,
                                        `annualincome/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newAIncome[year].Nov.value) -
                                          parseInt(PaymentRequest[id].total),
                                      }
                                    );
                                  } else if (month === "12") {
                                    set(
                                      ref(
                                        db,
                                        `annualincome/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newAIncome[year].Dec.value) -
                                          parseInt(PaymentRequest[id].total),
                                      }
                                    );
                                  }
                                  return null;
                                });
                                Object.keys(newBalance).map((m) => {
                                  var dateParts =
                                    PaymentRequest[id].date.split("/");

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
                                          parseInt(newBalance[year].Jan.value) -
                                          parseInt(PaymentRequest[id].total),
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
                                          parseInt(newBalance[year].Feb.value) -
                                          parseInt(PaymentRequest[id].total),
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
                                          parseInt(newBalance[year].Mar.value) -
                                          parseInt(PaymentRequest[id].total),
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
                                          parseInt(newBalance[year].Apr.value) -
                                          parseInt(PaymentRequest[id].total),
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
                                          parseInt(newBalance[year].May.value) -
                                          parseInt(PaymentRequest[id].total),
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
                                          parseInt(newBalance[year].Jun.value) -
                                          parseInt(PaymentRequest[id].total),
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
                                          parseInt(newBalance[year].Jul.value) -
                                          parseInt(PaymentRequest[id].total),
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
                                          parseInt(newBalance[year].Aug.value) -
                                          parseInt(PaymentRequest[id].total),
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
                                          parseInt(newBalance[year].Sep.value) -
                                          parseInt(PaymentRequest[id].total),
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
                                          parseInt(newBalance[year].Oct.value) -
                                          parseInt(PaymentRequest[id].total),
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
                                          parseInt(newBalance[year].Nov.value) -
                                          parseInt(PaymentRequest[id].total),
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
                                          parseInt(newBalance[year].Dec.value) -
                                          parseInt(PaymentRequest[id].total),
                                      }
                                    );
                                  }
                                  return null;
                                });
                                Object.keys(newASale).map((m) => {
                                  var dateParts =
                                    PaymentRequest[id].date.split("/");

                                  var year = dateParts[2];
                                  var month = dateParts[1];

                                  var monthString = convertMonth(month);

                                  if (month === "01") {
                                    set(
                                      ref(
                                        db,
                                        `annualsale/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newASale[year].Jan.value) -
                                          parseInt(PaymentRequest[id].quantity),
                                      }
                                    );
                                  } else if (month === "02") {
                                    set(
                                      ref(
                                        db,
                                        `annualsale/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newASale[year].Feb.value) -
                                          parseInt(PaymentRequest[id].quantity),
                                      }
                                    );
                                  } else if (month === "03") {
                                    set(
                                      ref(
                                        db,
                                        `annualsale/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newASale[year].Mar.value) -
                                          parseInt(PaymentRequest[id].quantity),
                                      }
                                    );
                                  } else if (month === "04") {
                                    set(
                                      ref(
                                        db,
                                        `annualsale/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newASale[year].Apr.value) -
                                          parseInt(PaymentRequest[id].quantity),
                                      }
                                    );
                                  } else if (month === "05") {
                                    set(
                                      ref(
                                        db,
                                        `annualsale/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newASale[year].May.value) -
                                          parseInt(PaymentRequest[id].quantity),
                                      }
                                    );
                                  } else if (month === "06") {
                                    set(
                                      ref(
                                        db,
                                        `annualsale/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newASale[year].Jun.value) -
                                          parseInt(PaymentRequest[id].quantity),
                                      }
                                    );
                                  } else if (month === "07") {
                                    set(
                                      ref(
                                        db,
                                        `annualsale/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newASale[year].Jul.value) -
                                          parseInt(PaymentRequest[id].quantity),
                                      }
                                    );
                                  } else if (month === "08") {
                                    set(
                                      ref(
                                        db,
                                        `annualsale/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newASale[year].Aug.value) -
                                          parseInt(PaymentRequest[id].quantity),
                                      }
                                    );
                                  } else if (month === "09") {
                                    set(
                                      ref(
                                        db,
                                        `annualsale/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newASale[year].Sep.value) -
                                          parseInt(PaymentRequest[id].quantity),
                                      }
                                    );
                                  } else if (month === "10") {
                                    set(
                                      ref(
                                        db,
                                        `annualsale/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newASale[year].Oct.value) -
                                          parseInt(PaymentRequest[id].quantity),
                                      }
                                    );
                                  } else if (month === "11") {
                                    set(
                                      ref(
                                        db,
                                        `annualsale/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newASale[year].Nov.value) -
                                          parseInt(PaymentRequest[id].quantity),
                                      }
                                    );
                                  } else if (month === "12") {
                                    set(
                                      ref(
                                        db,
                                        `annualsale/${year}/${monthString}/`
                                      ),
                                      {
                                        name: `${monthString}`,
                                        value:
                                          parseInt(newASale[year].Dec.value) -
                                          parseInt(PaymentRequest[id].quantity),
                                      }
                                    );
                                  }
                                  return null;
                                });
                                remove(ref(db, "paymentRequest/" + id));
                                remove(ref(db, "AdvanceInvoice/" + id));
                                remove(ref(db, "inventory/" + id));
                                remove(ref(db, "FS/" + id));

                                window.location.reload(true);
                              } else {
                                remove(ref(db, "paymentRequest/" + id));
                                remove(ref(db, "AdvanceInvoice/" + id));
                                window.location.reload(true);
                              }
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

export default PaymentRequest;
