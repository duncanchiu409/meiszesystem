import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../firebase";
import { onValue, ref, remove } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import "../../App.css";
import { useTranslation } from "react-i18next";

const Product = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const { t } = useTranslation()
  // const [newPQ, setNewPQ] = useState([]);

  useEffect(() => {
    const getProducts = () => {
      onValue(ref(db, "products"), (snapshot) => {
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
        <div>
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
            <h1>{t('table.Products List')}</h1>
            <NavLink to="add" className="btn-create">
              {t('Excel.Create')}
            </NavLink>
            <button to="add" className="btn-create">
              {t('Excel.Import Excel')}
            </button>
            <DownloadTableExcel
              filename="Products table"
              sheet="Products"
              currentTableRef={tableRef.current}
            >
              <button className="btn-create"> {t('Excel.Export Excel')} </button>
            </DownloadTableExcel>
          </div>
          <table className="styled-table" ref={tableRef}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>{t('Products List.Name')}</th>
                <th style={{ textAlign: "center" }}>{t('Products List.Bar Code')}</th>
                <th style={{ textAlign: "center" }}>
                {t('Products List.Model')}
                </th>
                <th style={{ textAlign: "center" }}>{t('Products List.Type')}</th>
                <th style={{ textAlign: "center" }}>{t('Products List.Other Information')}</th>
                <th style={{ textAlign: "center" }}>{t('Products List.Acessories')}</th>
                <th style={{ textAlign: "center" }}>{t('Products List.Module')}</th>
                <th style={{ textAlign: "center" }}>{t('Products List.Attributes')}</th>
                <th style={{ textAlign: "center" }}>{t('Products List.Process')}</th>
                <th style={{ textAlign: "center" }}>{t('Products List.Price')}</th>
                <th style={{ textAlign: "center" }}>{t('Products List.Action')}</th>
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
                      <td style={{ textAlign: "center" }}>{products[id].oi}</td>
                      <td style={{ textAlign: "center" }}>
                        {products[id].acessories}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {products[id].module}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {products[id].attributes}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {products[id].process}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {products[id].price}
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
                                "Are you sure that you wanted to delete that product?"
                              )
                            ) {
                              remove(ref(db, "products/" + id));
                              remove(ref(db, "ProductionOrder/" + id));
                              window.location.reload(true);
                            }
                          }}
                        >
                          Delete
                        </button>
                        <NavLink to={`view/${id}`} className="btn-view">
                          View
                        </NavLink>
                        <input
                          type="number"
                          // onChange={(event) => {
                          //   setNewPQ(event.target.value);
                          // }}
                        ></input>
                        <button>Purchase</button>
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

export default Product;
