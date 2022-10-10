import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "./../../logic/AuthenticationService";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

function FormPermintaanList({ state, dispatch }) {
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isDataDelete, setIsDataDelete] = useState()
  const axiosConfig = AuthenticationService.getAxiosConfig();
  const axiosConfigV1 = AuthenticationService.getAxiosConfigV1()
  const generatePDF = async () => {
    console.log(data, "check data");
    
    // await axios.post(
    //   `${config.SERVER_URL}formpermintaan/generatepdf`,
    //   "test",
    //   axiosConfig
    // );
  };
  useEffect(() => {
   
    axios
      .get(`${config.SERVER_URL}formpermintaan`, axiosConfig)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
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
                      type="button"
                      className="btn btn-primary waves-effect"
                      onClick={() => {
                        generatePDF();
                      }}
                    >
                      pdf
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
