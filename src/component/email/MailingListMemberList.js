/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "./../../logic/AuthenticationService";

function MailingListMemberList({ state, dispatch }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  const [isDeleteData, setIsDeleteData] = useState()
  const mailingListId = state.mailingListId;
  const axiosConfig = AuthenticationService.getAxiosConfig();
  //console.log(mailingListId);
  useEffect(async () => {
    try {
      setLoading(true);
      console.log("loading", loading);
      const res = await axios.get(
        `${config.SERVER_URL}mailinglistmember/mailinglist`,
        {
          ...axiosConfig,
          params: { mailinglist_id: mailingListId },
        }
      );
      console.log(res, "check list mailinglistmember")

      if (res.status === 200) {
        setData(res.data);

        setLoading(false);
        console.log("loading", loading);
      }
    } catch (e) {
      console.log(e);
    }
    $(".js-mailing-list").DataTable({
      responsive: true,
      ordering: false,
    });
  }, []);
  const deleteData = async (data) => {
    setIsDeleteData(data)
    setIsDelete(true)
    // try {
    //   const res = await axios.delete(`${config.SERVER_URL}mailinglistmember`, {
    //     ...axiosConfig,
    //     params: { mailinglist_id: mailingListId, email: data.email },
    //   });
      
    //   setData(res.data);
    // } catch (e) {
    //   console.log(e);
    // }
  };
  const handleDelete = async (e) => {
    if(e.currentTarget.textContent.toUpperCase() === "YES"){
      try {
        const res = await axios.delete(`${config.SERVER_URL}mailinglistmember`, {
          ...axiosConfig,
          params: { mailinglist_id: mailingListId, email: isDeleteData.email },
        });
        setIsDelete(false)
        setData(res.data);
      } catch (e) {
        console.log(e);
      }
    }else{
      setIsDelete(false)
    }
  }
  return (
    <React.Fragment>
      {!loading ? (
        <section className="content"style={{position:"relative"}}>
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
                    <h2>Mailing List</h2>
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
                          {data.map((i, index) => (
                            <tr key={i.email}>
                              <td>{i.email}</td>
                              <td>{i.fullname}</td>
                              <td>
                                <button
                                  className="btn btn-danger waves-effect "
                                  onClick={() => {
                                    deleteData(i);
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
                    <div className="row clearfix">
                      <div className="col-sm-12">
                        <button
                          className="btn btn-primary waves-effect"
                          onClick={() => {
                            dispatch({ type: "ADD" });
                          }}
                        >
                          Add
                        </button>
                        <button
                          className="btn btn-primary"
                          style={{ marginLeft: "40px" }}
                          onClick={() => window.location.assign('/mailinglist')}
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </React.Fragment>
  );
}

export default MailingListMemberList;
