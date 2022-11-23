const ActiveMenu = () => {
  let activeMenu = [];
  const pathname = window.location.pathname.toUpperCase().replace("/", "");
  console.log(pathname, "check pathname")
  if(pathname === "TICKET-LIST" || pathname === "MY-TICKET-LIST" || pathname === "MY-STAFF-TICKET-LIST" || pathname === "TICKET-OPEN"){
    activeMenu["TICKET"] = "toggled"
  }
  if(pathname === "FAQ" || pathname === "MEDIAANDDOWNLOAD" || pathname === "TIPSANDTRICK"){
    activeMenu["PUBLICKPAGE"] = "toggled"
  }
  if(pathname === "FAQ-PREVIEW"){
    activeMenu["FAQ-PREVIEW"] = "toggled"
  }
  if(pathname === "TIPSANDTRICK-PREVIEW"){
    activeMenu["TIPSANDTRICK-PREVIEW"] = "toggled"
  }
  if(pathname === "MEDIAANDDOWNLOAD-PREVIEW"){
    activeMenu["MEDIAANDDOWNLOAD-PREVIEW"] = "toggled"
  }
  if (pathname === `MAILINGLIST`) activeMenu["EMAIL"] = "toggled";
  if (pathname === `PUBLICEMAIL`) activeMenu["EMAIL"] = "toggled";
  if (pathname === `USERLIST`) activeMenu["EMAIL"] = "toggled";
  if (pathname === `MAILINGLISTMEMBER`) activeMenu["EMAIL"] = "toggled";
  if (pathname === `FAQ`) {
    activeMenu["MASTER"] = "toggled";
    activeMenu["PUBLIC"] = "toggled";
    activeMenu["FAQ"] = "toggled"
  }
  if (pathname === `TIPSANDTRICK`) {
    activeMenu["MASTER"] = "toggled";
    activeMenu["PUBLIC"] = "toggled";
    activeMenu["TIPSANDTRICK"] = "toggled"
  }
  if (pathname === `MEDIAANDDOWNLOAD`) {
    activeMenu["MASTER"] = "toggled";
    activeMenu["PUBLIC"] = "toggled";
    activeMenu["MEDIAANDDOWNLOAD"] = "toggled"
  }
  if (pathname === `SUPPLIERVENDOR`) {
    activeMenu["MASTER"] = "toggled";
  }
  if (pathname === `SOFTWARE`) {
    activeMenu["MASTER"] = "toggled";
  }
  if (pathname === `FORM-PERMINTAAN`) {
    activeMenu["MASTER"] = "toggled";
  }
  if (pathname === `HARDWARE-SPEC`) {
    activeMenu["MASTER"] = "toggled";
    activeMenu["HARDWARE"] = "toggled";
    activeMenu["HARDSPEC"] = "toggled";
  }
  if (pathname === `PERBAIKAN-HARDWARE`) {
    activeMenu["MASTER"] = "toggled";
    activeMenu["HARDWARE"] = "toggled";
    activeMenu["HARDPER"] = "toggled"
  }
  return activeMenu;
};

export default ActiveMenu;
