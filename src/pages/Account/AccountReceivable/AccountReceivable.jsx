import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../../firebase";
import { onValue, ref, remove } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import "../../../App.css";

const AccountReceivable = () => {
  const [search, setSearch] = useState("");
  const [AccountReceivable, setAccountReceivable] = useState([]);

  useEffect(() => {
    const getAccountReceivable = () => {
      onValue(ref(db, "accountreceivable"), (snapshot) => {
        if (snapshot.val() !== null) {
          setAccountReceivable({ ...snapshot.val() });
        }
      });
    };

    getAccountReceivable();
  }, []);

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
              placeholder="Search Date..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>

          <div className="text-end">
            <h1>Account Receivable List</h1>
            <NavLink to="add" className="btn-create">
              Create
            </NavLink>
            <DownloadTableExcel
              filename="Account Receivable table"
              sheet="Account Receivable"
              currentTableRef={tableRef.current}
            >
              <button className="btn-create"> Export Excel </button>
            </DownloadTableExcel>
          </div>
          <table className="styled-table" ref={tableRef}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Date</th>
                <th style={{ textAlign: "center" }}>Description</th>
                <th style={{ textAlign: "center" }}>Amount</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(AccountReceivable)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? AccountReceivable[id]
                    : AccountReceivable[id].date.toLowerCase().includes(search);
                })
                .sort((a, b) =>
                  AccountReceivable[a].date > AccountReceivable[b].date ? 1 : -1
                )
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {AccountReceivable[id].date}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {AccountReceivable[id].description}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {AccountReceivable[id].amount}
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
                                "Are you sure that you wanted to delete that account receivable?"
                              )
                            ) {
                              remove(ref(db, "accountreceivable/" + id));
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
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountReceivable;
