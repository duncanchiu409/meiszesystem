import React, { useState, useEffect, useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../../firebase";
import { onValue, ref } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import "../../../App.css";
import { useTranslation } from "react-i18next";

const PO = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const { t } = useTranslation()
  // const [newPQ, setNewPQ] = useState([]);

  useEffect(() => {
    const getProducts = () => {
      onValue(ref(db, "ProductionOrder"), (snapshot) => {
        if (snapshot.val() !== null) {
          setProducts({ ...snapshot.val() });
        }
      });
    };

    getProducts();
  }, []);

  const tableRef = useRef(null);

  return (
    <div className="main">
      <div
        className="App"
        style={{ width: "100%", padding: "100px", height: "1000px" }}
      >
        <div style={{ paddingLeft: "200px" }}>
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
            <h1>{t('table.Production Order List')}</h1>

            <button to="add" className="btn-create">
              {t('Excel.Import Excel')}
            </button>
            <DownloadTableExcel
              filename="Production Order table"
              sheet="Production Order"
              currentTableRef={tableRef.current}
            >
              <button className="btn-create">{t('Excel.Export Excel')}</button>
            </DownloadTableExcel>
          </div>
          <table className="styled-table" ref={tableRef}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Name</th>
                <th style={{ textAlign: "center" }}>Bar Code/SKU</th>
                <th style={{ textAlign: "center" }}>
                  Model/Detail/Specification
                </th>
                <th style={{ textAlign: "center" }}>Type</th>
                <th style={{ textAlign: "center" }}>Other Information</th>
                <th style={{ textAlign: "center" }}>Acessories</th>
                <th style={{ textAlign: "center" }}>Module</th>
                <th style={{ textAlign: "center" }}>Attributes</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(products)
                .filter((id) => {
                  return search.toLowerCase() === ""
                    ? products[id]
                    : products[id].barcode.toLowerCase().includes(search);
                })
                .sort((a, b) => (products[a].code > products[b].code ? 1 : -1))
                .map((id) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {products[id].name}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {products[id].sku}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {products[id].model}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {products[id].type}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {products[id].oi}
                        </td>
                      <td style={{ textAlign: "center" }}>
                        {products[id].acessories}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {products[id].module}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {products[id].attributes}
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

export default PO;
