import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db, storage } from "../../../firebase";
import { onValue, ref, remove } from "firebase/database";
import { getDownloadURL, ref as sRef } from "firebase/storage";
import { FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "../../../App.css";

const Invoice = () => {
  const [search, setSearch] = useState("");
  const [invoice, setInvoice] = useState([]);
  const [resume, setResume] = useState(null);
  const { t } = useTranslation()

  // const onDeleteById = id =>{

  //   setInvoice(oldValues =>{
  //     return (

  //       Object.keys(oldValues).filter(invoice => invoice[id] !== id)

  //       )
  //   })
  // }

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    getDownloadURL(sRef(storage, "meisze-invoice-template-pdf.pdf")).then(
      (url) => {
        setResume(url);
      }
    );
  });

  useEffect(() => {
    const getInvoice = () => {
      onValue(ref(db, "Invoice"), (snapshot) => {
        if (snapshot.val() !== null) {
          setInvoice({ ...snapshot.val() });
        }
      });
    };

    getInvoice();
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
            <h1>{ t("table.Invoice List") }</h1>
            <NavLink to="add" className="btn-create">
              {t("Excel.Create")}
            </NavLink>
            <DownloadTableExcel
              filename="Invoice table"
              sheet="Invoice"
              currentTableRef={tableRef.current}
            >
              <button className="btn-create"> {t("Excel.Export Excel")} </button>
            </DownloadTableExcel>
            <button className="btn-create" onClick={() => openInNewTab(resume)}>
              {t("Excel.Export PDF")}
            </button>
          </div>
          <table className="styled-table" ref={tableRef}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>{t("Invoice List.Invoice no")}</th>
                <th style={{ textAlign: "center" }}>{t("Invoice List.Date")}</th>
                <th style={{ textAlign: "center" }}>{t("Invoice List.Billed to")}</th>
                <th style={{ textAlign: "center" }}>{t("Invoice List.Item")}</th>
                <th style={{ textAlign: "center" }}>{t("Invoice List.Quantity")}</th>
                <th style={{ textAlign: "center" }}>{t("Invoice List.Price")}</th>
                <th style={{ textAlign: "center" }}>{t("Invoice List.Total")}</th>
                <th style={{ textAlign: "center" }}>{t("Invoice List.Status")}</th>
                <th style={{ textAlign: "center" }}>{t("Invoice List.Action")}</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(invoice)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? invoice[id]
                    : invoice[id].no.toLowerCase().includes(search);
                })
                .sort((a, b) => (invoice[a].no > invoice[b].no ? 1 : -1))
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>{invoice[id].no}</td>
                      <td style={{ textAlign: "center" }}>
                        {invoice[id].date}
                      </td>
                      <td style={{ textAlign: "center" }}>{invoice[id].bt}</td>
                      <td style={{ textAlign: "center" }}>
                        {invoice[id].item}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {invoice[id].quantity}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ${invoice[id].price}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ${invoice[id].total}
                      </td>
                      {invoice[id].status === "Accepted" ? (
                        <td style={{ textAlign: "center", color: "green" }}>
                          {invoice[id].status}
                        </td>
                      ) : (
                        <td style={{ textAlign: "center" }}>
                          {invoice[id].status}
                        </td>
                      )}

                      <td style={{ textAlign: "center" }}>
                        <NavLink to={`update/${id}`} className="btn-edit">
                          Edit
                        </NavLink>
                        <button
                          className="btn-delete"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure that you wanted to delete that invoice?"
                              )
                            ) {
                              remove(ref(db, "Invoice/" + id));
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

export default Invoice;
