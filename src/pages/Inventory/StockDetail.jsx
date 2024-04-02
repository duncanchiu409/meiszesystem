import React, { useState, useEffect, useRef } from "react";
import{NavLink} from "react-router-dom"
import { DownloadTableExcel } from "react-export-table-to-excel";
import {db} from "../../firebase";
import {onValue, ref} from 'firebase/database'
import { FaSearch } from "react-icons/fa";
import "../../App.css";
import { useTranslation } from "react-i18next";

const StockDetail = () => {
    const [search, setSearch] = useState("");
    const [StockDetail, setStockDetail] = useState([]);
    const { t } = useTranslation()
  
    useEffect(() => {
      const getStockDetail = () => {
        onValue(ref(db, "StockDetail"), (snapshot) => {
          if (snapshot.val() !== null) {
            setStockDetail({ ...snapshot.val() });
          }
        });
      };
  
      getStockDetail();
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
                placeholder="Search Product"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
  
            <div className="text-end">
              <h1>{t('table.Stock Detail')}</h1>
              <NavLink to="add" className="btn-create">
                {t('Excel.Create')}
              </NavLink>
              <DownloadTableExcel
                filename="Stock Detail table"
                sheet="Stock Detail"
                currentTableRef={tableRef.current}
              >
                <button className="btn-create"> {t('Excel.Export Excel')} </button>
              </DownloadTableExcel>
            </div>
            <table className="styled-table" ref={tableRef}>
              <thead>
                <tr>

                  <th style={{ textAlign: "center" }}>Product</th>
                  <th style={{ textAlign: "center" }}>Quantity</th>
                  <th style={{ textAlign: "center" }}>WareHouse</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(StockDetail)
                  .filter((product) => {
                    return search.toLowerCase() === ""
                      ? product
                      : product.toLowerCase().includes(search);
                  })
                  .sort((a, b) =>
                    StockDetail[a].quantity > StockDetail[b].quantity ? 1 : -1
                  )
                  .map((product) => {
                    return (
                      <tr>
                        <td style={{ textAlign: "center" }}>
                          {product}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {StockDetail[product].quantity}
                        </td>
                        <td style={{ textAlign: "center" }}>
                            Tuen Mun
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

export default StockDetail
