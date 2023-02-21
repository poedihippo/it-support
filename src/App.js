import { Route, useLocation, useHistory } from "react-router-dom";

// Hapus di bawah ini
import RunGetss from "./component/master/aTestpdf";
import HardwareInventoryAssign from "./component/master/HardwareInventoryAssignOld";
// Hapus di atas ini
// import RequireAuth from "./logic/require";
import AuthenticationService from "./logic/AuthenticationService";
import FormPage from "./component/FormPage";
import TopMenu from "./component/public/TopMenu";
import SideMenu from "./component/public/SideMenu";
import TablePage from "./component/TablePage";
import MailingList from "./component/email/MailingList";
import MailingListMember from "./component/email/MailingListMember";
import PublicEmail from "./component/email/PublicEmail";
import PublicEmailAdmin from "./component/email/PublicEmailAdmin";
import UserList from "./component/email/UserList";
import UserView from "./component/email/UserView";
import FAQ from "./component/public-page/FAQ";
import FAQPreview from "./component/public-page/FAQPreview";
import TipsAndTrick from "./component/public-page/TipsAndTrick";
import TipsAndTrickPreview from "./component/public-page/TipsAndTrickPreview";
import MediaAndDownload from "./component/public-page/MediaAndDownload";
import MediaAndDownloadPreview from "./component/public-page/MediaAndDownloadPreview";
import SupplierVendor from "./component/master/SupplierVendor";
import HardwareSpec from "./component/master/HardwareSpec";
import HardwareInventory from "./component/master/HardwareInventory";
import React, { useEffect } from "react";
// import ConnectionLost from "./component/public/ConnectionLost";
import HardwareInventoryAddStock from "./component/master/HardwareInventoryAddStock";
import Software from "./component/master/Software";
import FormPermintaan from "./component/master/FormPermintaan";
import TicketAdd from "./component/Ticket/TicketAdd";
import Ticket from "./component/Ticket/Ticket";
import MyInventory from "./component/user/MyInventory";
import PerbaikanHardware from "./component/master/PerbaikanHardware";
import TestPDF from "./component/email/TestPDF";
import TestEmail from "./component/email/TestEmail";
import HardwareInventoryView from "./component/master/HardwareInventoryView";
import Logout from "./component/Logout";
import SoftwareLisenceAssignTo from "./component/master/SoftwareLisenceAssignTo";
function App() {
 
  const { pathname, search } = useLocation();
  const history = useHistory();
  const userLogin = AuthenticationService.getLocalCredential();
 
  useEffect( () => {
    const runParams = async () => {
      if (pathname === "/authentication") {
        const params = new URLSearchParams(search);
        const login_token = params.get("login_token");
        const userData = await AuthenticationService.authentication(login_token);
        history.push("/");
      }
    }
    runParams()
    
  }, []);
  // const isTrue = true
  return (
    <div className="App">
     (
       
        <React.Fragment>
          <TopMenu />
          <SideMenu user={userLogin} />

          <React.Fragment>
          <Route exact path="/" component={UserView} />
           
            <Route exact path="/rahasia-rahasia" component={RunGetss} />
            <Route exact path="/testpdf" component={TestPDF} />
            <Route exact path="/testemail" component={TestEmail} />
            <Route exact path="/formpage" component={FormPage} />
            <Route exact path="/tablepage" component={TablePage} />
            <Route exact path="/mailinglist" component={MailingList} />
            <Route
              exact
              path="/mailinglistmember/:id"
              component={MailingListMember}
            />
            <Route exact path="/publicemail" component={PublicEmail} />
            <Route
              exact
              path="/publicemailadmin/:id"
              component={PublicEmailAdmin}
            />
            <Route exact path="/userlist" component={UserList} />
            <Route exact path="/userview/:id" component={UserView} />

            <Route exact path="/faq" component={FAQ} />
            <Route exact path="/faq-preview" component={FAQPreview} />
            <Route exact path="/tipsandtrick" component={TipsAndTrick} />
            <Route
              exact
              path="/tipsandtrick-preview"
              component={TipsAndTrickPreview}
            />
            <Route
              exact
              path="/mediaanddownload"
              component={MediaAndDownload}
            />
            <Route
              exact
              path="/mediaanddownload-preview"
              component={MediaAndDownloadPreview}
            />
            <Route exact path="/suppliervendor" component={SupplierVendor} />

            <Route exact path="/hardware-spec" component={HardwareSpec} />
            <Route
              exact
              path="/hardware-inventori/:id"
              component={HardwareInventory}
            />
            <Route exact path="/hardware-inventori-assign-to/:id" component={HardwareInventoryAssign}/>
            <Route
              exact
              path="/hardware-inventori-view/:id"
              component={HardwareInventoryView}
            />
            <Route
              exact
              path="/hardware-inventori-add-stock/:id"
              component={HardwareInventoryAddStock}
            />
            <Route exact path="/software" component={Software} />
            <Route exact path="/software-lisence-assign-to/:id" component={SoftwareLisenceAssignTo}/>
            <Route exact path="/form-permintaan" component={FormPermintaan} />
            <Route
              exact
              path="/perbaikan-hardware"
              component={PerbaikanHardware}
            />
            <Route exact path="/ticket-list">
              <Ticket user="ADMIN" />
            </Route>
            <Route exact path="/my-ticket-list">
              <Ticket user="USER" />
            </Route>
            <Route exact path="/my-staff-ticket-list">
              <Ticket user="SUPERVISOR" />
            </Route>

            <Route exact path="/ticket-open" component={TicketAdd} />
            <Route exact path="/my-inventory" component={MyInventory} />
            <Route exact path="/logout" component={Logout} />
           
          </React.Fragment>
        </React.Fragment>
      
      ) 
    </div>
  );
}

export default App;
// authService.token !== "" && authService.token !== undefined && authService.token !== null
//       ?userLogin.id !== undefined ?
