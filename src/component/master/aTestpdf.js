import React from 'react';
import Logo from '../../image/logo.jpg'
import '../../stylei.css'
const TestPdf = () => {
    return (
        <>
             <div id="invoice" >
        <div id="top">
            <table style={{width: "100%", border: "2px solid  #000"}}>
                
                <tr>
                    <td>
                        
                    </td>
                    <th id="slot-2-text">
                        PT SUN EDUCATION
                    </th>
                    <th id="slot-2-border">
                        BERLAKU EFEKTIF
                    </th>
                    <th id="slot-2-border">
                        NO. REVISI
                    </th>
                </tr>

                <tr>
                    <td>
                        <img src="./SunEduLogo.png" id="logo-sun" />
                    </td>
                    <th id="slot-2-text">
                        FORM LOGISTIK & PROCUREMENT
                    </th>
                    <th id="slot-2-border">
                        29 Juli 2015
                    </th>
                    <th id="slot-2-border">
                        01
                    </th>                    
                </tr>

                <tr>
                    <td>
                        
                    </td>
                    <td id="slot-2-bot">
                        PERMINTAAN PEMBELIAN BARANG & JASA
                    </td>
                    <th id="slot-2-border">
                        NO. DOKUMEN
                    </th>
                    <th id="slot-2-border">
                        HALAMAN
                    </th>
                </tr>

                <tr>
                    <td>

                    </td>
                    <td id="slot-2">

                    </td>
                    <th id="slot-2-border">
                        SE.FM.LGS.009
                    </th>
                    <th id="slot-2-border">
                        1/1
                    </th>
                </tr>
            </table>
        </div>

        <div id="middle">
            <div id="row-section-extra">
                <div id="row-section">
                    <h4>
                        No. PR:
                    </h4>
                    <p id="p-section">
                        &nbsp;...../L&P/......./.....
                    </p>
                </div>

                <div id="row-section">
                    <h4>
                        Tanggal:
                    </h4>
                    <p id="p-section">
                        &nbsp;27 April 2022
                    </p>
                </div>
            </div>

            <div id="row-section-extra">
                <div id="row-section">
                    <h4>
                        Project:
                    </h4>
                    <p id="p-section">
                        &nbsp;...................
                    </p>
                </div>
            
                <div id="row-section">
                    <h4>
                        Departmen:
                    </h4>
                    <p id="p-section">
                        &nbsp;Operation
                    </p>
                </div>
            </div>
        </div>

        <div id="table">
            <table style={{width: "100%"}}>
                <tr>
                    <th id="number-section">
                        No.
                    </th>
                    <th id="code-section">
                        Code
                    </th>
                    <th id="item-section">
                        Nama Barang & Jasa
                    </th>
                    <td id="Qty-section">
                        Quantity
                    </td>
                    <td>
                        &nbsp;
                    </td>                
                    <th id="total-price-section">
                        Harga Total
                    </th>
                    <th id="supplier-section">
                        Nama Supplier(Alamat/Telepon/Kartu Nama)
                    </th>
                    <th id="claim-section">
                        Claimable
                    </th>

                    <tr>
                        <td id="dummy-table">
                            
                        </td>                    
                        <td id="dummy-table">
                            
                        </td>
                        <td id="dummy-table">
                            
                        </td>
                        <th id="qty-inside">
                            Jmlh
                        </th>
                        <th id="qty-inside">
                            UoM
                        </th>
                        <td id="dummy-table">
                        </td>
                        <td id="dummy-table">                            
                        </td>                    
                    </tr>
                    
                 
                    <th>
                        1
                    </th>
                    <th>
                        IPS1233
                    </th>
                    <th>
                        How To Train your dragon Book vol 1
                    </th>
                    <th>
                        1
                    </th>
                    <th>
                        unit
                    </th>
                    <th>
                        Rp. 25.000
                    </th>
                    <th>
                        Banta
                    </th>
                    <th>
                        <div>
                            Yes
                            <div id="box"/>
                        </div>
                        <div>
                            No
                            <div id="box"/>
                        </div>
                    </th>
                </tr>
            </table>

            <div id="row-section">
                <div style={{border: "1px solid #000", width: "170mm !important"}}>
                    <h4>Alasan Pembelian barang dan jasa:</h4>
                    <h4>&nbsp; &nbsp;1. Untuk Sun Education Alamsutera</h4>
                    <div id="row-section">
                        <h4>Diharapkan tersedia pada tanggal: </h4>
                        <p id="p-section" style={{textDecoration: "underline"}}>&nbsp;4 May 2022</p>
                    </div>
                </div>

                <div style={{border: "1px solid #000" ,width: "80mm !important"}}>                    
                    <div id="row-section" style={{height: "40px",marginLeft: "10px"}}>
                        <h5>Nilai Claim: </h5>
                        <p id="p-section">&nbsp;................</p>
                    </div>
                    <div id="row-section" style={{height: "40px",marginLeft: "10px"}}>
                        <h5>Claim Ke: </h5>
                        <p id="p-section">&nbsp;................</p>
                    </div>
                    <div id="row-section" style={{height: "40px",marginLeft: "10px"}}>
                        <h5>No. SO: </h5>
                        <p id="p-section">&nbsp;................</p>
                    </div>
                </div>
            </div>

            <div id="row-section">

                <div style={{borderLeft: "1px solid #000", borderBottom: "1px solid #000",width: "90mm !important"}}>
                    <h4 id='font-h4' style={{textAlign: "center"}}>Dibuat oleh:</h4>
                    <h4 id='font-h4' style={{marginTop: "20mm"}}></h4>
                    <h4 id='font-h4' style={{textAlign: "center"}}>(........................)</h4>                    
                    <h4 id='font-h4' style={{textAlign: "center"}}>Karyawan</h4>
                </div>
                <div style={{borderBottom: "1px solid #000", width: "90mm !important"}}>
                    <h4 id='font-h4' style={{textAlign: "center"}}>Disetujui oleh:</h4>
                    <h4 id='font-h4' style={{marginTop: "20mm"}}></h4>
                    <h4 id='font-h4' style={{textAlign: "center"}}>(........................)</h4>
                    <h4 id='font-h4' style={{textAlign: "center"}}>Atasan Langsung</h4>
                </div>
                <div style={{borderBottom: "1px solid #000", borderRight: "1px solid #000", width: "90mm !important"}}>
                    <h4 id='font-h4' style={{textAlign: "center"}}>Diketahui oleh:</h4>
                    <h4 id='font-h4' style={{marginTop: "20mm"}}></h4>
                    <h4 id='font-h4' style={{textAlign: "center"}}>(........................)</h4>
                    <h4 id='font-h4' style={{textAlign: "center"}}>L&P Coordinator</h4>
                </div>
            </div>

            <div style={{border: "1px solid #000", background: "#c4c4c4"}}>
                <p style={{textAlign: "center", width: "100% !important"}}>Untuk barang-barang sistem informasi harus direview terlebih dahulu oleh departmen IT, dan barang-barang kebutuhan
                kantor harus direiview oleh departemen GA</p>
            </div>

            <div id="row-section">
            
                <div style={{border: "1px solid #000", width: "90mm !important"}}>
                    <h4 id='font-h4' style={{textAlign: "center"}}>Direview oleh:</h4>
                    <h4 id='font-h4' style={{marginTop: "20mm"}}></h4>
                    <h4 id='font-h4' style={{textAlign: "center"}}>(........................)</h4>
                    <h4 id='font-h4' style={{textAlign: "center"}}>Karyawan</h4>
                </div>
                <div style={{border: "1px solid #000", width: "160mm !important"}}>
                    <h4 style={{textAlign: "center"}}>Catatan:</h4>
                    <h4 id='font-h4' style={{marginTop: "10mm"}}></h4>
                    <h4 id='font-h4' style={{textAlign: "center"}}>Transfer ke Rek BCA : 345 2444 175 A/N: Muhamad Apid</h4>                    
                </div>                
            </div>
        </div>
    </div>
        </>
    )
}

export default TestPdf