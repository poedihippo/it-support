/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import $, { param } from "jquery";
import "datatables.net";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "./../../logic/AuthenticationService";

function PublicEmailAdminList({ state, dispatch }) {
  const [isDelete,setIsDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState()
  const [data, setData] = useState([]);
  const publicEmailId = state.publicEmailId;
  const axiosConfig = AuthenticationService.getAxiosConfig();
  useEffect(async () => {
    const res = await axios.get(
      `${config.SERVER_URL}publicemailadmin/publicemail`,
      {
        ...axiosConfig,
        params: { publicemail_id: publicEmailId },
      }
    );
    if (res.status === 200) {
      setData(res.data);
      $(".js-mailing-list").DataTable({
        responsive: true,
      });
    }
  }, []);
  const deleteData = async (data) => {
    setIsDelete(true);
    setDataDelete(data)
  };
  const handleDelete = (e) => {
    if(e.currentTarget.textContent.toUpperCase() === "YES"){
      axios.delete(`${config.SERVER_URL}publicemailadmin`, {
        ...axiosConfig,
        params: { publicemail_id: publicEmailId, user_id: dataDelete.user_id },
      })
      .then((res) => {
        if (res.status === 200){
          setIsDelete(false)
          setData(res.data);
        }
      });
    } else {
      setIsDelete(false)
    }
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
                  <h2>Public Email Admin</h2>
                </div>
                <div className="body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover js-mailing-list dataTable button-demo">
                      <thead>
                        <tr>
                          <th>Email</th>
                          <th>Fullname</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.length !== 0 && data?.map((i) => (
                          <tr key={i.user_id}>
                            <td>{i.email}</td>
                            <td>{i.fullname}</td>
                            <td>
                              <button
                                className="btn btn-danger waves-effect "
                                onClick={() => {
                                  deleteData(i)
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
                        window.location.assign(`/publicemail`)
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

export default PublicEmailAdminList;
