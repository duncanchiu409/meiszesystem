import React, {useState, useEffect} from 'react';
import {db} from "../../firebase";
import {onValue, ref} from 'firebase/database'
import SingleCard from '../../components/SingleCard';
import '../../App.css'
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const SaleAnalysis = () => {
    const [sales, setSales] = useState({});
    const [Purchase, setPurchase] = useState({});
    const [Stock, setStock] = useState({});
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
      const getSales = () => {
           onValue(ref(db, `annualincome/${year}/${monthString}`) , (snapshot) => {
      
            if(snapshot.val() !==null){
              setSales({...snapshot.val()})
            }else {
              setSales({name:`${monthString}` , value: 0 });
            }
          });
        }
      
         getSales();
            
            
        },[year, monthString]);
  
        useEffect(() => {
          const getPurchase = () => {
               onValue(ref(db, 'AdvanceInvoice/') , (snapshot) => {
          
                if(snapshot.val() !==null){
                  setPurchase({...snapshot.val()})
                }
              });
            }
          
             getPurchase();
                
                
            },[]);
  
    useEffect(() => {
      const getStock = () => {
           onValue(ref(db, 'customers') , (snapshot) => {
      
            if(snapshot.val() !==null){
              setStock({...snapshot.val()})
            }
          });
        }
            
        getStock();
            
        },[]);
  
        const salesObj = {
          title: `${monthString} Sale Figures`,
          totalNumber: `$${parseInt(sales.value)}`,
          icon: "ri-money-dollar-circle-line",
        };
        
        const PurchaseObj = {
          title: "Sale",
          totalNumber: Object.keys(Purchase).length,
          icon: "ri-briefcase-4-fill",
        };
        
        const StockObj = {
        title: "Memeber",
        totalNumber: Object.keys(Stock).length,
        icon: "ri-store-3-line", 
        };


  
    return (
      <div className="main">
        <div
          className="App"
          style={{ width: "100%", padding: "100px", height: "1000px" }}
        >
          <div style={{ padding: "0px 215px" }} className="container">
            <div className="dashboard">
              <div className="dashboard_wrapper">
                <div className="dashboard_cards">
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
}

export default SaleAnalysis
