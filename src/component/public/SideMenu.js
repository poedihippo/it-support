import React, { useState } from "react";
import AuthenticationService from "./../../logic/AuthenticationService";
import ActiveMenu from "./SideMenu.data";
import { redirectLogout } from '../../config/redirect';
import { useLocation } from 'react-router-dom';
import RightIcon from '../../image/right-arrow.png'
function SideMenu({ user }) {
  const location = useLocation();
  const pathname = location.pathname.replace('/', '').toUpperCase();
  const [isLogout, setIsLogout] = useState(false)
  const userData = AuthenticationService.getLocalCredential();
  const activeMenu = ActiveMenu();
  const keyLocalStorage = ['token', 'email', 'id', 'profile_image', 'userName']
  const handleLogout = () => {
    const resRemove = keyLocalStorage.map((data, i) => {
      localStorage.removeItem(data);
      return i === keyLocalStorage.length - 1 && true
    });
    resRemove && setIsLogout(true)
  }
  return (
    <section>
      <aside id="leftsidebar" className="sidebar">
        <div className="user-info">
          <div className="image">
            <img
              src={
                userData.profile_image !== "0"
                  ? userData.profile_image
                  : "../../images/user.png"
              }
              width="48"
              height="48"
              alt="User"
            />
          </div>
          <div className="info-container">
            <div
              className="name"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {userData.userName}
            </div>
            <div className="email" >{userData.email}</div>
            <div className="btn-group user-helper-dropdown">
              <i
                className="material-icons"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
              >
                keyboard_arrow_down
              </i>
              <ul className="dropdown-menu pull-right">
                <li>
                  <a href="">
                    <i className="material-icons">person</i>Profile
                  </a>
                </li>
                <li role="separator" className="divider"></li>

                <li>
                  <a href="/my-inventory">
                    <i className="material-icons"></i>My Inventory
                  </a>
                  <a href={isLogout && redirectLogout} onClick={handleLogout}>
                    <i className="material-icons"></i>Logout
                  </a>
                </li>
                {/*    
                <li>
                  <a href="">
                    <i className="material-icons">group</i>Followers
                  </a>
                </li>             
                <li>
                  <a href="">
                    <i className="material-icons">shopping_cart</i>Sales
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="material-icons">favorite</i>Likes
                  </a>
                </li>
                <li role="separator" className="divider"></li>
                <li>
                  <a href="">
                    <i className="material-icons">input</i>Sign Out
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        <div className="menu">
          <ul className="list">
            <li className="header">MAIN NAVIGATION</li>
            {/* <li>
              <a href="../../index.html">
                <i className="material-icons">home</i>
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="../../pages/typography.html">
                <i className="material-icons">text_fields</i>
                <span>Typography</span>
              </a>
            </li>
            <li>
              <a href="../../pages/helper-classNamees.html">
                <i className="material-icons">layers</i>
                <span>Helper classNamees</span>
              </a>
            </li> */}
            <li>
              <a href="#" className={`menu-toggle ${activeMenu["EMAIL"]}`}>
                <i className="material-icons"></i>
                <span style={{color: activeMenu["EMAIL"] !== undefined ? "red" : "black" }}>Email </span>
              </a>
              <ul className="ml-menu">
                <li>
                  <a href="/mailinglist">
                    <span style={{fontWeight: pathname === "MAILINGLIST" && "bold"}}>{pathname === "MAILINGLIST" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} Mailing List</span>
                  </a>
                </li>
                <li>
                  <a href="/publicemail">
                    <span style={{fontWeight: pathname === "PUBLICEMAIL" && "bold"}}>{pathname === "PUBLICEMAIL" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} Public Email</span>
                  </a>
                </li>
                <li>
                  <a href="/userlist">
                    <span style={{fontWeight: pathname === "USERLIST" && "bold"}}>{pathname === "USERLIST" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} User List</span>
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href="#" className={`menu-toggle ${activeMenu["MASTER"]}`}>
                <i className="material-icons"></i>
                <span style={{color: activeMenu["MASTER"] !== undefined ? "red" : "black" }}>Master</span>
              </a>
              <ul className="ml-menu">
                <li>
                  <a href="#" className={`menu-toggle ${activeMenu["PUBLIC"]}`}>
                    <i className="material-icons"></i>
                    <span style={{color: activeMenu["PUBLICKPAGE"] !== undefined ? "red" : "black", fontWeight: activeMenu["PUBLICKPAGE"] !== undefined && "bold"}}>Public Page</span>
                  </a>
                  <ul className="ml-menu">
                    <li>
                      <a href="/faq">
                        <span style={{fontWeight: pathname === "FAQ" && "bold"}}>{pathname === "FAQ" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} FAQ</span>
                      </a>
                    </li>
                    <li>
                      <a href="/tipsandtrick">
                        <span style={{fontWeight: pathname === "TIPSANDTRICK" && "bold"}}>{pathname === "TIPSANDTRICK" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} Tips and Trick</span>
                      </a>
                    </li>
                    <li>
                      <a href="/mediaanddownload">
                        <span style={{fontWeight: pathname === "MEDIAANDDOWNLOAD" && "bold"}}>{pathname === "MEDIAANDDOWNLOAD" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} Media and Download</span>
                      </a>
                    </li>
                  </ul>
                </li>

                <li>
                  <a href="/suppliervendor">
                    <span style={{fontWeight: pathname === "SUPPLIERVENDOR" && "bold"}}>{pathname === "SUPPLIERVENDOR" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} Supplier/Vendor</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`menu-toggle ${activeMenu["HARDWARE"]}`}
                  >
                    <i className="material-icons"></i>
                    <span style={{color: activeMenu["HARDWARE"] !== undefined ? "red" : "black", fontWeight: activeMenu["HARDWARE"] !== undefined && "bold"}}>Hardware</span>
                  </a>
                  <ul className="ml-menu">
                    <li>
                      <a href="/hardware-spec">
                        <span style={{fontWeight: activeMenu["HARDSPEC"] !== undefined && "bold"}}>{activeMenu["HARDSPEC"] !== undefined &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} Hardware Specification</span>
                      </a>
                    </li>
                    <li>
                      <a href="/perbaikan-hardware">
                        <span style={{fontWeight: activeMenu["HARDPER"] !== undefined && "bold"}}>{activeMenu["HARDPER"] !== undefined &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} Perbaikan Hardware</span>
                      </a>
                    </li>
                  </ul>
                </li>

                <li>
                  <a href="/software">
                    <span style={{fontWeight: pathname === "SOFTWARE" && "bold"}}>{pathname === "SOFTWARE" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)}Software</span>
                  </a>
                </li>
                <li>
                  <a href="/form-permintaan">
                    <span style={{fontWeight: pathname === "FORM-PERMINTAAN" && "bold"}}>{pathname === "FORM-PERMINTAAN" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} Form Permintaan</span>
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href="#" className={`menu-toggle ${activeMenu["TICKET"]}`}>
                <i className="material-icons"></i>
                <span style={{color: activeMenu["TICKET"] !== undefined ? "red" : "black" }}>Ticket</span>
              </a>
              <ul className="ml-menu">
                <li>
                  <a href="/ticket-list">
                    <span style={{fontWeight: pathname === "TICKET-LIST" && "bold"}}>{pathname === "TICKET-LIST" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} Ticket List (Admin)</span>
                  </a>
                </li>
                <li>
                  <a href="/my-ticket-list">
                    <span style={{fontWeight: pathname === "MY-TICKET-LIST" && "bold"}}>{pathname === "MY-TICKET-LIST" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} My Ticket List </span>
                  </a>
                </li>
                <li>
                  <a href="/my-staff-ticket-list">
                    <span style={{fontWeight: pathname === "MY-STAFF-TICKET-LIST" && "bold"}}>{pathname === "MY-STAFF-TICKET-LIST" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} My Staff Ticket List</span>
                  </a>
                </li>
                <li>
                  <a href="/ticket-open">
                    <span style={{fontWeight: pathname === "TICKET-OPEN" && "bold"}}>{pathname === "TICKET-OPEN" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} Open Ticket</span>
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href="/faq-preview">
                <span style={{color: activeMenu["FAQ-PREVIEW"] !== undefined ? "red" : "black" }}>FAQ</span>
              </a>
            </li>

            <li>
              <a href="/tipsandtrick-preview">
                <span style={{color: activeMenu["TIPSANDTRICK-PREVIEW"] !== undefined ? "red" : "black" }}>Tips and Trick</span>
              </a>
            </li>

            <li>
              <a href="/mediaanddownload-preview">
                <span style={{color: activeMenu["MEDIAANDDOWNLOAD-PREVIEW"] !== undefined ? "red" : "black" }}>Media and Download</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="legal">
          <div className="copyright">
            &copy; 2016 - 2017 <a href="">AdminBSB - Material Design</a>.
          </div>
          <div className="version">
            <b>Version: </b> 1.0.5
          </div>
        </div>
      </aside>
     
    </section>
  );
}

export default React.memo(SideMenu);
