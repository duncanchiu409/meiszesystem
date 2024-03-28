import React from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
// import * as SiIcons from 'react-icons/si'
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";
import * as BsIcons from "react-icons/bs";

const SidebarData = [
  {
    title: "Financial Management",
    path: "financial/invoice",
    icon: <FaIcons.FaCalculator />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Invoice",
        path: "financial/invoice",
        icon: <FaIcons.FaFileInvoice />,
      },
      {
        title: "Payment Request",
        path: "financial/paymentrequest",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Financial Statement",
        path: "financial/FS",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Account",
    path: "account/accountpayable",
    icon: <AiIcons.AiFillCalculator />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Account Payable",
        path: "account/accountpayable",
        icon: <BsIcons.BsBank2 />,
      },
      {
        title: "Account Receivable",
        path: "account/accountreceivable",
        icon: <BsIcons.BsBank2 />,
      },
      {
        title: "Income Statement",
        path: "account/incomestatement",
        icon: <BsIcons.BsBank2 />,
      },
      {
        title: "Balance Sheet",
        path: "account/balancesheet",
        icon: <BsIcons.BsBank2 />,
      },
      {
        title: "General Ledger",
        path: "account/generalledger",
        icon: <BsIcons.BsBank2 />,
      },
    ],
  },
  {
    title: "Sale",
    path: "sale/quotation",
    icon: <MdIcons.MdPointOfSale />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Quotation",
        path: "sale/quotation",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Contract",
        path: "sale/contract",
        icon: <FaIcons.FaFileInvoice />,
      },
      {
        title: "Delivery Note",
        path: "sale/deliverynote",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Advance Invoice",
        path: "sale/advanceinvoice",
        icon: <FaIcons.FaFileInvoice />,
      },
      {
        title: "Sale Analysis",
        path: "sale/saleanalysis",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Customers",
    path: "customer/clients/",
    icon: <FaIcons.FaUsers />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Clients",
        path: "customer/clients/",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Clients Analysis",
        path: "customer/ca/",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Membership",
        path: "customer/member/",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Promotion",
        path: "customer/promotion/",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Clients Purchase",
        path: "customer/cp/",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Products Management",
    path: "product",
    icon: <FaIcons.FaCartPlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Products",
    path: "product",
    icon: <FaIcons.FaCartPlus />,
      },
      {
        title: "ProductionOrder",
        path: "product/po",
        icon: <IoIcons.IoIosPaper />,
      },

    ],
  },
  {
    title: "Service Management",
    path: "service",
    icon: <FaIcons.FaCartPlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Service",
        path: "service",
        icon: <FaIcons.FaCartPlus />,
      },
      {
        title: "Purchase Service",
        path: "service/psp",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Reservation",
        path: "reservation",
        icon: <FaIcons.FaUsers />,
      },
    ],
  },
  {
    title: "Inventory",
    path: "inventory",
    icon: <BiIcons.BiSolidPurchaseTagAlt />,
  },
  {
    title: "Stock Detail",
    path: "stockdetail",
    icon: <BiIcons.BiSolidPurchaseTagAlt />,
  },
  {
    title: "Purchase",
    path: "purchase/pp",
    icon: <BiIcons.BiSolidPurchaseTagAlt />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Purchase Planning",
        path: "purchase/pp",
        icon: <BiIcons.BiSolidPurchaseTagAlt />,
      },
      {
        title: "Purchase Budgeting",
        path: "purchase/pb",
        icon: <BiIcons.BiSolidPurchaseTagAlt />,
      },
      {
        title: "Purchase Order",
        path: "purchase/po",
        icon: <BiIcons.BiSolidPurchaseTagAlt />,
      },
      {
        title: "Supplier",
        path: "customer/supplier/",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "HR",
    path: "hr/staff",
    icon: <GiIcons.GiHumanPyramid />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Staff",
        path: "hr/staff",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Salary and MPF Report",
        path: "hr/sr",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Shift Pattern",
        path: "hr/sp",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Reservation",
    path: "reservation",
    icon: <FaIcons.FaUsers />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Reservation",
        path: "reservation",
        icon: <FaIcons.FaUsers />,
      },
      {
        title: "Calender",
        path: "calender",
        icon: <FaIcons.FaUsers />,
      },
    ],
  },
  {
    title: "Share Drive",
    path: "sharedrive",
    icon: <FaIcons.FaUsers />,
  },
  {
    title: "Setting",
    path: "setting/us",
    icon: <AiIcons.AiFillSetting />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "User Setting",
        path: "setting/us",
        icon: <FaIcons.FaUsers />,
      },
      {
        title: "Company Information",
        path: "setting/ci",
        icon: <FaIcons.FaUsers />,
      },
      
    ],
  },
];

export default SidebarData;
