import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import { ref, set, onValue } from "firebase/database";
import { useTranslation } from "react-i18next";

const UpdateService = () => {
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newRemark, setNewRemark] = useState("");
  const [Service, setService] = useState([]);
  const { t } = useTranslation();
  const [editingContainer, setEditingContainer] = useState(0);

  const { id } = useParams();

  const navigate = useNavigate();

  const createUser = () => {
    set(ref(db, "Service/" + id), {
      name: newName,
      description: newDescription,
      remark: newRemark,
    });

    navigate("/mainmeun/service");
  };

  useEffect(() => {
    const getService = () => {
      onValue(ref(db, "Service/" + id), (snapshot) => {
        if (snapshot.val() !== null) {
          setService({ ...snapshot.val() });
        }
      });
    };
    getService();
    setNewName(Service.name);
    setNewDescription(Service.description);
    setNewRemark(Service.remark);
  }, [id, Service.name, Service.description, Service.remark]);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <h1>
            {t("Table Actions.edit") +
              " " +
              t("sidebar.Service Management.Service")}
          </h1>

          <form className="input-form">
            <div
              className={
                (editingContainer === 1 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Service List.Service Name")}</label>
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
              <label className="">{t("Service List.Description")}</label>
              <input
                className="input-add"
                placeholder="Description..."
                value={newDescription || ""}
                onChange={(event) => {
                  setNewDescription(event.target.value);
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
              <label className="">{t("Service List.Remark")}</label>
              <input
                className="input-add"
                placeholder="Remark..."
                value={newRemark || ""}
                onChange={(event) => {
                  setNewRemark(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 2)}
              />
            </div>

            <div className="text-center" style={{ gridColumn: "1/3" }}>
              <button className="btn-create" onClick={createUser}>
                Edit Service
              </button>
              <NavLink to="/mainmeun/service" className="btn-delete">
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateService;
