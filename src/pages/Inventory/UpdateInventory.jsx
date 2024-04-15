import React, { useState, useRef, useEffect } from "react";
import { db } from "../../firebase";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import { ref, set, onValue } from "firebase/database";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useTranslation } from "react-i18next";

const UpdateInventory = () => {
  const [newStatus, setNewStatus] = useState("");
  const [newRefNo, setNewRefNo] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newProduct, setNewProduct] = useState("");
  const [newQuantity, setNewQuantity] = useState(0);
  const [newCost, setNewCost] = useState("");
  const [newRemark, setNewRemark] = useState("");
  const [inventory, setInventory] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const [editingContainer, setEditingContainer] = useState(0);

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    // set current date on component load
    setNewDate(format(new Date(), "dd/MM/yyyy"));
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  // on date change, store date in state
  const handleSelect = (date) => {
    // console.log(date)
    // console.log(format(date, 'MM/dd/yyyy'))
    setNewDate(format(date, "dd/MM/yyyy"));
  };

  const createUser = () => {
    set(ref(db, "inventory/" + id), {
      status: newStatus,
      refno: newRefNo,
      date: newDate,
      product: newProduct,
      quantity: newQuantity,
      cost: newCost,
      remark: newRemark,
    });

    navigate("/mainmeun/inventory");
  };

  useEffect(() => {
    const getInventory = () => {
      onValue(ref(db, "inventory/" + id), (snapshot) => {
        if (snapshot.val() !== null) {
          setInventory({ ...snapshot.val() });
        }
      });
    };
    getInventory();
    setNewStatus(inventory.status);
    setNewRefNo(inventory.refno);
    setNewDate(inventory.date);
    setNewProduct(inventory.product);
    setNewQuantity(inventory.quantity);
    setNewCost(inventory.cost);
    setNewRemark(inventory.remark);
  }, [
    id,
    inventory.status,
    inventory.refno,
    inventory.date,
    inventory.quantity,
    inventory.product,
    inventory.cost,
    inventory.remark,
  ]);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <h1>
            {t("Table Actions.edit") + " " + t("sidebar.Inventory.Inventory")} #
            {id}
          </h1>

          <form className="input-form">
            <div
              className={
                (editingContainer === 1 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Inventory List.Status")}</label>
              <select
                className="input-add"
                placeholder="Status..."
                onChange={(event) => {
                  setNewStatus(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 1)}
              >
                <option>{"Stock In"}</option>
                <option>{"Stock Out"}</option>
                <option>{"Consignment Sale"}</option>
                <option>{"Consignment Purchase"}</option>
                <option>{"Temporary Stock In"}</option>
                <option>{"Temporary Stock Out"}</option>
                <option>{"After Sales Return Goods"}</option>
                <option>{"GoodsReturn"}</option>
              </select>
            </div>

            <div
              className={
                (editingContainer === 2 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Inventory List.Ref no")}</label>
              <input
                className="input-add"
                placeholder="Ref No..."
                onChange={(event) => {
                  setNewRefNo(event.target.value);
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
              <label className="">{t("Inventory List.Date")}</label>
              <input
                value={newDate}
                readOnly
                className="input-add"
                onClick={() => {
                  setEditingContainer(() => 3);
                  setOpen((open) => !open);
                }}
              />
            </div>

            <div
              className={
                (editingContainer === 4 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Inventory List.Product")}</label>
              <input
                className="input-add"
                placeholder="Product..."
                onChange={(event) => {
                  setNewProduct(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 4)}
              />
            </div>

            <div ref={refOne} className="input-calendar">
              {open && (
                <Calendar
                  date={new Date()}
                  onChange={handleSelect}
                  className="calendarElement"
                />
              )}
            </div>

            <div
              className={
                (editingContainer === 5 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Inventory List.Quantity")}</label>
              <input
                className="input-add"
                type="number"
                placeholder="Quantity..."
                onChange={(event) => {
                  setNewQuantity(event.target.value);
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
              <label className="">{t("Inventory List.Total Cost")}</label>
            <input
              className="input-add"
              type="number"
              placeholder="Total Cost..."
              onChange={(event) => {
                setNewCost(event.target.value);
              }}
              onClick={() => setEditingContainer(() => 6)}
            />
            </div>

            <div
              className={
                (editingContainer === 7 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Inventory List.Remark")}</label>
            <input
              className="input-add"
              placeholder="Remark..."
              onChange={(event) => {
                setNewRemark(event.target.value);
              }}
              onClick={() => setEditingContainer(() => 7)}
            />
            </div>

            <div className="text-center" style={{ gridColumn: "1/3" }}>
              <button className="btn-create" onClick={createUser}>
                Create Inventory
              </button>
              <NavLink to="/mainmeun/inventory" className="btn-delete">
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateInventory;
