import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../../firebase";
import { onValue, ref, remove } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import "../../../App.css";
import { useTranslation } from "react-i18next";

const AccountPayable = () => {
  const [search, setSearch] = useState("");
  const [AccountPayable, setAccountPayable] = useState([]);
  const { t } = useTranslation()

  useEffect(() => {
    const getAccountPayable = () => {
      onValue(ref(db, "accountpayable"), (snapshot) => {
        if (snapshot.val() !== null) {
          setAccountPayable({ ...snapshot.val() });
        }
      });
    };

    getAccountPayable();
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
            <h1>{t('table.Account Payable List')}</h1>
            <NavLink to="add" className="btn-create">
              {t('Excel.Create')}
            </NavLink>
            <DownloadTableExcel
              filename="Account Payable table"
              sheet="Account Payable"
              currentTableRef={tableRef.current}
            >
              <button className="btn-create"> {t('Excel.Export Excel')} </button>
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
              {Object.keys(AccountPayable)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? AccountPayable[id]
                    : AccountPayable[id].date.toLowerCase().includes(search);
                })
                .sort((a, b) =>
                  AccountPayable[a].date > AccountPayable[b].date ? 1 : -1
                )
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {AccountPayable[id].date}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {AccountPayable[id].description}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {AccountPayable[id].amount}
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
                                "Are you sure that you wanted to delete that account payable?"
                              )
                            ) {
                              remove(ref(db, "accountpayable/" + id));
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

export default AccountPayable;
