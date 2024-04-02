import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../../firebase";
import { onValue, ref, remove } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import "../../../App.css";
import { useTranslation } from "react-i18next";

const SR = () => {
  const [search, setSearch] = useState("");
  const [staff, setStaff] = useState([]);
  const { t } = useTranslation()

  useEffect(() => {
    const getStaff = () => {
      onValue(ref(db, "salaryreport"), (snapshot) => {
        if (snapshot.val() !== null) {
          setStaff({ ...snapshot.val() });
        }
      });
    };

    getStaff();
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
              placeholder="Search Staff"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>

          <div className="text-end">
            <h1>{t('table.Salary And MPF Report')}</h1>
            <NavLink to="add" className="btn-create">
              {t('Excel.Create')}
            </NavLink>
            <DownloadTableExcel
              filename="Salary Report table"
              sheet="Salary Report"
              currentTableRef={tableRef.current}
            >
              <button className="btn-create"> {t('Excel.Export Excel')} </button>
            </DownloadTableExcel>
          </div>
          <table className="styled-table" ref={tableRef}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Staff No.</th>
                <th style={{ textAlign: "center" }}>Staff Name</th>
                <th style={{ textAlign: "center" }}>Position</th>
                <th style={{ textAlign: "center" }}>Month</th>
                <th style={{ textAlign: "center" }}>Salary</th>
                <th style={{ textAlign: "center" }}>Commission</th>
                <th style={{ textAlign: "center" }}>MPF</th>
                <th style={{ textAlign: "center" }}>Salary After deduct MPF</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(staff)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? staff[id]
                    : staff[id].name.toLowerCase().includes(search);
                })
                .sort((a, b) => (staff[a].name > staff[b].code ? 1 : -1))
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {staff[id].staffno}
                      </td>
                      <td style={{ textAlign: "center" }}>{staff[id].name}</td>
                      <td style={{ textAlign: "center" }}>
                        {staff[id].position}
                      </td>
                      <td style={{ textAlign: "center" }}>{staff[id].month}</td>
                      <td style={{ textAlign: "center" }}>
                        ${staff[id].salary}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ${staff[id].commission}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        $
                        {staff[id].salary > 30000
                          ? 1500
                          : staff[id].salary * 0.05}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        $
                        {staff[id].salary -
                          (staff[id].salary > 30000
                            ? 1500
                            : staff[id].salary * 0.05)}
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
                                "Are you sure that you wanted to delete that Salary and MPF report?"
                              )
                            ) {
                              remove(ref(db, "salaryreport/" + id));
                              window.location.reload(true);
                            }
                          }}
                        >
                          Delete
                        </button>
                        <NavLink to={`view/${id}`} className="btn-view">
                          Receipt
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

export default SR;
