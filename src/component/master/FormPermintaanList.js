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
function FormPermintaanList({ state, dispatch }) {
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isDataDelete, setIsDataDelete] = useState();
  const getPdf = useRef()
  const axiosConfig = AuthenticationService.getAxiosConfig();
  const axiosConfigV1 = AuthenticationService.getAxiosConfigV1()
  const generatePDF = async (dataForm) => {
   
    const generateData = {
      ids: [dataForm.id]
    }
    try {
      const resultGenerate = await axios.post(
      `${config.SERVER_URL}formpermintaan/generatepdf`,
      generateData,
      axiosConfig
    );
    const dataGenerate = resultGenerate.data
    if(dataGenerate.length !== 0){
      let newArr = [];
      var parser = new DOMParser();
      dataGenerate.map((isDataPdf, indx) => {
        const lengthDtl = isDataPdf.details.length;
           var source = `<style>
           body{
            background: #e3e6e7 url(images/background.png) repeat;
            color: #61686d;
            font: 14px "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif;
            font-weight: lighter;
            padding-bottom: 60px;
        }
        
        #page {
            background: #ffffff;
            width: 878px;
            margin: 0 auto;
            margin-top: 80px;
            display: block;
            border: 1px solid #c4c7c7;
            padding: 40px 40px 50px 40px;
            position: relative;
            z-index: 0;
        }
        
        .page-shadow {
            background-image: url(images/page-shadow.png);
            width: 992px;
            height: 60px;
            margin: 0 auto;
            margin-top: -1px;
            z-index: 1;
            position: relative;
        }
        
        h1 {
            color: #4d5357;
            font-weight: lighter;
            font-size: 56px;
            margin: 40px 0 0 0;
        }
        
        .terms {
            float: left;
            width: 400px;
            margin: 0 0 40px 0;
            font-size: 12px;
            color: #a1a7ac;
            line-height: 180%;
        }
        
        .terms strong {
            font-size: 16px;
        }
        
        .recipient-address {
            padding-top: 60px;
            width: 200px;
        }
        
        .company-logo {
            width: 202px;
            height: 81px;
            position: absolute;
            right: 40px;
            top: 40px;
        }
        
        .company-address {
            width: 200px;
            color: #a1a7ac;
            position: absolute;
            right: 40px;
            top: 130px;
            text-align: right;
        }
        
        .status {
            position: absolute;
            top: -5px;
            left: -5px;
            text-indent: -5000px;
            width: 128px;
            height: 128px;
        }
        
        .draft {
            background-image: url(images/status-draft.png);
        }
        
        .sent {
            background-image: url(images/status-sent.png);
        }
        
        .paid {
            background-image: url(images/status-paid.png);
        }
        
        .overdue {
            background-image: url(images/status-overdue.png);
        }
        
        hr {
            clear: both;
            border: none;
            background: none;
            border-bottom: 1px solid #d6dde2;
        }
        
        .pay-buttons {
            text-align: center;
            width: 400px;
            margin: 0 auto;
            margin-top: 20px;
        }
        .pay-paypal {
            display: block;
            width: 200px;
            height: 45px;
            background:  url('images/pay-buttons.png') no-repeat;
            text-indent: -5000px;
            background-position: 0 0;
            float: left;
        }
        
        .pay-paypal:hover {
            background-position: 0 -45px;
        }
        
        .pay-paypal:active {
            background-position: 0 -90px;
        }
        
        .pay-card {
            display: block;
            float: left;
            width: 165px;
            height: 45px;
            background:  url('images/pay-buttons.png') no-repeat;
            text-indent: -5000px;
            background-position: -200px 0;
        }
        
        .pay-card:hover {
            background-position: -200px -45px;
        }
        
        .pay-card:active {
            background-position: -200px -90px;
        }
        
        .total-due {
            float: right;
            width: 200px;
            border: 1px solid #d6dde2;
            margin: 0 0 40px 0;
            padding: 0;
            border-radius: 3px; -moz-border-radius: 3px; -webkit-border-radius: 3px;
            text-align: right;
        }
        
        .total-heading {
            background: #e7ebee;
            height: 24px;
            color: #63676b;
            text-shadow: 0 1px 1px #ffffff;
            padding: 8px 20px 0 0;
            -moz-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
            -webkit-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
            box-shadow: inset 0px 0px 0px 1px rgba(255,255,255,0.5), 0 2px 2px rgba(0, 0, 0, 0.08);
            border-bottom: 1px solid #d6dde2;
            font-weight: bold;
        }
        
        .total-heading p, .total-amount p {
            margin: 0; padding: 0;
        }
        
        .total-amount {
            padding: 15px 20px 15px 0;
            color: #4d5357;
            font-size: 32px;
        }
        
        table.tablesorter {
            width: 100%;
            text-align: left;
            border: 1px solid #d6dde2;
            border-radius: 3px; -moz-border-radius: 3px; -webkit-border-radius: 3px;
            margin: 40px 0;
            color: #a1a7ac;
        }
        table.tablesorter thead tr th, table.tablesorter tfoot tr th {
            margin: 0;
        }
        table.tablesorter thead tr .header {
            background: #e7ebee url(images/arrows-both.png) no-repeat center right;
            cursor: pointer;
            height: 60px;
            color: #63676b;
            text-shadow: 0 1px 1px #ffffff;
            padding-left: 20px;
            padding-right:20px;
            -moz-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
            -webkit-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
            box-shadow: inset 0px 0px 0px 1px rgba(255,255,255,0.5), 0 2px 2px rgba(0, 0, 0, 0.08);
            border-bottom: 1px solid #d6dde2;
        }
        table.tablesorter tbody td {
            padding: 20px;
            vertical-align: top;
        }
        table.tablesorter tbody tr.even td {
            background: #f6f8f9;
        }
        table.tablesorter thead tr .headerSortUp {
            background-image: url(images/arrow-up.png);
        }
        table.tablesorter thead tr .headerSortDown {
            background-image: url(images/arrow-down.png);
        }
        table.tablesorter thead tr .headerSortDown, table.tablesorter thead tr .headerSortUp {
        }        


        .font-xxss{
          font-size:8px;
      }
      .font-xss{
          font-size:10px;
      }
      .font-xs{
          font-size:13px;
      }
      .font-s{
          font-size:16px;
      }
      .font-m{
          font-size:18px;
      }
      .font-l{
          font-size:20px;
      }
      .font-xl{
          font-size:22px;
      }
      .font-xxl{
          font-size:23px;
      }
           </style>

          
           <div id="page">
    
    <!--To change the status of the invoice, update class name. for example "status paid" or "status overdue". Possible options are: draft, sent, paid, overdue-->
    <div class="status sent">
        <p>Paid</p>
    </div>
    <div class="tll-pt" style="width:50%;margin:auto;text-align:center;">
        <h3 class="font-s">PT SUN EDUCATION</h3>
        <h3 class="font-s">FORM LOGISTIK & PROCUREMENT</h3>
        <h3 class="font-s">PERMINTAAN PEMBELIANBARANG& JASA</h3>
    </div>
    <p class="recipient-address font-xss" style="padding-top:0;">
    <strong class="font-xss">BERLAKU EFEKTIF: </strong><strong style="font-weight:normal;"class="font-xss">29 Juli 2015</strong><br>
    <strong class="font-xss">NO. REVISI: </strong>01<br>
    <strong class="font-xss">NO. DOKUMENT: </strong>SEFM.LG.009<br>
    <strong class="font-xss">HALAMAN: </strong>1/1
    </p>
    
    <h2 class="font-xs"style="margin-bottom:0">Invoice</h2>
    <h2 class="terms font-xss" >Tanggal: ${isDataPdf.submission_date}<br>
    Departemen: Operation<br>No. PR: ...../L&P/...../.....<br>Project: .....</h2>
    
    <img src=${Logo} alt="yourlogo" class="company-logo">
    
    <table id="table" class="tablesorter" cellspacing="0"> 
    <thead> 
    <tr> 
        <th class="header font-xss">No.</th> 
        <th class="header headerSortDown font-xss">Code</th> 
        <th class="header headerSortDown font-xss">Jumlah</th> 
        <th class="header headerSortDown font-xss">UoM</th> 
        <th class="header headerSortDown font-xss">Harga Total</th> 
        <th class="header headerSortDown font-xss">Nama Supplier (Alamat/Telepone/Kartu Nama)</th> 
        <th class="header font-xss">Claimable</th> 
    </tr> 
    </thead> 
    <tbody> 
     
     
     
     
     ${isDataPdf.details.map((dats,indx) => {
      return `<tr class=${indx % 2 === 0 ? "even" : "odd"}> 
      <td class="font-xss">${dats.no_urut}</td> 
      <td class="font-xss">${dats.id}</td> 
      <td class="font-xss">${dats.qty}</td> 
      <td class="font-xss">${dats.uom}</td> 
      <td class="font-xss">${dats.harga_total}</td> 
      <td class="font-xss">${isDataPdf.supplier_name}</td> 
      <td style="padding:8px;">
          <div style="float:left;"class="font-xss">
               Yes
              <div style="width: 15px; height: 15px; border: 1px solid #d6dde2; "> </div>
          </div>
          <div style="float:right;" class="font-xss">
                  No
              <div style="width: 15px; height: 15px; border: 1px solid #d6dde2; "></div>
          </div>
      </td> 
  </tr>`
     })}
   </tbody> 
    </table> 
    <div>
        <div style="float:left;width:70%;height:7rem">
            <h4 class="font-xss"style="margin-top:0;margin-bottom:0;width:max-content;float:left;margin-right: 10px;">Alasan Pembelian:</h4>
            <p class="font-xss"style="padding-right:20px;">${isDataPdf.note}</p>
            <div class="font-xss"><h4 class="font-xss"style="width:max-content;float:left;margin-top:0;margin-right:10px;">Diharapkan Tersedia Pada Tanggal:</h4>4 May 2022</div>
        </div>
        <div style="">
            <h4 class="font-xss">Nilai Clain: ............</h4>
            <h4 class="font-xss">Claim Ke: ............</h4>
            <h4 class="font-xss">No. SOL: ............</h4>
        </div>
    </div>
    <div style="margin:auto;">
        <div style="width:33%;display:inline-block;">
            <h4 class="font-xss"style="text-align:center;margin-bottom:50px;">Dibuat oleh:</h4>
            <p class="font-xss"style="text-align:center;">(....................)<br>Karyawan</p>
        </div>
        <div style="width:33%;display:inline-block;">
            <h4 class="font-xss"style="text-align:center;margin-bottom:50px;">Disetujui oleh:</h4>
            <p class="font-xss"style="text-align:center;">(....................)<br>Atasan Langsung</p>
        </div>
        <div style="width:33%;display:inline-block;">
            <h4 class="font-xss"style="text-align:center;margin-bottom:50px;">Diketahui oleh:</h4>
            <p class="font-xss"style="text-align:center;">(....................)<br>L&P Coordinator</p>
        </div>
    </div>
    <h4 style="text-align:center;"class="font-xs">Untuk barang-barang sistem informasi harus direview terlebih dahulu oleh departmen IT, dan barang-barang kebutuhan kantor harus
direiview oleh departemen GA</h4>
    <div style="margin:auto;">
        <div style="width:33%;display:inline-block;">
            <h4 class="font-xss"style="text-align:center;margin-bottom:50px;">Direview oleh:</h4>
            <p class="font-xss"style="text-align:center;">(....................)<br>Karyawan</p>
        </div>
       <div class="font-xs"style="width:max-content;display:inline-block;float:right;margin-top:50px; font-weight: bold;margin-right: 70px;">
            Catatan: Transfer ke RekBCA: 345 2444 175 A/N: Muhamad Apid

       </div>
    </div>
    <hr>
    <div class="pay-buttons">
        <a href="#" class="pay-paypal">Pay now with PayPal</a>
        <a href="#" class="pay-card">Pay with Credit Card</a>
    </div>
    
</div>
<div class="page-shadow"></div>
`;
        if(indx === 0){
          newArr.push("<div id='print-pdf'>")
        }
        newArr.push(source)
        if(indx === dataGenerate.length - 1){
          newArr.push("</div>")
        }
        
      });
      const resReduce = newArr.reduce((a,b) => a+b);
      const newDoc = parser.parseFromString(resReduce.toString(), 'text/html');
      const getbodyHtml = newDoc.getElementById('print-pdf')
      const pdf = new jsPDF('portrait', 'pt', 'a3');
      pdf.html(getbodyHtml, {
        async callback(pdf){
          pdf.save('form-permintaan')
        }
      });
    }
  }catch(error){
    console.log(error.response, "check response")
  }
  };
  useEffect(() => {
   
    axios
      .get(`${config.SERVER_URL}formpermintaan`, axiosConfig)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);

          $(".js-mailing-list").DataTable({
            responsive: true,
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (e) => {
    if(e.currentTarget.textContent.toUpperCase() === "YES"){
      axios.delete(`${config.SERVER_URL}formpermintaan/${isDataDelete.id}`, axiosConfigV1)
      .then(res => {
        setIsDelete(false)
      })
      .catch(error => console.log(error.response," check lah"))
    }else{
      setIsDelete(false)
    }
  }
  const deleteData = (d) => {
    setIsDelete(true);
    setIsDataDelete(d)
  }
  return (
    <React.Fragment>
      <section className="content">
        <div role="dialog">
          <div className={`${isDelete ? "" : "modal"} position-absolute`}style={{position:"fixed", zIndex: "11", top:"50%", transform: "translateY(-50%)", left:"30rem", right: "0", margin: "auto"}} tabindex="-1" role="dialog">
            <div className="modal-dialog " role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <p>Are you sure you wish to delete this item?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={handleDelete}>Yes</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleDelete}>No</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>FormPermintaan List</h2>
                </div>
                <div className="body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover js-mailing-list dataTable button-demo">
                      <thead>
                        <tr>
                          <th>Supplier</th>
                          <th>Tanggal</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((i) => (
                          <tr key={i.id}>
                            <td>{i.nama_pt}</td>
                            <td>{i.tanggal_pengajuan}</td>
                            <td>
                              
                              <button
                                type="button"
                                className="btn btn-primary waves-effect "
                                onClick={() => {
                                  dispatch({ type: "EDIT", id: i.id, row: i });
                                }}
                              >
                                Edit
                              </button>
            
                              <button
                                type="button"
                                className="btn btn-danger waves-effect "
                                onClick={() => deleteData(i)}
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary waves-effect "
                                onClick={() =>generatePDF(i)}
                              >
                                Download Pdf
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-primary waves-effect"
                      onClick={() => {
                        dispatch({ type: "ADD" });
                      }}
                    >
                      Add
                    </button>
                    <button
                      style={{marginLeft: "40px"}}
                      className="btn btn-primary waves-effect"
                      onClick={() => {
                      window.location.assign('/')
                    }}
                    >Back</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default FormPermintaanList;
