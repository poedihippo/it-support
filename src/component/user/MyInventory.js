import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "../../logic/AuthenticationService";
// import dateFormat from "dateformat";
// const statusMapping = [
//   "Declined",
//   "Create",
//   "Approve By Supervisor",
//   "In Progress",
//   "Shipping",
//   "Completed",
// ];

function MyInventory() {
  const [inventoryData, setInventoryData] = useState({
    permintaan: [],
    peminjaman: [],
  });
  const axiosConfig = AuthenticationService.getAxiosConfig();

  useEffect(() => {
    // Update the document title using the browser API
    //console.log(state);
    const getInventory = async () => {
      let permintaan = [];
      let peminjaman = [];
      try {
        const resPermintaan = await axios.get(
          `${config.SERVER_URL}user/myinventory`,
          axiosConfig
        );
    
        if (resPermintaan.status === 200) {
          permintaan = resPermintaan.data;
        }
        const resPeminjaman = await axios.get(
          `${config.SERVER_URL}user/myinventory`,
          axiosConfig
        );
        //console.log(res.data);
  
        if (resPeminjaman.status === 200) {
          //console.log("my inventory", resPeminjaman.data);
          peminjaman = resPeminjaman.data;
          //setInventoryData({ ...inventoryData, peminjaman: resPeminjaman.data });
        }
        setInventoryData({
          peminjaman,
          permintaan,
        });
      } catch (e) {
        console.log(e);
      }
    }
    getInventory()
  }, []);
  //console.log(data);
  return (
    <React.Fragment>
      <section className="content">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2> My Inventory </h2>
                </div>
                <div className="body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover js-mailing-list dataTable button-demo">
                      <thead>
                        <tr>
                          <th>Nomor Asset</th>
                          <th>Nama Hardware</th>
                          <th>Nomor Seri</th>
                          <th>Merek</th>
                          <th>Tipe</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventoryData.permintaan[0] !== undefined
                          ? inventoryData.permintaan.map((i) => (
                              <tr key={i.id}>
                                <td>{i.no_asset}</td>
                                <td>{i.nama_hardware}</td>
                                <td>{i.serial_number}</td>
                                <td>{i.merek}</td>
                                <td>{i.tipe}</td>
                              </tr>
                            ))
                          : null}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="header">
                  <h2>Inventory Peminjaman</h2>
                </div>
                <div className="body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover js-mailing-list dataTable button-demo">
                      <thead>
                        <tr>
                          <th>Nomor Asset</th>
                          <th>Nama Hardware</th>
                          <th>Nomor Seri</th>
                          <th>Merek</th>
                          <th>Tipe</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventoryData.peminjaman[0] !== undefined
                          ? inventoryData.peminjaman.map((i) => (
                              <tr key={i.id}>
                                <td>{i.no_asset}</td>
                                <td>{i.nama_hardware}</td>
                                <td>{i.serial_number}</td>
                                <td>{i.merek}</td>
                                <td>{i.tipe}</td>
                              </tr>
                            ))
                          : null}
                      </tbody>
                    </table>
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

export default MyInventory;
