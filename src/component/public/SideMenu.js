import React, { useState, useEffect } from "react";
import AuthenticationService from "./../../logic/AuthenticationService";
import ActiveMenu from "./SideMenu.data";
import { redirectLogout } from '../../config/redirect';
import { useLocation } from 'react-router-dom';
import RightIcon from '../../image/right-arrow.png'
import axios from "axios";
import config from '../../config.json';
function SideMenu({ user }) {
  const location = useLocation();
  const pathname = location.pathname.replace('/', '').toUpperCase();
  const [isLogout, setIsLogout] = useState(false);
  const [dataMenuUser, setDataMenuUser] = useState([]);
  const userData = AuthenticationService.getLocalCredential();
  const axiosConfig = AuthenticationService.getAxiosConfig()
  const activeMenu = ActiveMenu();
  const keyLocalStorage = ['token', 'email', 'id', 'profile_image', 'userName']
  const handleLogout = () => {
    const resRemove = keyLocalStorage.map((data, i) => {
      localStorage.removeItem(data);
      return i === keyLocalStorage.length - 1 && true
    });
    resRemove && setIsLogout(true)
  }

  const menuSideBar = [
    {
      name:"Email",
      code:"email",
      id:291874,
      isPath:"",
      child: [
        {
          name: "Mailing List", 
          code:"email-mailing-list",
          isPath:"/mailinglist",
          id:291856
        },
        {
          name:"Public Email", 
          code: "email-public-email", 
          isPath: "/publicemail",
          id:291843
        },
        {
          name: "User List", 
          code: "email-user-list", 
          isPath:"/userlist",
          id:291556
        }
      ]
    },
    {
      name:"Master",
      code:"master",
      id:497281,
      isPath: "",
      child: [
        {
          name: "Public Page", 
          code:"master-public", 
          id:497251, 
          isPath:"",
          inChild:[
            {
              name:"FAQ", 
              code:"master-faq", 
              id:497001,
              isPath: "/faq"
            },
            {
              name:"Tips and Trick",
              code:"master-tips-and-trick",
              id:498001,
              isPath: "/tipsandtrick"
            },
            {
              name:"Media and Download",
              code: "master-media-and-download",
              id:499001,
              isPath: "/mediaanddownload"
            }
          ]
        },
        {
          name:"Supplier/Vendor",
          code:"master-supplier-or-vendor",
          id:492819,
          isPath: "/suppliervendor"
        },
        {
          name:"Hardware",
          code: "master-hardware",
          id: 4921102,
          isPath:"",
          inChild:[
            {
              name:"Hardware Specification",
              code:"master-hardware-specification",
              id:49002912,
              isPath:"/hardware-spec"
            },
            {
              name:"Perbaikan Hardware",
              code: "master-perbaikan-hardware",
              id:49220192,
              isPath: "/perbaikan-hardware"
            }
          ]
        },
        {
          name:"Software",
          code:"master-software",
          id: 902817,
          isPath:"/software"
        },
        {
          name:"Form Permintaan",
          code: "master-form-permintaan",
          id: 2819201,
          isPath: "/form-permintaan"
        }
      ]
    },
    {
      name: "Ticket",
      code: "ticket",
      id: 99281720,
      isPath: "",
      child: [
        {
          name:"Ticket List (Admin)",
          code: "ticket-ticket-list-admin",
          id: 99201928,
          isPath: "/ticket-list"
        },
        {
          name: "My Ticket List",
          code: "ticket-my-ticket-list",
          id:992819203,
          isPath: "/my-ticket-list"
        },
        {
          name: "My Staff Ticket List",
          code: "ticket-my-staff-ticket-list",
          id: 99201954,
          isPath: "/my-staff-ticket-list"
        },
        {
          name: "Open Ticket",
          code: "ticket-open-ticket",
          id: 99200192,
          isPath: "/ticket-open"
        }
      ]
    },
    {
      name: "FAQ",
      code:"faq-preview",
      id: 66758201,
      isPath: "/faq-preview",
    },
    {
      name: "Tips and Trick",
      code: "tips-and-trick-preview",
      id: 68827182,
      isPath: "/tips-and-trick-preview"
    },
    {
      name: "Media And Download",
      code: "media-and-download-preview",
      id: 55627182,
      isPath: "media-and-download-preview"
    }
  ];
  
  useEffect(() => {
    const getMenuUser = async () => {
      let newObj = {}
      try{
        const res = await axios.get(`${config.SERVER_URL}logindata`, axiosConfig);
        
        const filterUser = res?.data?.filter(dataUsr => parseInt(dataUsr?.user_id) === parseInt(user?.id));
        
        const toObj = JSON.parse(JSON.stringify(filterUser[0]?.sunsafe_response));
        menuSideBar.forEach(isDataMenu => {
          
          const findMenu = toObj?.payload?.menu?.find(d => d.code === isDataMenu.code);
          if(findMenu !== undefined){
            newObj[isDataMenu.code.split('-').join('')] = true
          }
          if(findMenu === undefined){
            newObj[isDataMenu.code.split('-').join('')] = true //false
          }
          isDataMenu?.child?.forEach(isChdMenu => {
            const chdMenu = toObj?.payload?.menu?.find(cd => cd.code === isChdMenu.code);
            if(chdMenu !== undefined){
              newObj[isChdMenu.code.split('-').join('')] = true
            }
            if(chdMenu === undefined){
              newObj[isChdMenu.code.split('-').join('')] = true //false
            }
            isChdMenu?.inChild?.forEach(isInChd => {
              const inChdMenu = toObj?.payload?.menu?.find(ichd => ichd.code === isInChd.code);
              if(inChdMenu !== undefined){
                newObj[isInChd.code.split('-').join('')] = true
              }

              if(inChdMenu === undefined){
                newObj[isInChd.code.split('-').join('')] = true //false
              }
            })
          })
        })
      }catch(error){
        console.log(error.response, error)
      }
      setDataMenuUser(newObj);
    }
    getMenuUser()
  }, [])
 
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
            
            <li style={{display: dataMenuUser?.email ? "block" : "none"}}>
              <a href="#" className={`menu-toggle ${activeMenu["EMAIL"]}`}>
                <i className="material-icons"></i>
                <span style={{color: activeMenu["EMAIL"] !== undefined ? "red" : "black" }}>Email </span>
              </a>
              <ul className="ml-menu">
                <li style={{display: dataMenuUser?.emailmailinglist ? "block" : "none"}}>
                  <a href="/mailinglist">
                    <span style={{fontWeight: pathname === "MAILINGLIST" && "bold"}}>{pathname === "MAILINGLIST" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} Mailing List</span>
                  </a>
                </li>
                <li style={{display: dataMenuUser?.emailpublicemail ? "block" : "none"}}>
                  <a href="/publicemail">
                    <span style={{fontWeight: pathname === "PUBLICEMAIL" && "bold"}}>{pathname === "PUBLICEMAIL" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} Public Email</span>
                  </a>
                </li>
                <li style={{display: dataMenuUser?.emailuserlist ? "block" : "none"}}>
                  <a href="/userlist" >
                    <span style={{fontWeight: pathname === "USERLIST" && "bold"}}>{pathname === "USERLIST" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} User List</span>
                  </a>
                </li>
              </ul>
            </li>
            <li style={{display: dataMenuUser?.master ? "block" : "none"}}>
              <a href="#" className={`menu-toggle ${activeMenu["MASTER"]}`} >
                <i className="material-icons"></i>
                <span style={{color: activeMenu["MASTER"] !== undefined ? "red" : "black" }}>Master</span>
              </a>
              <ul className="ml-menu">
                <li style={{display: dataMenuUser?.masterpublic ? "block" : "none"}}>
                  <a href="#" className={`menu-toggle ${activeMenu["PUBLIC"]}`}>
                    <i className="material-icons"></i>
                    <span style={{color: activeMenu["PUBLICKPAGE"] !== undefined ? "red" : "black", fontWeight: activeMenu["PUBLICKPAGE"] !== undefined && "bold"}}>Public Page</span>
                  </a>
                  <ul className="ml-menu">
                    <li style={{display: dataMenuUser?.masterfaq ? "block" : "none"}}>
                      <a href="/faq">
                        <span style={{fontWeight: pathname === "FAQ" && "bold"}}>{pathname === "FAQ" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} FAQ</span>
                      </a>
                    </li>
                    <li style={{display: dataMenuUser?.mastertipsandtrick ? "block" : "none"}}>
                      <a href="/tipsandtrick">
                        <span style={{fontWeight: pathname === "TIPSANDTRICK" && "bold"}}>{pathname === "TIPSANDTRICK" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} Tips and Trick</span>
                      </a>
                    </li>
                    <li style={{display: dataMenuUser?.mastermediaanddownload ? "block" : "none"}}>
                      <a href="/mediaanddownload">
                        <span style={{fontWeight: pathname === "MEDIAANDDOWNLOAD" && "bold"}}>{pathname === "MEDIAANDDOWNLOAD" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} Media and Download</span>
                      </a>
                    </li>
                  </ul>
                </li>

                <li style={{display: dataMenuUser?.mastersupplierorvendor ? "block" : "none"}}>
                  <a href="/suppliervendor">
                    <span style={{fontWeight: pathname === "SUPPLIERVENDOR" && "bold"}}>{pathname === "SUPPLIERVENDOR" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} Supplier/Vendor</span>
                  </a>
                </li>
                <li style={{display: dataMenuUser?.masterhardware ? "block" : "none"}}>
                  <a
                    href="#"
                    className={`menu-toggle ${activeMenu["HARDWARE"]}`}
                  >
                    <i className="material-icons"></i>
                    <span style={{color: activeMenu["HARDWARE"] !== undefined ? "red" : "black", fontWeight: activeMenu["HARDWARE"] !== undefined && "bold"}}>Hardware</span>
                  </a>
                  <ul className="ml-menu">
                    <li style={{display: dataMenuUser?.masterhardwarespecification ? "block" : "none"}}>
                      <a href="/hardware-spec">
                        <span style={{fontWeight: activeMenu["HARDSPEC"] !== undefined && "bold"}}>{activeMenu["HARDSPEC"] !== undefined &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} Hardware Specification</span>
                      </a>
                    </li>
                    <li style={{display: dataMenuUser?.masterperbaikanhardware ? "block" : "none"}}>
                      <a href="/perbaikan-hardware">
                        <span style={{fontWeight: activeMenu["HARDPER"] !== undefined && "bold"}}>{activeMenu["HARDPER"] !== undefined &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} Perbaikan Hardware</span>
                      </a>
                    </li>
                  </ul>
                </li>

                <li style={{display: dataMenuUser?.mastersoftware ? "block" : "none"}}>
                  <a href="/software">
                    <span style={{fontWeight: pathname === "SOFTWARE" && "bold"}}>{pathname === "SOFTWARE" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)}Software</span>
                  </a>
                </li>
                <li style={{display: dataMenuUser?.masterformpermintaan ? "block" : "none"}}>
                  <a href="/form-permintaan">
                    <span style={{fontWeight: pathname === "FORM-PERMINTAAN" && "bold"}}>{pathname === "FORM-PERMINTAAN" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} Form Permintaan</span>
                  </a>
                </li>
              </ul>
            </li>
            <li style={{display: dataMenuUser?.ticket ? "block" : "none"}}>
              <a href="#" className={`menu-toggle ${activeMenu["TICKET"]}`}>
                <i className="material-icons"></i>
                <span style={{color: activeMenu["TICKET"] !== undefined ? "red" : "black" }}>Ticket</span>
              </a>
              <ul className="ml-menu">
                <li style={{display: dataMenuUser?.ticketticketlistadmin ? "block" : "none"}}>
                  <a href="/ticket-list">
                    <span style={{fontWeight: pathname === "TICKET-LIST" && "bold"}}>{pathname === "TICKET-LIST" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} Ticket List (Admin)</span>
                  </a>
                </li>
                <li style={{display: dataMenuUser?.ticketmyticketlist ? "block" : "none"}}>
                  <a href="/my-ticket-list">
                    <span style={{fontWeight: pathname === "MY-TICKET-LIST" && "bold"}}>{pathname === "MY-TICKET-LIST" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} My Ticket List </span>
                  </a>
                </li>
                <li style={{display: dataMenuUser?.ticketmystaffticketlist ? "block" : "none"}}>
                  <a href="/my-staff-ticket-list">
                    <span style={{fontWeight: pathname === "MY-STAFF-TICKET-LIST" && "bold"}}>{pathname === "MY-STAFF-TICKET-LIST" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} My Staff Ticket List</span>
                  </a>
                </li>
                <li style={{display: dataMenuUser?.ticketopenticket ? "block" : "none"}}>
                  <a href="/ticket-open">
                    <span style={{fontWeight: pathname === "TICKET-OPEN" && "bold"}}>{pathname === "TICKET-OPEN" &&(<img src={RightIcon} alt="right icon" style={{width:"10px", height:"10px"}}/>)} Open Ticket</span>
                  </a>
                </li>
              </ul>
            </li>
            <li style={{display: dataMenuUser?.faqpreview ? "block" : "none"}}>
              <a href="/faq-preview">
                <span style={{color: activeMenu["FAQ-PREVIEW"] !== undefined ? "red" : "black" }}>FAQ</span>
              </a>
            </li>

            <li style={{display: dataMenuUser?.tipsandtrickpreview ? "block" : "none"}}>
              <a href="/tipsandtrick-preview">
                <span style={{color: activeMenu["TIPSANDTRICK-PREVIEW"] !== undefined ? "red" : "black" }}>Tips and Trick</span>
              </a>
            </li>

            <li style={{display: dataMenuUser?.mediaanddownloadpreview ? "block" : "none"}}>
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
