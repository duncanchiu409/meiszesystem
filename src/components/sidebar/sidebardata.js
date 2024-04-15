import React from "react";
import { useTranslation } from "react-i18next";
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
    translation: "sidebar.Financial Management.Financial Management",
    icon: <FaIcons.FaCalculator />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Invoice",
        path: "financial/invoice",
        translation: "sidebar.Financial Management.Invoice",
        icon: <FaIcons.FaFileInvoice />,
      },
      {
        title: "Payment Request",
        path: "financial/paymentrequest",
        translation: "sidebar.Financial Management.Payment Request",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Financial Statement",
        path: "financial/FS",
        translation: "sidebar.Financial Management.Financial Statement",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Account",
    translation: "sidebar.Account.Account",
    icon: <AiIcons.AiFillCalculator />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Account Payable",
        path: "account/accountpayable",
        translation: "sidebar.Account.Account Payable",
        icon: <BsIcons.BsBank2 />,
      },
      {
        title: "Account Receivable",
        path: "account/accountreceivable",
        translation: "sidebar.Account.Account Receivable",
        icon: <BsIcons.BsBank2 />,
      },
      {
        title: "Income Statement",
        path: "account/incomestatement",
        translation: "sidebar.Account.Income Statement",
        icon: <BsIcons.BsBank2 />,
      },
      {
        title: "Balance Sheet",
        path: "account/balancesheet",
        translation: "sidebar.Account.Balance Sheet",
        icon: <BsIcons.BsBank2 />,
      },
      {
        title: "General Ledger",
        path: "account/generalledger",
        translation: "sidebar.Account.General Ledger",
        icon: <BsIcons.BsBank2 />,
      },
    ],
  },
  {
    title: "Sale",
    translation: "sidebar.Sale.Sale",
    icon: <MdIcons.MdPointOfSale />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Quotation",
        path: "sale/quotation",
        translation: "sidebar.Sale.Quotation",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Contract",
        path: "sale/contract",
        translation: "sidebar.Sale.Contract",
        icon: <FaIcons.FaFileInvoice />,
      },
      {
        title: "Delivery Note",
        path: "sale/deliverynote",
        translation: "sidebar.Sale.Delivery Note",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Advance Invoice",
        path: "sale/advanceinvoice",
        translation: "sidebar.Sale.Advance Invoice",
        icon: <FaIcons.FaFileInvoice />,
      },
      {
        title: "Sale Analysis",
        path: "sale/saleanalysis",
        translation: "sidebar.Sale.Sale Analysis",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Customers",
    translation: "sidebar.Customers.Customers",
    icon: <FaIcons.FaUsers />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Clients",
        path: "customer/clients/",
        translation: "sidebar.Customers.Clients",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Clients Analysis",
        path: "customer/ca/",
        translation: "sidebar.Customers.Clients Analysis",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Membership",
        path: "customer/member/",
        translation: "sidebar.Customers.Membership",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Promotion",
        path: "customer/promotion/",
        translation: "sidebar.Customers.Promotion",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Clients Purchase",
        path: "customer/cp/",
        translation: "sidebar.Customers.Clients Purchase",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Products Management",
    translation: "sidebar.Products Management.Products Management",
    icon: <FaIcons.FaCartPlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Products",
        path: "product",
        translation: "sidebar.Products Management.Products",
        icon: <FaIcons.FaCartPlus />,
      },
      {
        title: "Production Order",
        path: "product/po",
        translation: "sidebar.Products Management.Production Order",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Service Management",
    translation: "sidebar.Service Management.Service Management",
    icon: <FaIcons.FaCartPlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Service",
        path: "service",
        translation: "sidebar.Service Management.Service",
        icon: <FaIcons.FaCartPlus />,
      },
      {
        title: "Purchase Service",
        path: "service/psp",
        translation: "sidebar.Service Management.Purchase Service",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Reservation",
        path: "reservation",
        translation: "sidebar.Service Management.Reservation",
        icon: <FaIcons.FaUsers />,
      },
    ],
  },
  {
    title: "Inventory",
    translation: "sidebar.Inventory.Inventory",
    path: "inventory",
    icon: <BiIcons.BiSolidPurchaseTagAlt />,
  },
  {
    title: "Stock Detail",
    translation: "sidebar.Stock Detail.Stock Detail",
    path: "stockdetail",
    icon: <BiIcons.BiSolidPurchaseTagAlt />,
  },
  {
    title: "Purchase",
    translation: "sidebar.Purchase.Purchase",
    icon: <BiIcons.BiSolidPurchaseTagAlt />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Purchase Planning",
        path: "purchase/pp",
        translation: "sidebar.Purchase.Purchase Planning",
        icon: <BiIcons.BiSolidPurchaseTagAlt />,
      },
      {
        title: "Purchase Budgeting",
        path: "purchase/pb",
        translation: "sidebar.Purchase.Purchase Budgeting",
        icon: <BiIcons.BiSolidPurchaseTagAlt />,
      },
      {
        title: "Purchase Order",
        path: "purchase/po",
        translation: "sidebar.Purchase.Purchase Order",
        icon: <BiIcons.BiSolidPurchaseTagAlt />,
      },
      {
        title: "Supplier",
        path: "customer/supplier/",
        translation: "sidebar.Purchase.Supplier",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "HR",
    translation: "sidebar.HR.HR",
    icon: <GiIcons.GiHumanPyramid />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Staff",
        path: "hr/staff",
        translation: "sidebar.HR.Staff",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Salary and MPF Report",
        path: "hr/sr",
        translation: "sidebar.HR.Salary and MPF Report",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Shift Pattern",
        path: "hr/sp",
        translation: "sidebar.HR.Shift Pattern",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Reservation",
    translation: "sidebar.Reservation.Reservation",
    icon: <FaIcons.FaUsers />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Reservation",
        path: "reservation",
        translation: "sidebar.Reservation.Reservation",
        icon: <FaIcons.FaUsers />,
      },
      {
        title: "Calender",
        path: "calender",
        translation: "sidebar.Reservation.Calendar",
        icon: <FaIcons.FaUsers />,
      },
    ],
  },
  {
    title: "Share Drive",
    path: "sharedrive",
    translation: "sidebar.Share Drive.Share Drive",
    icon: <FaIcons.FaUsers />,
  },
  {
    title: "Setting",
    translation: "sidebar.Setting.Setting",
    icon: <AiIcons.AiFillSetting />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "User Setting",
        path: "setting/us",
        translation: "sidebar.Setting.User Setting",
        icon: <FaIcons.FaUsers />,
      },
      {
        title: "Company Information",
        path: "setting/ci",
        translation: "sidebar.Setting.Company Information",
        icon: <FaIcons.FaUsers />,
      },
    ],
  },
];

export default SidebarData;
