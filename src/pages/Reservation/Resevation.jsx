import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../firebase";
import { onValue, ref, remove } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import "../../App.css";
import { useTranslation } from "react-i18next";

const Resevation = () => {
    const [search, setSearch] = useState("");
    const [Resevation, setResevation] = useState([]);
    const { t } = useTranslation()
  
    useEffect(() => {
      const getResevation = () => {
        onValue(ref(db, "Reservation"), (snapshot) => {
          if (snapshot.val() !== null) {
            setResevation({ ...snapshot.val() });
          }
        });
      };
  
      getResevation();
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
              <h1>{t('table.Resevation List')}</h1>
              <NavLink to="add" className="btn-create">
                {t('Excel.Book')}
              </NavLink>
              <DownloadTableExcel
                filename="Resevation table"
                sheet="Resevation"
                currentTableRef={tableRef.current}
              >
                <button className="btn-create"> {t('Excel.Export Excel')} </button>
              </DownloadTableExcel>
            </div>
            <table className="styled-table" ref={tableRef}>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Date</th>
                  <th style={{ textAlign: "center" }}>Time</th>
                  <th style={{ textAlign: "center" }}>Client</th>
                  <th style={{ textAlign: "center" }}>Service</th>
                  <th style={{ textAlign: "center" }}>Staff</th>
                  <th style={{ textAlign: "center" }}>Room</th>
                  <th style={{ textAlign: "center" }}>Site</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(Resevation)
                  .filter((id) => {
                    return search.toLowerCase() === ""
                      ? Resevation[id]
                      : Resevation[id].date.toLowerCase().includes(search);
                  })
                  .sort((a, b) =>
                    Resevation[a].date > Resevation[b].date ? 1 : -1
                  )
                  .map((id) => {
                    return (
                      <tr>
                        <td style={{ textAlign: "center" }}>
                          {Resevation[id].date}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {Resevation[id].time}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {Resevation[id].customer}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {Resevation[id].service}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {Resevation[id].staff}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {Resevation[id].room}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {Resevation[id].site}
                        </td>
                        <td style={{ textAlign: "center" }}>

                          <button
                            className="btn-delete"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure that you wanted to delete that Resevation?"
                                )
                              ) {
                                remove(ref(db, "Resevation/" + id));
                                window.location.reload(true);
                              }
                            }}
                          >
                            Cancel Booking
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

export default Resevation
