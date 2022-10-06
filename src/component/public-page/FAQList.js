/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "./../../logic/AuthenticationService";
import dateFormat from "dateformat";

function FAQList({ state, dispatch }) {
  const [data, setData] = useState([]);
  const [isDeleteData, setIsDeleteData] = useState();
  const [isDelete, setIsDelete] = useState(false)
  const axiosConfig = AuthenticationService.getAxiosConfig();
  const deleteData = async (values) => {
    setIsDelete(true);
    setIsDeleteData(values)
  };
  useEffect( () => {
    const getDataFaq = async () => {
      try {
        const res = await axios.get(`${config.SERVER_URL}faq`, axiosConfig);
        setData(res.data);
        $(".js-mailing-list").DataTable({
          responsive: true,
          ordering: false,
        });
      } catch (e) {
        console.log(e);
      }
    }
    getDataFaq()
    
  }, []);
  const handleDelete = async (event) => {
    if(event.currentTarget.textContent.toUpperCase() === "YES"){
      try {
        const deleteResult = await axios.delete(
          `${config.SERVER_URL}faq/${isDeleteData.id}`,
          axiosConfig
        );
        if (deleteResult.data.error_code === 0) {
          const res = await axios.get(`${config.SERVER_URL}faq`, axiosConfig);
          setIsDelete(false)
          setData(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsDelete(false)
    }
  }
  return (
    <React.Fragment>
      <section className="content" style={{position:"relative"}}>
      <div style={{position:"absolute", zIndex: "10", backgroundColor: "rgb(0,0,0, 0.5)", height: "100%", width:"100rem", display: isDelete ? "block": "none"}} role="dialog">
          <div className={`${isDelete ? "" : "modal"} position-absolute`}style={{position:"absolute", zIndex: "11", top:"50%", transform: "translateY(-50%)", left:"0", right: "0", margin: "auto"}} tabindex="-1" role="dialog">
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
                  <h2>FAQ List</h2>
                </div>
                <div className="body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover js-mailing-list dataTable button-demo">
                      <thead>
                        <tr>
                          <th>Question</th>
                          <th>Post</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((i) => (
                          <tr key={i.id}>
                            <td>{i.question}</td>
                            <td>
                              {dateFormat(i.createdAt, "dddd, mmmm dS, yyyy")}
                            </td>
                            <td>
                              <button
                                className="btn btn-primary waves-effect "
                                onClick={() => {
                                  dispatch({ type: "EDIT", id: i.id, row: i });
                                }}
                              >
                                Edit
                              </button>
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
                        window.location.assign(`/`)
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

export default FAQList;
