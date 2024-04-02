import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../../firebase";
import { onValue, ref, remove } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import "../../../App.css";
import { useTranslation } from "react-i18next";

const Staff = () => {
  const [search, setSearch] = useState("");
  const [staff, setStaff] = useState([]);
  const { t } = useTranslation()

  useEffect(() => {
    const getStaff = () => {
      onValue(ref(db, "staff"), (snapshot) => {
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
            <h1>{t('table.Staff List')}</h1>
            <NavLink to="add" className="btn-create">
              {t('Excel.Create')}
            </NavLink>
            <DownloadTableExcel
              filename="Staff table"
              sheet="Staff"
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
                <th style={{ textAlign: "center" }}>Permission</th>
                <th style={{ textAlign: "center" }}>Date of entry</th>
                <th style={{ textAlign: "center" }}>Mobile</th>
                <th style={{ textAlign: "center" }}>Salary</th>
                <th style={{ textAlign: "center" }}>Commission</th>
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
                      <td style={{ textAlign: "center" }}>
                        {staff[id].permission}
                      </td>
                      <td style={{ textAlign: "center" }}>{staff[id].doe}</td>
                      <td style={{ textAlign: "center" }}>
                        {staff[id].mobile}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ${staff[id].salary}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ${staff[id].commission}
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
                                "Are you sure that you wanted to delete that staff?"
                              )
                            ) {
                              remove(ref(db, "staff/" + id));
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

export default Staff;
