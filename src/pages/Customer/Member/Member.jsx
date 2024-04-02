import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../../firebase";
import { onValue, ref, remove} from "firebase/database";
import { FaSearch } from "react-icons/fa";
import "../../../App.css";
import { useTranslation } from "react-i18next";

const Member = () => {
    const [search, setSearch] = useState("");
    const [Member, setMember] = useState([]);
    const { t } = useTranslation()
  
    useEffect(() => {
      const getMember = () => {
        onValue(ref(db, "Member"), (snapshot) => {
          if (snapshot.val() !== null) {
            setMember({ ...snapshot.val() });
          }
        });
      };
  
      getMember();
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
                placeholder="Search Customer"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
  
            <div className="text-end">
              <h1>{t('table.Member List')}</h1>
              <NavLink to="add" className="btn-create">
                {t('Excel.Create')}
              </NavLink>
              <DownloadTableExcel
                filename="Member table"
                sheet="Member"
                currentTableRef={tableRef.current}
              >
                <button className="btn-create"> {t('Excel.Export Excel')} </button>
              </DownloadTableExcel>
            </div>
            <table className="styled-table" ref={tableRef}>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Name</th>
                  <th style={{ textAlign: "center" }}>Email</th>
                  <th style={{ textAlign: "center" }}>Mobile</th>
                  <th style={{ textAlign: "center" }}>Membership Level</th>
                  <th style={{ textAlign: "center" }}>Join Date</th>
                  <th style={{ textAlign: "center" }}>End Date</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(Member)
                  .filter((id) => {
                    return search.toLowerCase() === ""
                      ? Member[id]
                      : Member[id].name.toLowerCase().includes(search);
                  })
                  .sort((a, b) =>
                    Member[a].name > Member[b].name ? 1 : -1
                  )
                  .map((id) => {
                    return (
                      <tr>
                        <td style={{ textAlign: "center" }}>
                          {Member[id].name}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {Member[id].email}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {Member[id].mobile}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {Member[id].ml}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {Member[id].doj}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {Member[id].ed}
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
                                  "Are you sure that you wanted to delete that member?"
                                )
                              ) {
                                remove(ref(db, "Members/" + id));
                                window.location.reload(true);
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
          </div>
        </div>
      </div>
    );
}

export default Member
