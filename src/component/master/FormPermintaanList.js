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
           .text-xxs{
             font-size: 9px;
           }
           .text-xs{
             font-size: 11px;
           }
           .text-sm{
             font-size: 13px;
           }
           .text-md{
             font-size: 15px;
           }
           .text-lg{
             font-size: 17px;
           }
           .text-xl{
             font-size: 19px;
           }
           .text-xl{
             font-size: 21px;
           }
          </style>
          <div style="height:${dataGenerate.length - 1 === indx ? "":"120rem"}">
   <div id="invc"style="box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); margin: 0 auto; width: 220mm; background: #fff;">
       <div id="top">
           <table style="width: 100%; border: 2px solid  #000;">
               
               <tr>
                   <td>
       
                   </td>
                   <th style="font-weight: bold; border: 2px solid #000;text-align:center;">
                       PT SUN EDUCATION
                   </th>
                   <th class="text-xs" style="border: 2px solid #000;font-size:12px; padding-left: 10px; padding-right: 10px;">
                       BERLAKU &nbsp;&nbsp; EFEKTIF
                   </th>
                   <th class="text-xs" style="border: 2px solid #000;font-size:12px;padding-right: 10px;padding-left:10px;">
                       NO. REVISI
                   </th>
               </tr>
       
               <tr>
                   <td>
                       <img src=${Logo} style="width: 200px !important; margin: 0; margin-left: 25px;margin-top:25px;">
                   </td>
                   <th style="font-weight: bold; border: 2px solid #000;text-align:center;">
                       FORM LOGISTIK &nbsp;& PROCUREMENT
                   </th>
                   <th style="border: 2px solid #000; font-size:13px;text-align:center;">
                       29 Juli 2015
                   </th>
                   <th style="border: 2px solid #000; font-size:13px;text-align:center;">
                       01
                   </th>
               </tr>
       
               <tr>
                   <td>
       
                   </td>
                   <td style="text-align: center; border-left: 2px solid #000; border-right: 2px solid #000; font-weight:bold;">
                       PERMINTAAN PEMBELIAN &nbsp; BARANG & JASA
                   </td>
                   <th style="border: 2px solid #000;font-size:12px;text-align:center;">
                       NO. DOKUMEN
                   </th>
                   <th style="border: 2px solid #000;font-size:12px;text-align:center;">
                       HALAMAN
                   </th>
               </tr>
       
               <tr>
                   <td>
       
                   </td>
                   <td style="border-left: 2px solid #000; border-right: 2px solid #000; border-bottom: 2px solid #000;">
       
                   </td>
                   <th style="border: 2px solid #000;font-size:13px;text-align:center;">
                       SE.FM.LGS.009
                   </th>
                   <th style="border: 2px solid #000;font-size:13px;text-align:center;">
                       1/1
                   </th>
               </tr>
           </table>
       </div>

       <div style="margin-bottom: 10px;">
           <div style="display: flex !important; justify-content: space-between !important; margin-left: 10px !important; margin-right: 10px !important; height: 40px !important;">
               <div style="display: flex;">
                   <h4 style="font-size:12px;">
                       No. PR:
                   </h4>
                   <p style="font-size: 13px !important;padding-top:8px;">
                   .............../L&P/.............../...............
                   </p>
               </div>

               <div style="display: flex;">
                   <h4 style="font-size: 12px;">
                       Tanggal:
                   </h4>
                   <p style="font-size: 11px;padding-top:8px;">
                       ${isDataPdf.submission_date}
                   </p>
               </div>
           </div>

           <div style="display: flex !important;
   justify-content: space-between !important;    
   margin-left: 10px !important;
   margin-right: 10px !important;
   height: 40px !important;">
               <div style="display: flex;">
                   <h4 style="font-size:12px;">
                       Project:
                   </h4>
                   <p style="font-size: 12px !important;padding-top:8px;">
                       &nbsp;...................
                   </p>
               </div>
           
               <div style="display: flex;">
                   <h4 style="font-size:12px;">
                       Departmen:
                   </h4>
                   <p style="font-size:12px;padding-top:8px;">
                       &nbsp;Operation
                   </p>
               </div>
           </div>
       </div>

       <div>
           <table style="width: 100%; border: 1px solid #000; border-collapse: collapse; height: 40px; font-size: 16px; font-weight: normal;">
               <tr>
                   <th style="border: 1px solid #000; border-collapse: collapse; height: 40px; font-size: 12px; font-weight: bold; border-bottom: 0mm;text-align:center;">
                       No.
                   </th>
                   <th style="border: 1px solid #000; border-collapse: collapse; height: 40px; font-size: 12px; font-weight: bold; border-bottom: 0mm;text-align:center;">
                       Code
                   </th>
                   <th style="border: 1px solid #000; border-collapse: collapse; height: 40px; font-size: 12px; font-weight: bold; border-bottom: 0mm;text-align:center;">
                       Nama Barang & Jasa
                   </th>
                   <td id="Qty-section" style="font-size:13px;text-align:center;position:relative;">
                       <div style="position:absolute;right: -20px">Quantity</div>
                   </td>
                   <td>
                   &nbsp;
                 </td>         
                  <th style="border: 1px solid #000; border-collapse: collapse; height: 40px; font-size: 12px; font-weight: bold; border-bottom: 0mm;text-align:center;">
                      Harga Satuan
                  </th>   
                   <th style="border: 1px solid #000; border-collapse: collapse; height: 40px; font-size: 12px; font-weight: bold; border-bottom: 0mm;text-align:center;">
                       Harga Total
                   </th>
                   <th style="border: 1px solid #000; border-collapse: collapse; height: 40px; font-size: 12px; font-weight: bold; border-bottom: 0mm; width: 100px;text-align:center;padding:0 5px;">
                       Nama Pemasok (Alamat/Telepon/Kartu Nama)
                   </th>
                   <th style="border: 1px solid #000; border-collapse: collapse; height: 40px; font-size: 12px; font-weight: bold; border-bottom: 0mm;text-align:center;">
                       Claimable
                   </th>

                   <tr>
                       <td style="border-left: 1px solid #000; border-right: 1px solid #000">
                           
                       </td>                    
                       <td style="border-left: 1px solid #000; border-right: 1px solid #000">
                           
                       </td>
                       <td style="border-left: 1px solid #000; border-right: 1px solid #000">
                           
                       </td>
                       <th style="font-weight: bold;font-size:12px;text-align:center;border-top: 1px solid #000;border-right: 1px solid #000">
                           Jmlh
                       </th>
                       <th style="font-weight: bold;font-size:12px;text-align:center;border-top: 1px solid #000">
                           UoM
                       </th>
                       <td style="border-left: 1px solid #000; border-right: 1px solid #000">
                       </td>
                       <td style="border-left: 1px solid #000; border-right: 1px solid #000">                            
                       </td>                    
                   </tr>
                  
                   
                   ${isDataPdf.details.map(isGntDetail => {
                     return `<tr>
                       <th style="border: 1px solid #000; border-collapse: collapse; height: 40px; font-size: 12px; font-weight: bold; border-bottom: 0mm;text-align:center;">
                           ${isGntDetail.no_urut}
                       </th>
                       <th style="border: 1px solid #000; border-collapse: collapse; height: 40px; font-size: 12px; font-weight: bold; border-bottom: 0mm;text-align:center;">
                       ${isGntDetail.id}
                       </th>
                       <th style="border: 1px solid #000; border-collapse: collapse; height: 40px; font-size: 12px; font-weight: bold; border-bottom: 0mm;text-align:center;">
                       ${isGntDetail.nama_barang}
                       </th>
                       <th style="border: 1px solid #000; border-collapse: collapse; height: 40px; font-size: 12px; font-weight: bold; border-bottom: 0mm;text-align:center;">
                       ${isGntDetail.qty}
                       </th>
                       <th style="border: 1px solid #000; border-collapse: collapse; height: 40px; font-size: 13px; font-weight: bold; border-bottom: 0mm;text-align:center;">
                       ${isGntDetail.uom}
                       </th>
                       <th style="border: 1px solid #000; border-collapse: collapse; height: 40px; font-size: 12px; font-weight: bold; border-bottom: 0mm;text-align:center;">
                       ${isGntDetail.harga_satuan}
                       </th>
                       <th style="border: 1px solid #000; border-collapse: collapse; height: 40px; font-size: 12px; font-weight: bold; border-bottom: 0mm;text-align:center;">
                       ${isGntDetail.harga_total}
                       </th>
                       <th style="border: 1px solid #000; border-collapse: collapse; height: 40px; font-size: 12px; font-weight: bold; border-bottom: 0mm;text-align:center;">
                       ${isDataPdf.supplier_name}
                       </th>
                       <th style="border: 1px solid #000; border-collapse: collapse; height: 40px; font-size: 10px; font-weight: bold; border-bottom: 0mm;">
                           <div>
                               Yes
                               <div style="width: 10px; height: 10px; border: 1px solid #000; "/>
                           </div>
                           <div>
                               No
                               <div style="width: 10px; height: 10px; border: 1px solid #000; "/>
                           </div>
                       </th>
                       </tr>`
                     
                   })}
               </tr>
           </table>

           <div style="display: flex;">
               <div style="border: 1px solid #000; width: 170mm !important;">
                   <h4 style="font-size:13px;">Alasan Pembelian &nbsp;barang dan jasa:</h4>
                   <h4 style="font-size:13px;">${isDataPdf.alasan_pembelian}</h4>
                   <div style="display: flex;">
                       <h4 style="font-size:12px;">Diharapkan tersedia pada tanggal: </h4>
                       <p style=" font-size: 11px; text-decoration: underline;font-size:12px;padding-top:8px;">&nbsp;4 May 2022</p>
                   </div>
               </div>

               <div style="border: 1px solid #000; width: 80mm !important;">                    
                   <div style="display: flex; height: 40px; margin-left: 10px;">
                       <h5 style="font-size:12px;">Nilai klaim: </h5>
                       <p style="font-size: 11px;padding-top:8px;">&nbsp;................</p>
                   </div>
                   <div style="display: flex; height: 40px; margin-left: 10px;">
                       <h5 style="font-size:12px;">Klaim Ke: </h5>
                       <p style="font-size:11px;padding-top:8px">&nbsp;................</p>
                   </div>
                   <div style="display: flex; height: 40px; margin-left: 10px;">
                       <h5 style="font-size:12px;">No. SO: </h5>
                       <p style="padding-top:8px;font-size:11px;">&nbsp;................</p>
                   </div>
               </div>
           </div>

           <div style="display: flex;">
               <div style="border-left: 1px solid #000; border-bottom: 1px solid #000; width: 90mm !important;">
                   <h4 style="text-align: center; font-weight: normal;font-size:13px;">Dibuat oleh:</h4>
                   <h4 style="margin-top: 20mm; font-weight: normal;"></h4>
                   <h4 style="text-align: center; font-weight: normal;font-size:12px;">(........................)</h4>                    
                   <h4 style="text-align: center; font-weight: normal;font-size:13px;">Karyawan</h4>
               </div>
               <div style="border-bottom: 1px solid #000; width: 90mm !important;">
                   <h4 style="text-align: center; font-weight: normal;font-size:13px;">Disetujui oleh:</h4>
                   <h4 style="margin-top: 20mm; font-weight: normal;"></h4>
                   <h4 style="text-align: center; font-weight: normal;">(........................)</h4>
                   <h4 style="text-align: center; font-weight: normal;font-size:13px;">Atasan Langsung</h4>
               </div>
               <div style="border-bottom: 1px solid #000; border-right: 1px solid #000; width: 90mm !important;">
                   <h4 style="text-align: center; font-weight: normal;font-size:13px;">Diketahui oleh:</h4>
                   <h4 style="margin-top: 20mm; font-weight: normal;"></h4>
                   <h4 style="text-align: center; font-weight: normal;">(........................)</h4>
                   <h4 style="text-align: center; font-weight: normal;font-size:13px;">L&P Coordinator</h4>
               </div>
           </div>

           <div style="border: 1px solid #000; background: #c4c4c4;">
               <p style="text-align: center; width: 100% !important;">Untuk barang-barang sistem informasi perlu ditinjau  terlebih dahulu oleh tim IT dan kebutuhan
               kantor perlu ditinjau oleh departemen GA</p>
           </div>

           <div style="display: flex;">
           
               <div style="border: 1px solid #000; width: 90mm !important;">
                   <h4 style="text-align: center; font-weight: normal;font-size:12px;">Ditinjau oleh:</h4>
                   <h4 style="margin-top: 20mm; font-weight: normal;"></h4>
                   <h4 style="text-align: center; font-weight: normal;font-size:12px;">(........................)</h4>
                   <h4 style="text-align: center; font-weight: normal;font-size:12px;">Karyawan</h4>
               </div>
               <div style="border: 1px solid #000; width: 160mm !important;">
                   <h4 style="text-align: center;font-size:12px;">Catatan:</h4>
                   <h4 style="margin-top: 10mm; font-weight: normal;"></h4>
                   <h4 style="text-align: center; font-weight: normal;font-size:12px;">${isDataPdf.note}</h4>                    
               </div>                
           </div>
       </div>
   </div>
</div>`;
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
        window.location.reload()
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
                          <th>Staff yang request</th>
                          <th>Tanggal</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((i) => (
                          <tr key={i.id}>
                            <td>{i.nama_pt}</td>
                            <td>{i.request_by !== null ? i.request_by : "Tidak Ada"}</td>
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
