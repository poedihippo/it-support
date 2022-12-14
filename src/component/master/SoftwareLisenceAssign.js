import React from 'react';
import Axios from 'axios';
import config from "../../config.json";
import AuthenticationService from "./../../logic/AuthenticationService";
const SoftwareLisenceAssign = ({state, dispatch}) => {
    const dataLisence = state.currentRow.lisence;
    const softwareData = state.currentRow.main;
    const axiosConfig = AuthenticationService.getAxiosConfig();
    const handleAssign = async (data) => {
      console.log(data, "check data")
      Axios.post(`${config.SERVER_URL}softwarelisence`, data, axiosConfig)
      .then(res => console.log(res, "berarti berhasil"))
      .catch(error => console.log(error.response, "berarti ada yang error"))
    }
    return(
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
                          <th>ID Lisensi</th>
                          <th>Tanggal Aktif</th>
                          <th>Tanggal Expired</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataLisence.map((i) => (
                          <tr key={i.id}>
                            <td>{softwareData.nama_software}</td>
                            <td>{i.lisence_id}</td>
                            <td>{i.tanggal_aktif}</td>
                            <td>{i.tanggal_expired}</td>
                            <td>
                              <button
                                type="button"
                                onClick={() => {
                                handleAssign(i)
                              }}
                                className="btn btn-primary waves-effect "
                              >
                                Assign
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
    )
}

export default SoftwareLisenceAssign