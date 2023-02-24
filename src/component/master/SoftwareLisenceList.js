import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "./../../logic/AuthenticationService";
import { useHistory } from "react-router-dom";
function SoftwareLisenceList({ state, dispatch }) {
  const [data, setData] = useState([]);
  const softwareData = state.currentRow;
  const softwareId = state.currentId;
  const history = useHistory()
  useEffect( () => {
    const axiosConfig = AuthenticationService.getAxiosConfig();
    

   const getData = async () => {
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
   }
   getData()
  }, [softwareId]);
  console.log(data, "check data")
  return (
    <React.Fragment>
      <section className="content">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Software License List</h2>
                </div>
                <div className="body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover js-mailing-list dataTable button-demo">
                      <thead>
                        <tr>
                          <th>Nama Software</th>
                          <th>Form Permintaan</th>
                          <th>Harga</th>
                          <th>License Id</th>
                          <th>Tanggal Aktif</th>
                          <th>Tanggal Expired</th>
                          <th>Tanggal Pembelian</th>
                          <th>Assigned Users</th>
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
                            <td>{i?.assigned_users}</td>
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
                              <button
                                type="button"
                                onClick={() => {
                                  history.push({
                                    pathname: `/software-lisence-assign-to/${i.id}`,
                                    state:i
                                  })
                                // dispatch({ type: "VIEW_LISENCE", id:softwareId, row:{main:softwareData, lisence:softwareData, dataLisence:i} });
                              }}
                                className="btn btn-primary waves-effect "
                              >
                                Assign To
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
                      // window.location.assign("/software")
                      // history.push("/software")
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
