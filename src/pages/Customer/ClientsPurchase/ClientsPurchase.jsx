import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../../firebase";
import { onValue, ref, remove } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import "../../../App.css";
import { useTranslation } from "react-i18next";

const ClientsPurchase = () => {
  const [search, setSearch] = useState("");
  const [ClientsPurchase, setClientsPurchase] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const getClientsPurchase = () => {
      onValue(ref(db, "ClientsPurchase"), (snapshot) => {
        if (snapshot.val() !== null) {
          setClientsPurchase({ ...snapshot.val() });
        }
      });
    };

    getClientsPurchase();
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
              placeholder="Search Service"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>

          <div className="text-end">
            <h1>{t('table.Clients Purchase List')}</h1>
            <NavLink to="add" className="btn-create">
              {t('Excel.Create')}
            </NavLink>
            <DownloadTableExcel
              filename="Clients Purchase table"
              sheet="Clients Purchase"
              currentTableRef={tableRef.current}
            >
              <button className="btn-create"> {t('Excel.Export Excel')} </button>
            </DownloadTableExcel>
          </div>
          <table className="styled-table" ref={tableRef}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>{t("Clients Purchase List.Service")}</th>
                <th style={{ textAlign: "center" }}>{t("Clients Purchase List.Total Price")}</th>
                <th style={{ textAlign: "center" }}>{t("Clients Purchase List.Purchased By")}</th>
                <th style={{ textAlign: "center" }}>{t("Clients Purchase List.Remark")}</th>
                <th style={{ textAlign: "center" }}>{t("Clients Purchase List.Action")}</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(ClientsPurchase)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? ClientsPurchase[id]
                    : ClientsPurchase[id].name.toLowerCase().includes(search);
                })
                .sort((a, b) =>
                  ClientsPurchase[a].name > ClientsPurchase[b].name ? 1 : -1
                )
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {ClientsPurchase[id].name}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {ClientsPurchase[id].total}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {ClientsPurchase[id].pb}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {ClientsPurchase[id].remark}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          className="btn-delete"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure that you wanted to delete that purchase?"
                              )
                            ) {
                              remove(ref(db, "PSP/" + id));
                              window.location.reload(true);
                            }
                          }}
                        >
                          Cancel Purchase
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
};

export default ClientsPurchase;
