import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { NavLink, useParams } from "react-router-dom";
import "./AddEdit.css";
import { ref, onValue } from "firebase/database";

const ViewAdvanceInvoice = () => {
  const [AdvanceInvoice, setAdvanceInvoice] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getAdvanceInvoice = () => {
      onValue(ref(db, "AdvanceInvoice/" + id), (snapshot) => {
        if (snapshot.val() !== null) {
          setAdvanceInvoice({ ...snapshot.val() });
        }
      });
    };
    getAdvanceInvoice();
  }, [id]);

  return (
    <div className="main">
      <div
        className="App"
        style={{ width: "100%", padding: "100px", height: "1000px" }}
      >
        <div style={{ padding: "0px 450px" }} className="container">
          <div className="card-header">
            <h1>AdvanceInvoice #{AdvanceInvoice.no}</h1>
          </div>
          <div className="view-container">
            <br />
            <strong>Date:</strong>
            <br />
            <span>{AdvanceInvoice.date}</span>
            <br />
            <br />
            <strong>Item:</strong>
            <br />
            <span>{AdvanceInvoice.item}</span>
            <br />
            <br />
            <strong>Quantity:</strong>
            <br />
            <span>{AdvanceInvoice.quantity}</span>
            <br />
            <br />
            <strong>Price:</strong>
            <br />
            <span>{AdvanceInvoice.price}</span>
            <br />
            <br />
            <strong>Total:</strong>
            <br />
            <span>{AdvanceInvoice.total}</span>
            <br />
            <br />

            <div className="text-center">
              <NavLink
                to="/mainmeun/sale/AdvanceInvoice"
                className="btn-delete"
              >
                Go Back
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAdvanceInvoice;
