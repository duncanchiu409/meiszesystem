import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Sidebar from "./components/sidebar/sidebar";
import Invoice from "./pages/Financial/Invoice/invoice";
import AddEditInvoice from "./pages/Financial/Invoice/AddEditInvoice";
import ViewInvoice from "./pages/Financial/Invoice/ViewInvoice";
import UpdateInvoice from "./pages/Financial/Invoice/UpdateInvoice";
import FinancialStatement from "./pages/Financial/FinancialStatement/FinancialStatement";
import AddEditFinancialStatement from "./pages/Financial/FinancialStatement/AddEditFinancialStatement";
import UpdateFinancialStatement from "./pages/Financial/FinancialStatement/UpdateFinancialStatement";
import ViewFinancialStatement from "./pages/Financial/FinancialStatement/ViewFinancialStatement";
import AddEditBuget from "./pages/Financial/FinancialStatement/AddEditBuget";
import AdvanceInvoice from "./pages/Sale/AdvanceInvoice/AdvanceInvoice";
import AddEditAdvanceInvoice from "./pages/Sale/AdvanceInvoice/AddEditAdvanceInvoice";
import UpdateAdvanceInvoice from "./pages/Sale/AdvanceInvoice/UpdateAdvanceInvoice";
import ViewAdvanceInvoice from "./pages/Sale/AdvanceInvoice/ViewAdvanceInvoice";
import Contract from "./pages/Sale/Contract/Contract";
import AddEditContract from "./pages/Sale/Contract/AddEditContract";
import UpdateContract from "./pages/Sale/Contract/UpdateContract";
import ViewContract from "./pages/Sale/Contract/ViewContract";
import DeliveryNote from "./pages/Sale/DeliveryNote/DeliveryNote";
import AddEditDeliveryNote from "./pages/Sale/DeliveryNote/AddEditDeliveryNote";
import UpdateDeliveryNote from "./pages/Sale/DeliveryNote/UpdateDeliveryNote";
import ViewDeliveryNote from "./pages/Sale/DeliveryNote/ViewDeliveryNote";
import AccountPayable from "./pages/Account/AccountPayable/AccountPayable";
import AddEditAccountPayable from "./pages/Account/AccountPayable/AddEditAccountPayable";
import UpdateAccountPayable from "./pages/Account/AccountPayable/UpdateAccountPayable";
import ViewAccountPayable from "./pages/Account/AccountPayable/ViewAccountPayable";
import AccountReceivable from "./pages/Account/AccountReceivable/AccountReceivable";
import AddEditAccountReceivable from "./pages/Account/AccountReceivable/AddEditAccountReceivable";
import UpdateAccountReceivable from "./pages/Account/AccountReceivable/UpdateAccountReceivable";
import ViewAccountReceivable from "./pages/Account/AccountReceivable/ViewAccountReceivable";
import IncomeStatement from "./pages/Account/IncomeStatement/IncomeStatement";
import BalanceSheet from "./pages/Account/BalanceSheet/BalanceSheet";
import GeneralLedger from "./pages/Account/GeneralLedger/GeneralLedger";
import AddEditGeneralLedger from "./pages/Account/GeneralLedger/AddEditGeneralLedger";
import UpdateGeneralLedger from "./pages/Account/GeneralLedger/UpdateGeneralLedger";
import ViewGeneralLedger from "./pages/Account/GeneralLedger/ViewGeneralLedger";
import Quotation from "./pages/Sale/Quotation/Quotation";
import AddEditQuotation from "./pages/Sale/Quotation/AddEditQuotation";
import UpdateQuotation from "./pages/Sale/Quotation/UpdateQuotation";
import ViewQuotation from "./pages/Sale/Quotation/ViewQuotation";
import SaleAnalysis from "./pages/Sale/SaleAnalysis";
import PaymentRequest from "./pages/Financial/PaymentRequest/PaymentRequest";
import AddEditPaymentRequest from "./pages/Financial/PaymentRequest/AddEditPaymentRequest";
import UpdatePaymentRequest from "./pages/Financial/PaymentRequest/UpdatePaymentRequest";
import ViewPaymentRequest from "./pages/Financial/PaymentRequest/ViewPaymentRequest";
import UpdateCustomer from "./pages/Customer/Clients/UpdateCustomer";
import AddEditCustomer from "./pages/Customer/Clients/AddEditCustomer";
import Customer from "./pages/Customer/Clients/Customer";
import ViewCustomer from "./pages/Customer/Clients/ViewCustomer";
import Supplier from "./pages/Customer/Supplier/Supplier";
import AddEditSupplier from "./pages/Customer/Supplier/AddEditSupplier";
import UpdateSupplier from "./pages/Customer/Supplier/UpdateSupplier";
import ViewSupplier from "./pages/Customer/Supplier/ViewSupplier";
import Product from "./pages/Product/Product";
import AddEditProduct from "./pages/Product/AddEditProduct";
import UpdateProduct from "./pages/Product/UpdateProduct";
import ViewProduct from "./pages/Product/ViewProduct";
import PO from "./pages/Product/ProductionOrder/PO";
import Service from "./pages/Service/Service";
import AddEditService from "./pages/Service/AddEditService";
import UpdateService from "./pages/Service/UpdateService";
import ViewService from "./pages/Service/ViewService";
import PSP from "./pages/Service/PSP/PSP";
import AddEditPSP from "./pages/Service/PSP/AddEditPSP";
import Inventory from "./pages/Inventory/Inventory";
import AddEditInventory from "./pages/Inventory/AddEditInventory";
import UpdateInventory from "./pages/Inventory/UpdateInventory";
import ViewInventory from "./pages/Inventory/ViewInventory";
import StockDetail from "./pages/Inventory/StockDetail";
import PurchasePlanning from "./pages/Purchase/PurchasePlanning/PurchasePlanning";
import AddEditPurchasePlanning from "./pages/Purchase/PurchasePlanning/AddEditPurchasePlanning";
import UpdatePurchasePlanning from "./pages/Purchase/PurchasePlanning/UpdatePurchasePlanning";
import UpdatePurchaseBudgeting from "./pages/Purchase/PurchaseBudgeting/UpdatePurchaseBudgeting";
import Staff from "./pages/HR/Staff/Staff";
import AddEditStaff from "./pages/HR/Staff/AddEditStaff";
import UpdateStaff from "./pages/HR/Staff/UpdateStaff";
import ViewStaff from "./pages/HR/Staff/ViewStaff";
import SP from "./pages/HR/SP/SP";
import AddEditSP from "./pages/HR/SP/AddEditSP";
import UpdateSP from "./pages/HR/SP/UpdateSP";
import ViewSP from "./pages/HR/SP/ViewSP";
import SR from "./pages/HR/SR/SR";
import AddEditSR from "./pages/HR/SR/AddEditSR";
import UpdateSR from "./pages/HR/SR/UpdateSR";
import ViewSR from "./pages/HR/SR/ViewSR";

import Reservation from "./pages/Reservation/Resevation";
import AddEditReservation from "./pages/Reservation/AddEditReservation";
import ShareDrive from "./pages/ShareDrive/ShareDrive";

import Calender from "./pages/Reservation/Calender";
import PurchaseOrder from "./pages/Purchase/PurchaseOrder/PurchaseOrder";
import PurchaseBudgeting from "./pages/Purchase/PurchaseBudgeting/PurchaseBudgeting";
import User from "./pages/Setting/User/User";
import AddEditUser from "./pages/Setting/User/AddEditUser";
import UpdateUser from "./pages/Setting/User/UpdateUser";
import CI from "./pages/Setting/CI/CI";
import UpdateCI from "./pages/Setting/CI/UpdateCI";

import ClientsPurchase from "./pages/Customer/ClientsPurchase/ClientsPurchase";
import AddEditClientsPurchase from "./pages/Customer/ClientsPurchase/AddEditClientsPurchase";

import Promotion from "./pages/Customer/Promotion/promotion";
import Member from "./pages/Customer/Member/Member";
import AddEditMember from "./pages/Customer/Member/AddEditMember";
import UpdateMember from "./pages/Customer/Member/UpdateMember";
import ClientsAnalysis from "./pages/Customer/ClientsAnalysis";
import i18n from "./i18n";

import CouponStore from './pages/Coupon/CouponStore'
import Record from './pages/Coupon/Record'
import StoreSetting from './pages/Coupon/StoreSetting'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/mainmeun" element={<Sidebar />}>
            <Route index element={<Invoice />} />
            <Route path="financial/invoice" element={<Invoice />} />
            <Route path="financial/invoice/add" element={<AddEditInvoice />} />
            <Route
              path="financial/invoice/update/:id"
              element={<UpdateInvoice />}
            />
            <Route
              path="financial/invoice/view/:id"
              element={<ViewInvoice />}
            />

            <Route path="financial/FS" element={<FinancialStatement />} />
            <Route
              path="financial/FS/add"
              element={<AddEditFinancialStatement />}
            />
            <Route
              path="financial/FS/update/:id"
              element={<UpdateFinancialStatement />}
            />
            <Route
              path="financial/FS/view/:id"
              element={<ViewFinancialStatement />}
            />
            <Route path="financial/FS/buget" element={<AddEditBuget />} />

            <Route path="sale/advanceinvoice" element={<AdvanceInvoice />} />
            <Route
              path="sale/advanceinvoice/add"
              element={<AddEditAdvanceInvoice />}
            />
            <Route
              path="sale/advanceinvoice/update/:id"
              element={<UpdateAdvanceInvoice />}
            />
            <Route
              path="sale/advanceinvoice/view/:id"
              element={<ViewAdvanceInvoice />}
            />

            <Route path="sale/contract" element={<Contract />} />
            <Route path="sale/contract/add" element={<AddEditContract />} />
            <Route
              path="sale/contract/update/:id"
              element={<UpdateContract />}
            />
            <Route path="sale/contract/view/:id" element={<ViewContract />} />

            <Route path="account/accountpayable" element={<AccountPayable />} />
            <Route
              path="account/accountpayable/add"
              element={<AddEditAccountPayable />}
            />
            <Route
              path="account/accountpayable/update/:id"
              element={<UpdateAccountPayable />}
            />
            <Route
              path="account/accountpayable/view/:id"
              element={<ViewAccountPayable />}
            />

            <Route
              path="account/accountreceivable"
              element={<AccountReceivable />}
            />
            <Route
              path="account/accountreceivable/add"
              element={<AddEditAccountReceivable />}
            />
            <Route
              path="account/accountreceivable/update/:id"
              element={<UpdateAccountReceivable />}
            />
            <Route
              path="account/accountreceivable/view/:id"
              element={<ViewAccountReceivable />}
            />

            <Route
              path="account/incomestatement"
              element={<IncomeStatement />}
            />

            <Route path="account/balancesheet" element={<BalanceSheet />} />

            <Route path="account/generalledger" element={<GeneralLedger />} />
            <Route
              path="account/generalledger/add"
              element={<AddEditGeneralLedger />}
            />
            <Route
              path="account/generalledger/update/:id"
              element={<UpdateGeneralLedger />}
            />
            <Route
              path="account/generalledger/view/:id"
              element={<ViewGeneralLedger />}
            />

            <Route path="sale/quotation" element={<Quotation />} />
            <Route path="sale/quotation/add" element={<AddEditQuotation />} />
            <Route
              path="sale/quotation/update/:id"
              element={<UpdateQuotation />}
            />
            <Route path="sale/quotation/view/:id" element={<ViewQuotation />} />

            <Route path="sale/deliverynote" element={<DeliveryNote />} />
            <Route
              path="sale/deliverynote/add"
              element={<AddEditDeliveryNote />}
            />
            <Route
              path="sale/deliverynote/update/:id"
              element={<UpdateDeliveryNote />}
            />
            <Route
              path="sale/deliverynote/view/:id"
              element={<ViewDeliveryNote />}
            />

            <Route path="sale/saleanalysis" element={<SaleAnalysis />} />

            <Route
              path="financial/paymentrequest"
              element={<PaymentRequest />}
            />
            <Route
              path="financial/paymentrequest/add"
              element={<AddEditPaymentRequest />}
            />
            <Route
              path="financial/paymentrequest/update/:id"
              element={<UpdatePaymentRequest />}
            />
            <Route
              path="financial/paymentrequest/view/:id"
              element={<ViewPaymentRequest />}
            />

            <Route path="customer/clients/" element={<Customer />} />
            <Route path="customer/clients/add" element={<AddEditCustomer />} />
            <Route
              path="customer/clients/update/:id"
              element={<UpdateCustomer />}
            />
            <Route
              path="customer/clients/view/:id"
              element={<ViewCustomer />}
            />

            <Route path="customer/member/" element={<Member />} />
            <Route path="customer/member/add" element={<AddEditMember />} />
            <Route
              path="customer/member/update/:id"
              element={<UpdateMember />}
            />

            <Route path="customer/cp/" element={<ClientsPurchase />} />
            <Route
              path="customer/cp/add"
              element={<AddEditClientsPurchase />}
            />

            <Route path="customer/promotion/" element={<Promotion />} />
            <Route path="customer/ca/" element={<ClientsAnalysis />} />

            <Route path="customer/supplier/" element={<Supplier />} />
            <Route path="customer/supplier/add" element={<AddEditSupplier />} />
            <Route
              path="customer/supplier/update/:id"
              element={<UpdateSupplier />}
            />
            <Route
              path="customer/supplier/view/:id"
              element={<ViewSupplier />}
            />

            <Route path="product" element={<Product />} />
            <Route path="product/add" element={<AddEditProduct />} />
            <Route path="product/update/:id" element={<UpdateProduct />} />
            <Route path="product/view/:id" element={<ViewProduct />} />
            <Route path="product/po" element={<PO />} />

            <Route path="service" element={<Service />} />
            <Route path="service/add" element={<AddEditService />} />
            <Route path="service/update/:id" element={<UpdateService />} />
            <Route path="service/view/:id" element={<ViewService />} />

            <Route path="service/psp" element={<PSP />} />
            <Route path="service/psp/add" element={<AddEditPSP />} />

            <Route path="inventory" element={<Inventory />} />
            <Route path="inventory/add" element={<AddEditInventory />} />
            <Route path="inventory/update/:id" element={<UpdateInventory />} />
            <Route path="inventory/view/:id" element={<ViewInventory />} />

            <Route path="purchase/pp" element={<PurchasePlanning />} />
            <Route
              path="purchase/pp/add"
              element={<AddEditPurchasePlanning />}
            />
            <Route
              path="purchase/pp/update/:id"
              element={<UpdatePurchasePlanning />}
            />

            <Route path="purchase/pb" element={<PurchaseBudgeting />} />
            <Route
              path="purchase/pb/update/:id"
              element={<UpdatePurchaseBudgeting />}
            />

            <Route path="purchase/po" element={<PurchaseOrder />} />

            <Route path="stockdetail" element={<StockDetail />} />

            <Route path="HR/staff" element={<Staff />} />
            <Route path="HR/staff/add" element={<AddEditStaff />} />
            <Route path="HR/staff/update/:id" element={<UpdateStaff />} />
            <Route path="HR/staff/view/:id" element={<ViewStaff />} />

            <Route path="HR/SR" element={<SR />} />
            <Route path="HR/SR/add" element={<AddEditSR />} />
            <Route path="HR/SR/update/:id" element={<UpdateSR />} />
            <Route path="HR/SR/view/:id" element={<ViewSR />} />

            <Route path="HR/SP" element={<SP />} />
            <Route path="HR/SP/add" element={<AddEditSP />} />
            <Route path="HR/SP/update/:id" element={<UpdateSP />} />
            <Route path="HR/SP/view/:id" element={<ViewSP />} />

            <Route path="reservation" element={<Reservation />} />
            <Route path="reservation/add" element={<AddEditReservation />} />

            <Route path="sharedrive" element={<ShareDrive />} />

            <Route path="calender" element={<Calender />} />

            <Route path="coupon/couponstore" element={<CouponStore />} />
            <Route path="coupon/record" element={<Record />} />
            <Route path="coupon/storesetting" element={<StoreSetting />} />

            <Route path="setting/us" element={<User />} />
            <Route path="setting/us/add" element={<AddEditUser />} />
            <Route path="setting/us/update/:id" element={<UpdateUser />} />

            <Route path="setting/ci" element={<CI />} />
            <Route path="setting/ci/update/:id" element={<UpdateCI />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
