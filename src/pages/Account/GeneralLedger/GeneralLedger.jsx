import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../../firebase";
import { onValue, ref, remove  } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import "../../../App.css";

const GeneralLedger = () => {
  const [search, setSearch] = useState("");
  const [GeneralLedger, setGeneralLedger] = useState([]);

  useEffect(() => {
    const getGeneralLedger = () => {
      onValue(ref(db, "GeneralLedger"), (snapshot) => {
        if (snapshot.val() !== null) {
          setGeneralLedger({ ...snapshot.val() });
        }
      });
    };

    getGeneralLedger();
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
              placeholder="Search Account..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>

          <div className="text-end">
            <h1>General Ledger List</h1>
            <NavLink to="add" className="btn-create">
              Create
            </NavLink>
            <DownloadTableExcel
              filename="General Ledger table"
              sheet="General Ledger"
              currentTableRef={tableRef.current}
            >
              <button className="btn-create"> Export Excel </button>
            </DownloadTableExcel>
          </div>
          <table className="styled-table" ref={tableRef}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Date</th>
                <th style={{ textAlign: "center" }}>Category Of Account</th>
                <th style={{ textAlign: "center" }}>Description</th>
                <th style={{ textAlign: "center" }}>Amount</th>
                <th style={{ textAlign: "center" }}>Action</th>
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
          </table>
        </div>
      </div>
    </div>
  );
};

export default GeneralLedger;
