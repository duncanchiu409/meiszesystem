import React, { useState, useEffect, useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { db } from "../../../firebase";
import { onValue, ref } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import { format } from "date-fns";
import "../../../App.css";

const BalanceSheet = () => {
    const [search, setSearch] = useState("");
    const [BS, setBS] = useState([]);
  
    const [newShowAsset, setNewShowAsset] = useState([]);
    const [newShowLiability, setNewShowLiability] = useState([]);
    const [newShowSE, setNewShowSE] = useState([]);
    const [newDate, setNewDate] = useState("");
  
  
    const convertMonth = (month) => {
      if (month === "01") {
        return "Jan";
      } else if (month === "02") {
        return "Feb";
      } else if (month === "03") {
        return "Mar";
      } else if (month === "04") {
        return "Apr";
      } else if (month === "05") {
        return "May";
      } else if (month === "06") {
        return "Jun";
      } else if (month === "07") {
        return "Jul";
      } else if (month === "08") {
        return "Aug";
      } else if (month === "09") {
        return "Sep";
      } else if (month === "10") {
        return "Oct";
      } else if (month === "11") {
        return "Nov";
      } else if (month === "12") {
        return "Dec";
      }
    };
  
  
    var dateParts = newDate.split("/");
  
    var year = dateParts[2];
  
    var month = dateParts[1];
  
    var monthString = convertMonth(month);
  
    useEffect(() => {
  
      setNewDate(format(new Date(), "dd/MM/yyyy"));
  
      const getBS = () => {
        onValue(ref(db, "BalanceSheet"), (snapshot) => {
          if (snapshot.val() !== null) {
            setBS({ ...snapshot.val() });
          }
        });
      };
  
      getBS();
    }, []);
  
    const tableRef = useRef(null);
  
  
  
  
    useEffect(() => {
      
      var monthString = convertMonth(month);
  
        onValue(
          ref(db, `annualasset/${year}/${monthString}/`),
          (snapshot) => {
            if (snapshot.val() !== null) {
              setNewShowAsset({ ...snapshot.val() });
            } else {
              setNewShowAsset({name:`${monthString}` , value: 0 });
            }
          }
        );
      
    }, [year, month]);
  
    useEffect(() => {
      
      var monthString = convertMonth(month);
  
        onValue(
          ref(db, `annualliability/${year}/${monthString}/`),
          (snapshot) => {
            if (snapshot.val() !== null) {
              setNewShowLiability({ ...snapshot.val() });
            } else {
              setNewShowLiability({name:`${monthString}` , value: 0 });
            }
          }
        );
      
    }, [year, month]);
  
    useEffect(() => {
      
      var monthString = convertMonth(month);
  
        onValue(
          ref(db, `annualse/${year}/${monthString}/`),
          (snapshot) => {
            if (snapshot.val() !== null) {
              setNewShowSE({ ...snapshot.val() });
            } else {
              setNewShowSE({name:`${monthString}` , value: 0 });
            }
          }
        );
      
    }, [year, month]);
  
  
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
              <h1>Balance Sheet</h1>
              <DownloadTableExcel
                filename="Balance Sheet table"
                sheet="Balance Sheet"
                currentTableRef={tableRef.current}
              >
                <button className="btn-create"> Export Excel </button>
              </DownloadTableExcel>
            </div>
            <table className="styled-table" ref={tableRef}>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Date</th>
                  <th style={{ textAlign: "center" }}>Category Of Account</th>
                  <th style={{ textAlign: "center" }}>Description</th>
                  <th style={{ textAlign: "center" }}>Total</th>

                </tr>
              </thead>
              <tbody>
                {Object.keys(BS)
                  .filter((id) => {
                    return search.toLowerCase() === ""
                      ? BS[id]
                      : BS[id].no.toLowerCase().includes(search);
                  })
                  .sort((a, b) => (BS[a].no > BS[b].no ? 1 : -1))
                  .map((id) => {
                    return (
                      <tr>
                        <td style={{ textAlign: "center" }}>{BS[id].date}</td>
                        <td style={{ textAlign: "center" }}>{BS[id].coa}</td>
                        <td style={{ textAlign: "center" }}>{BS[id].description}</td>
                        <td style={{ textAlign: "center" }}>${BS[id].amount}</td>
                        
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "50px",
              }}
            >
              <h5>{`${monthString}`}</h5>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
  
              <div>
                <h5>Asset</h5>
                <span className="income">${`${newShowAsset.value}`}</span>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div>
                <h5>Liability</h5>
                <span className="expense">${`${newShowLiability.value}`}</span>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div>
                <h5>Shareholders'Equity</h5>
                <span className="balance">${`${newShowSE.value}`}</span>
              </div>
            </div>
  
          </div>
        </div>
      </div>
    );
}

export default BalanceSheet
