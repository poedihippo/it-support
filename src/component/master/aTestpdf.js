import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import { renderToString } from 'react-dom/server';
import "datatables.net";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "./../../logic/AuthenticationService";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import TestPdf from "./aTestpdf";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Logo from '../../image/logo.jpg'
function RunGetss({ state, dispatch }) {
    const [messages, setMessages] = useState(null)
    const axiosConfig = AuthenticationService.getAxiosConfig();
  const handleEvent = (e) => {
    setMessages("loading")
    axios
      .get(`${config.SERVER_URL}formpermintaan`, axiosConfig)
      .then((res) => {
        if(res.status === 200){
            setMessages("berhasil")
        }else {
            setMessages('gagal sequelize')
        }
      })
      .catch((error) => setMessages("gagal"));
  }
  
  return (
    <React.Fragment>
        <div style={{marginTop: "30rem", marginLeft:"30rem"}}>
            <div>{messages}</div>
            <button onClick={handleEvent}>Run</button>
      </div>
    </React.Fragment>
  );
}

export default RunGetss;
