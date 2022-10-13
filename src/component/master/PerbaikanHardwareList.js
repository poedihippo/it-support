import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "./../../logic/AuthenticationService";

function PerbaikanHardwareList({ state, dispatch }) {
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [updateDelete, setUpdateDelete] = useState(true)
  const [isDataDelete, setIsDataDelete] = useState()
  const axiosConfig = AuthenticationService.getAxiosConfig();
  useEffect( () => {
    const handleDeleteUpdate = async () => {
      try {
        const res = await axios.get(
          `${config.SERVER_URL}perbaikanhardware`,
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
    updateDelete && handleDeleteUpdate()
  }, [updateDelete]);
  
  const handleDelete = (e) => {
    if(e.currentTarget.textContent.toUpperCase() === "YES"){
      axios.delete(`${config.SERVER_URL}perbaikanhardware/${isDataDelete}`, axiosConfig)
      .then(data => {
        setUpdateDelete(true)
        setIsDelete(false)
      })
      .catch(error => console.log(error.response))
    }else{  
      setIsDelete(false)
    }
  }
  const deleteData = (d) => {
    setUpdateDelete(false)
    setIsDelete(true);
    setIsDataDelete(d)
  }
  return (
    <React.Fragment>
      <section className="content" style={{position:"relative"}}>
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
                  <h2>Perbaikan Hardware List</h2>
                </div>
                <div className="body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover js-mailing-list dataTable button-demo">
                      <thead>
                        <tr>
                          <th>Tanggal Pengajuan</th>
                          <th>Vendor</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((i) => (
                          <tr key={i.id}>
                            <td>{i.tanggal_pengajuan}</td>
                            <td>{i.nama_pt}</td>
                            <td>{state.statusMapping[i.status]}</td>
                            <td>
                              {state.statusMapping[i.status].toUpperCase() !== "COMPLETED" && (<button
                                type="button"
                                className="btn btn-primary waves-effect "
                                onClick={() => {
                                  dispatch({
                                    type: "EDIT",
                                    id: i.id,
                                    row: i,
                                  });
                                }}
                              >
                                Edit
                              </button>)}
                              <button
                                type="button"
                                className="btn btn-primary waves-effect "
                                onClick={() => {
                                  dispatch({ type: "VIEW", id: i.id, row: i });
                                }}
                              >
                                View
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger waves-effect "
                                onClick={() => {
                                  deleteData(i.id)
                                }}
                              >
                                Delete
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

export default PerbaikanHardwareList;
