import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "./../../logic/AuthenticationService";

function MailingListList({ state, dispatch }) {
  const [mailingListData, setMailingListData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState()
  const axiosConfig = AuthenticationService.getAxiosConfig();
  let mailingListObject = null;

  useEffect(() => {
    // const getDataMailingList = async () => {
    //   const tokenAuth = await localStorage.getItem("token")
    //   fetch(`${config.SERVER_URL}mailinglist`, {
    //     method: "GET",
    //     headers: {
    //       Authorization: "Bearer " + tokenAuth,
    //     },
    //   })
    //   .then(res => res.json())
    //   .then(res => {
    //     console.log(res, "check hasil")
    //     setMailingListData(res);
    //     $(".js-mailing-list").DataTable({
    //         responsive: true,
    //       });
    //   })
    //   .catch(error => console.log(error.response, "check error get mailinglist"))
    // }
    // getDataMailingList()
    // console.log(localStorage.getItem("token"), "check storaget")


    
    // Update the document title using the browser API
    
    axios.get(`${config.SERVER_URL}mailinglist`, axiosConfig).then((res) => {
      if (res.status === 200) {
        setMailingListData(res.data);
        $(".js-mailing-list").DataTable({
          responsive: true,
        });
      }
    }).catch(error => {
      console.log(error.response, "check error mailing list")
    })
  }, []);

  const deleteData = (data) => {
    setDataDelete(data)
    setIsDelete(true);
  };
  const handleDelete = (e) => {
    if(e.currentTarget.textContent.toUpperCase() === "YES"){
      axios
      .delete(`${config.SERVER_URL}mailinglist/${dataDelete.id}`, axiosConfig)
      .then((res) => {
        if (res.status === 200){
          setIsDelete(false)
          setMailingListData(res.data);
        }
      });
    } else {
      setIsDelete(false)
    }
  }
  return (
    <React.Fragment>
      <section className="content position-relative">
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
                          <th>Mailing List</th>
                          <th>Deskipsi</th>
                          <th>Member</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mailingListData.map((i) => (
                          <tr key={i.id}>
                            <td>{i.email}</td>
                            <td>{i.deskripsi}</td>
                            <td>{i.email_count}</td>
                            <td>
                              <button
                                className="btn btn-primary waves-effect "
                                onClick={() => {
                                  dispatch({ type: "EDIT", id: i.id, row: i });
                                }}
                              >
                                Edit
                              </button>
                              <a
                                href={`/mailinglistmember/${i.id}`}
                                className="btn btn-primary waves-effect "
                              >
                                Member
                              </a>
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
                        window.location.assign('/');
                      }}
                    >
                      Back
                    </button>
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

export default MailingListList;
