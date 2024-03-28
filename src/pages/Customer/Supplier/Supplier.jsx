import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../../firebase";
import { onValue, ref} from "firebase/database";
import { FaSearch } from "react-icons/fa";
import "../../../App.css";

const Supplier = () => {
    const [search, setSearch] = useState("");
    const [Supplier, setSupplier] = useState([]);
  
    useEffect(() => {
      const getSupplier = () => {
        onValue(ref(db, "Supplier"), (snapshot) => {
          if (snapshot.val() !== null) {
            setSupplier({ ...snapshot.val() });
          }
        });
      };
  
      getSupplier();
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
                placeholder="Search Supplier"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
  
            <div className="text-end">
              <h1>Suppliers List</h1>
              <NavLink to="add" className="btn-create">
                Create
              </NavLink>
              <DownloadTableExcel
                filename="Suppliers table"
                sheet="Suppliers"
                currentTableRef={tableRef.current}
              >
                <button className="btn-create"> Export Excel </button>
              </DownloadTableExcel>
            </div>
            <table className="styled-table" ref={tableRef}>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Supplier</th>
                  <th style={{ textAlign: "center" }}>Address</th>
                  <th style={{ textAlign: "center" }}>Contact person</th>
                  <th style={{ textAlign: "center" }}>Email</th>
                  <th style={{ textAlign: "center" }}>Mobile</th>
                  <th style={{ textAlign: "center" }}>Office telephone</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(Supplier)
                  .filter((id) => {
                    return search.toLowerCase() === ""
                      ? Supplier[id]
                      : Supplier[id].name.toLowerCase().includes(search);
                  })
                  .sort((a, b) =>
                    Supplier[a].name > Supplier[b].name ? 1 : -1
                  )
                  .map((id) => {
                    return (
                      <tr>
                        <td style={{ textAlign: "center" }}>
                          {Supplier[id].name}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {Supplier[id].address}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {Supplier[id].cp}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {Supplier[id].email}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {Supplier[id].mobile}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {Supplier[id].ot}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <NavLink to={`update/${id}`} className="btn-edit">
                            Edit
                          </NavLink>
                          <button
                            className="btn-delete"
                            onClick={() => {

                                window.confirm(
                                  "Are you sure that you wanted to delete that supplier?"
                                )
                              
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
}

export default Supplier
