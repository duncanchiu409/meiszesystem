import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../firebase";
import { onValue, ref, remove } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import "../../App.css";

const Inventory = () => {
  const [search, setSearch] = useState("");
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const getInventory = () => {
      onValue(ref(db, "inventory"), (snapshot) => {
        if (snapshot.val() !== null) {
          setInventory({ ...snapshot.val() });
        }
      });
    };

    getInventory();
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
              placeholder="Search Order No."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>

          <div className="text-end">
            <h1>Inventory List</h1>
            <NavLink to="add" className="btn-create">
              Create
            </NavLink>
            <DownloadTableExcel
              filename="Inventory table"
              sheet="Inventory"
              currentTableRef={tableRef.current}
            >
              <button className="btn-create"> Export Excel </button>
            </DownloadTableExcel>
          </div>
          <table className="styled-table" ref={tableRef}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Status</th>
                <th style={{ textAlign: "center" }}>Ref No</th>
                <th style={{ textAlign: "center" }}>Date</th>
                <th style={{ textAlign: "center" }}>Product</th>
                <th style={{ textAlign: "center" }}>Quantity</th>
                <th style={{ textAlign: "center" }}>Total Cost</th>
                <th style={{ textAlign: "center" }}>Remark</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(inventory)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? inventory[id]
                    : inventory[id].refno.toLowerCase().includes(search);
                })
                .sort((a, b) =>
                  inventory[a].status > inventory[b].status ? 1 : -1
                )
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {inventory[id].status}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {inventory[id].refno}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {inventory[id].date}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {inventory[id].product}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {inventory[id].quantity}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {inventory[id].cost}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {inventory[id].remark}
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
                                "Are you sure that you wanted to delete that inventory?"
                              )
                            ) {
                              remove(ref(db, "inventory/" + id));
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

export default Inventory;
