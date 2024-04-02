import React, { useState, useEffect, useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../../firebase";
import { onValue, ref } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import "../../../App.css";
import { useTranslation } from "react-i18next";

const PurchaseOrder = () => {
  const [search, setSearch] = useState("");
  const [PurchaseOrder, setPurchaseOrder] = useState([]);
  const { t } = useTranslation()

  useEffect(() => {
    const getPurchaseOrder = () => {
      onValue(ref(db, "PurchaseOrder"), (snapshot) => {
        if (snapshot.val() !== null) {
          setPurchaseOrder({ ...snapshot.val() });
        }
      });
    };

    getPurchaseOrder();
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
            <h1>{t('table.Purchase Order List')}</h1>

            <DownloadTableExcel
              filename="Purchase Order table"
              sheet="Purchase Order"
              currentTableRef={tableRef.current}
            >
              <button className="btn-create"> {t('Excel.Export Excel')} </button>
            </DownloadTableExcel>
          </div>
          <table className="styled-table" ref={tableRef}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Purchase Order no.</th>
                <th style={{ textAlign: "center" }}>Date</th>
                <th style={{ textAlign: "center" }}>Supplier</th>
                <th style={{ textAlign: "center" }}>Item</th>
                <th style={{ textAlign: "center" }}>Quantity</th>
                <th style={{ textAlign: "center" }}>Total Amount</th>
                <th style={{ textAlign: "center" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(PurchaseOrder)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? PurchaseOrder[id]
                    : PurchaseOrder[id].no.toLowerCase().includes(search);
                })
                .sort((a, b) =>
                  PurchaseOrder[a].no > PurchaseOrder[b].no ? 1 : -1
                )
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {PurchaseOrder[id].no}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {PurchaseOrder[id].date}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {PurchaseOrder[id].supplier}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {PurchaseOrder[id].item}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {PurchaseOrder[id].quantity}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ${PurchaseOrder[id].total}
                      </td>
                      {PurchaseOrder[id].status === "Paid" ? (
                        <td style={{ textAlign: "center", color: "green" }}>
                          {PurchaseOrder[id].status}
                        </td>
                      ) : (
                        <td style={{ textAlign: "center" }}>
                          {PurchaseOrder[id].status}
                        </td>
                      )}
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

export default PurchaseOrder;
