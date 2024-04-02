import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../../firebase";
import { onValue, ref, remove} from "firebase/database";
import { FaSearch } from "react-icons/fa";
import "../../../App.css";
import { useTranslation } from "react-i18next";

const Customer = () => {
    const [search, setSearch] = useState("");
    const [customers, setCustomers] = useState([]);
    const { t } = useTranslation()
  
    useEffect(() => {
      const getCustomers = () => {
        onValue(ref(db, "customers"), (snapshot) => {
          if (snapshot.val() !== null) {
            setCustomers({ ...snapshot.val() });
          }
        });
      };
  
      getCustomers();
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
              <h1>{t('table.Customers List')}</h1>
              <NavLink to="add" className="btn-create">
                {t('Excel.Create')}
              </NavLink>
              <DownloadTableExcel
                filename="Customers table"
                sheet="Customers"
                currentTableRef={tableRef.current}
              >
                <button className="btn-create"> {t('Excel.Export Excel')} </button>
              </DownloadTableExcel>
            </div>
            <table className="styled-table" ref={tableRef}>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Group</th>
                  <th style={{ textAlign: "center" }}>Name</th>
                  <th style={{ textAlign: "center" }}>Gender</th>
                  <th style={{ textAlign: "center" }}>Address</th>
                  <th style={{ textAlign: "center" }}>Email</th>
                  <th style={{ textAlign: "center" }}>Mobile</th>
                  <th style={{ textAlign: "center" }}>Join Date</th>
                  <th style={{ textAlign: "center" }}>Follow-Up</th>
                  <th style={{ textAlign: "center" }}>Source</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(customers)
                  .filter((id) => {
                    return search.toLowerCase() === ""
                      ? customers[id]
                      : customers[id].name.toLowerCase().includes(search);
                  })
                  .sort((a, b) =>
                    customers[a].name > customers[b].name ? 1 : -1
                  )
                  .map((id) => {
                    return (
                      <tr>
                        <td style={{ textAlign: "center" }}>
                          {customers[id].group}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {customers[id].name}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {customers[id].gender}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {customers[id].address}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {customers[id].email}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {customers[id].mobile}
                        </td>

                        <td style={{ textAlign: "center" }}>
                          {customers[id].doj}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {customers[id].follow}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {customers[id].source}
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
                                  "Are you sure that you wanted to delete that customer?"
                                )
                              ) {
                                remove(ref(db, "customers/" + id));
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

export default Customer
