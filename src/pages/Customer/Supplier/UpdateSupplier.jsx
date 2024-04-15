import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import { ref, set, onValue } from "firebase/database";
import { useTranslation } from "react-i18next";

const UpdateSupplier = () => {
  const [newName, setNewName] = useState("");
  const [newMobile, setNewMobile] = useState(0);
  const [newOT, setNewOT] = useState(0);
  const [newEmail, setNewEmail] = useState(0);
  const [newAddress, setNewAddress] = useState("");
  const [newContactPerson, setNewContactPerson] = useState("");
  const [Supplier, setSupplier] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const [editingContainer, setEditingContainer] = useState(0);

  const createUser = () => {
    set(ref(db, "Supplier/" + id), {
      name: newName,
      mobile: newMobile,
      email: newEmail,
      address: newAddress,
      cp: newContactPerson,
      ot: newOT,
    });

    navigate("/mainmeun/customer/supplier/");
  };

  useEffect(() => {
    const getSupplier = () => {
      onValue(ref(db, "Supplier/" + id), (snapshot) => {
        if (snapshot.val() !== null) {
          setSupplier({ ...snapshot.val() });
        }
      });
    };
    getSupplier();
    setNewName(Supplier.name);
    setNewMobile(Supplier.mobile);
    setNewEmail(Supplier.email);
    setNewAddress(Supplier.address);
    setNewContactPerson(Supplier.cp);
    setNewOT(Supplier.ot);
  }, [
    id,
    Supplier.name,
    Supplier.mobile,
    Supplier.email,
    Supplier.address,
    Supplier.cp,
    Supplier.ot,
  ]);
  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <h1>
            {t("Table Actions.edit") + " " + t("sidebar.Purchase.Supplier")}
          </h1>

          <form className="input-form">
            <div
              className={
                (editingContainer === 1 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Suppliers List.Supplier")}</label>
              <input
                className="input-add"
                placeholder="Name..."
                value={newName || ""}
                onChange={(event) => {
                  setNewName(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 1)}
              />
            </div>

            <div
              className={
                (editingContainer === 2 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Suppliers List.Office Telephone")}</label>
              <input
                className="input-add"
                placeholder="Office Telephone..."
                value={newOT || ""}
                onChange={(event) => {
                  setNewOT(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 2)}
              />
            </div>

            <div
              className={
                (editingContainer === 3 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Suppliers List.Mobile")}</label>
              <input
                className="input-add"
                placeholder="Mobile..."
                value={newMobile || ""}
                onChange={(event) => {
                  setNewMobile(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 3)}
              />
            </div>

            <div
              className={
                (editingContainer === 4 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Suppliers List.Contact Person")}</label>
              <input
                className="input-add"
                placeholder="Contact Person..."
                value={newContactPerson || ""}
                onChange={(event) => {
                  setNewContactPerson(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 4)}
              />
            </div>

            <div
              className={
                (editingContainer === 5 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Suppliers List.Address")}</label>
              <input
                className="input-add"
                placeholder="Address..."
                value={newAddress || ""}
                onChange={(event) => {
                  setNewAddress(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 5)}
              />
            </div>

            <div
              className={
                (editingContainer === 6 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Suppliers List.Address")}</label>
              <input
                className="input-add"
                placeholder="Email..."
                value={newEmail || ""}
                onChange={(event) => {
                  setNewEmail(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 6)}
              />
            </div>

            <div className="text-center" style={{ gridColumn: "1/3" }}>
              <button className="btn-create" onClick={createUser}>
                Edit Supplier
              </button>
              <NavLink to="/mainmeun/customer/supplier/" className="btn-delete">
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateSupplier;
