import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../../firebase";
import { onValue, ref, remove } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import "../../../App.css";
import { useTranslation } from "react-i18next";

const Contract = () => {
  const [search, setSearch] = useState("");
  const [Contract, setContract] = useState([]);
  const { t } = useTranslation()

  useEffect(() => {
    const getContract = () => {
      onValue(ref(db, "Contract"), (snapshot) => {
        if (snapshot.val() !== null) {
          setContract({ ...snapshot.val() });
        }
      });
    };

    getContract();
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
              placeholder="Search Bar Code"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>

          <div className="text-end">
            <h1>{t('table.Contract List')}</h1>
            <NavLink to="add" className="btn-create">
              {t('Excel.Create')}
            </NavLink>
            <DownloadTableExcel
              filename="Contract table"
              sheet="Contract"
              currentTableRef={tableRef.current}
            >
              <button className="btn-create"> {t('Excel.Export Excel')} </button>
            </DownloadTableExcel>
          </div>
          <table className="styled-table" ref={tableRef}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>{t('Contract List.Contract no')}</th>
                <th style={{ textAlign: "center" }}>{t('Contract List.Buyer')}</th>
                <th style={{ textAlign: "center" }}>{t('Contract List.Date')}</th>
                <th style={{ textAlign: "center" }}>{t('Contract List.Item')}</th>
                <th style={{ textAlign: "center" }}>{t('Contract List.Quantity')}</th>
                <th style={{ textAlign: "center" }}>{t('Contract List.Price')}</th>
                <th style={{ textAlign: "center" }}>{t('Contract List.Total')}</th>
                <th style={{ textAlign: "center" }}>{t('Contract List.Action')}</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(Contract)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? Contract[id]
                    : Contract[id].no.toLowerCase().includes(search);
                })
                .sort((a, b) => (Contract[a].no > Contract[b].no ? 1 : -1))
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>{Contract[id].no}</td>
                      <td style={{ textAlign: "center" }}>
                        {Contract[id].buyer}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {Contract[id].date}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {Contract[id].item}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {Contract[id].quantity}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ${Contract[id].price}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ${Contract[id].total}
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
                                "Are you sure that you wanted to delete that contract?"
                              )
                            ) {
                              remove(ref(db, "Contract/" + id));
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

export default Contract;
