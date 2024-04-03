import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db, storage } from "../../../firebase";
import { onValue, ref, remove } from "firebase/database";
import { getDownloadURL, ref as sRef } from "firebase/storage";
import { FaSearch } from "react-icons/fa";
import "../../../App.css";
import { useTranslation } from "react-i18next";

const DeliveryNote = () => {
  const [search, setSearch] = useState("");
  const [DeliveryNote, setDeliveryNote] = useState([]);
  const [resume, setResume] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const getDeliveryNote = () => {
      onValue(ref(db, "DeliveryNote"), (snapshot) => {
        if (snapshot.val() !== null) {
          setDeliveryNote({ ...snapshot.val() });
        }
      });
    };

    getDeliveryNote();
  }, []);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    getDownloadURL(sRef(storage, "meisze-delivery-note-template-pdf.pdf")).then(
      (url) => {
        setResume(url);
      }
    );
  });

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
            <h1>{t('table.Delivery Note List')}</h1>
            <NavLink to="add" className="btn-create">
              {t('Excel.Create')}
            </NavLink>
            <DownloadTableExcel
              filename="Delivery Note table"
              sheet="Delivery Note"
              currentTableRef={tableRef.current}
            >
              <button className="btn-create"> {t('Excel.Export Excel')} </button>
            </DownloadTableExcel>
            <button className="btn-create" onClick={() => openInNewTab(resume)}>
              {t('Excel.Export PDF')}
            </button>
          </div>
          <table className="styled-table" ref={tableRef}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>{t("Delivery Note List.Delivery Note no")}</th>
                <th style={{ textAlign: "center" }}>{t("Delivery Note List.Delivery To")}</th>
                <th style={{ textAlign: "center" }}>{t("Delivery Note List.Date")}</th>
                <th style={{ textAlign: "center" }}>{t("Delivery Note List.Item")}</th>
                <th style={{ textAlign: "center" }}>{t("Delivery Note List.Quantity")}</th>
                <th style={{ textAlign: "center" }}>{t("Delivery Note List.Price")}</th>
                <th style={{ textAlign: "center" }}>{t("Delivery Note List.Total")}</th>
                <th style={{ textAlign: "center" }}>{t("Delivery Note List.Action")}</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(DeliveryNote)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? DeliveryNote[id]
                    : DeliveryNote[id].no.toLowerCase().includes(search);
                })
                .sort((a, b) =>
                  DeliveryNote[a].no > DeliveryNote[b].no ? 1 : -1
                )
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {DeliveryNote[id].no}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {DeliveryNote[id].to}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {DeliveryNote[id].date}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {DeliveryNote[id].item}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {DeliveryNote[id].quantity}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ${DeliveryNote[id].price}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ${DeliveryNote[id].total}
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
                                "Are you sure that you wanted to delete that delivery note?"
                              )
                            ) {
                              remove(ref(db, "DeliveryNote/" + id));
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

export default DeliveryNote;
