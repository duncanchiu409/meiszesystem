import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../../firebase";
import { onValue, ref } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import "../../../App.css";
import SingleCard from "../../../components/SingleCard";
import { useTranslation } from "react-i18next";

const PurchaseBudgeting = () => {
  const [search, setSearch] = useState("");
  const [PurchasePlanning, setPurchasePlanning] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const getPurchasePlanning = () => {
      onValue(ref(db, "PurchasePlanning"), (snapshot) => {
        if (snapshot.val() !== null) {
          setPurchasePlanning({ ...snapshot.val() });
        }
      });
    };

    getPurchasePlanning();
  }, []);

  const tableRef = useRef(null);

  const salesObj = {
    title: `Jan 2024`,
    totalNumber: `620`,
    icon: "ri-money-dollar-circle-line",
  };

  const PurchaseObj = {
    title: "Dec 2023",
    totalNumber: `4000`,
    icon: "ri-briefcase-4-fill",
  };

  const StockObj = {
    title: "Nov 2023",
    totalNumber: `1100`,
    icon: "ri-store-3-line",
  };

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
            <h1>{t('table.Purchase Budgeting List')}</h1>

            <DownloadTableExcel
              filename="Purchase Budgeting table"
              sheet="Purchase Budgeting"
              currentTableRef={tableRef.current}
            >
              <button className="btn-create"> {t('Excel.Export Excel')} </button>
            </DownloadTableExcel>
          </div>
          <table className="styled-table" ref={tableRef}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Purchase Planning no.</th>
                <th style={{ textAlign: "center" }}>Date</th>
                <th style={{ textAlign: "center" }}>Supplier</th>
                <th style={{ textAlign: "center" }}>Item</th>
                <th style={{ textAlign: "center" }}>Quantity</th>
                <th style={{ textAlign: "center" }}>Total Amount</th>
                <th style={{ textAlign: "center" }}>Status</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(PurchasePlanning)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? PurchasePlanning[id]
                    : PurchasePlanning[id].no.toLowerCase().includes(search);
                })
                .sort((a, b) =>
                  PurchasePlanning[a].no > PurchasePlanning[b].no ? 1 : -1
                )
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {PurchasePlanning[id].no}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {PurchasePlanning[id].date}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {PurchasePlanning[id].supplier}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {PurchasePlanning[id].item}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {PurchasePlanning[id].quantity}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ${PurchasePlanning[id].total}
                      </td>
                      {PurchasePlanning[id].status === "Paid" ? (
                        <td style={{ textAlign: "center", color: "green" }}>
                          {PurchasePlanning[id].status}
                        </td>
                      ) : (
                        <td style={{ textAlign: "center" }}>
                          {PurchasePlanning[id].status}
                        </td>
                      )}
                      <td style={{ textAlign: "center" }}>
                        <NavLink to={`update/${id}`} className="btn-edit">
                          Edit
                        </NavLink>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="dashboard" style={{ textAlign: "center" }}>
            <div className="dashboard_wrapper" style={{ textAlign: "center" }}>
              <div className="dashboard_cards" style={{ textAlign: "center" }}>
                <SingleCard item={salesObj} />

                <SingleCard item={PurchaseObj} />
                <SingleCard item={StockObj} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseBudgeting;
