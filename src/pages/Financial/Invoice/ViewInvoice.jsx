import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { NavLink, useParams } from "react-router-dom";
import "./AddEdit.css";
import { ref, onValue } from "firebase/database";

const ViewInvoice = () => {
  const [Invoice, setInvoice] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getInvoice = () => {
      onValue(ref(db, "Invoice/" + id), (snapshot) => {
        if (snapshot.val() !== null) {
          setInvoice({ ...snapshot.val() });
        }
      });
    };
    getInvoice();
  }, [id]);

  return (
    <div className="main">
      <div
        className="App"
        style={{ width: "100%", padding: "100px", height: "1000px" }}
      >
        <div style={{ padding: "0px 450px" }} className="container">
          <div className="card-header">
            <h1>Invoice #{Invoice.no}</h1>
          </div>
          <div className="view-container">
            <br />
            <strong>Date:</strong>
            <br />
            <span>{Invoice.date}</span>
            <br />
            <br />
            <strong>Item:</strong>
            <br />
            <span>{Invoice.item}</span>
            <br />
            <br />
            <strong>Quantity:</strong>
            <br />
            <span>{Invoice.quantity}</span>
            <br />
            <br />
            <strong>Price:</strong>
            <br />
            <span>{Invoice.price}</span>
            <br />
            <br />
            <strong>Total:</strong>
            <br />
            <span>{Invoice.total}</span>
            <br />
            <br />

            <div className="text-center">
              <NavLink to="/mainmeun/financial/invoice" className="btn-delete">
                Go Back
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInvoice;
