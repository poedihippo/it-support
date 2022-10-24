import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "./../../logic/AuthenticationService";

function SoftwareLisenceList({ state, dispatch }) {
  const [data, setData] = useState([]);
  const axiosConfig = AuthenticationService.getAxiosConfig();
  const softwareData = state.currentRow;
  const softwareId = state.currentId;
  useEffect( async () => {

    // const getDataLisenceList = async () => {
    //   const tokenAuth = await localStorage.getItem("token");
    //   console.log(tokenAuth, "check softwareLisenceList", softwareId)
    //   fetch(`${config.SERVER_URL}softwarelisence/software/${softwareId}`, {
    //     method: "GET",
    //     headers: {
    //       Authorization: "Bearer " + tokenAuth,
    //     },
    //   })
    //   .then(data => data.json())
    //   .then(res => {
        
    //     console.log(res, "check re")
    //     setData(res)
    //     $(".js-mailing-list").DataTable({
    //       responsive: true,
    //     });
    //   })
    //   .catch(error => {
    //     console.log(error.response, "check")
    //   })
    // } 
    // getDataLisenceList()

    try {
      const res = await axios.get(
        `${config.SERVER_URL}softwarelisence/software/${softwareId}`,
        axiosConfig
      );
      setData(res.data);
      $(".js-mailing-list").DataTable({
        responsive: true,
      });
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <React.Fragment>
      <section className="content">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Software Lisence List</h2>
                </div>
                <div className="body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover js-mailing-list dataTable button-demo">
                      <thead>
                        <tr>
                          <th>Nama Software</th>
                          <th>Form Permintaan</th>
                          <th>Harga</th>
                          <th>Lisence Id</th>
                          <th>Tanggal Aktif</th>
                          <th>Tanggal Expired</th>
                          <th>Tanggal Pembelian</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((i) => (
                          <tr key={i.id}>
                            <td>{softwareData.nama_software}</td>
                            <td>{i.form_permintaan}</td>
                            <td>{i.harga}</td>
                            <td>{i.lisence_id}</td>
                            <td>{i.tanggal_aktif}</td>
                            <td>{i.tanggal_expired}</td>
                            <td>{i.tanggal_pembelian}</td>
                            <td>
                              <button
                                type="button"
                                onClick={() => {
                                dispatch({ type: "VIEW_LISENCE", id:softwareId, row:{main:softwareData, lisence:softwareData, dataLisence:i} });
                              }}
                                className="btn btn-primary waves-effect "
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div>
                  <button
                    className="btn btn-primary waves-effect"
                    onClick={() => {
                      dispatch({ type: "LIST" });
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

export default SoftwareLisenceList;
