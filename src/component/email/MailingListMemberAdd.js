import React, { useState } from "react";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "./../../logic/AuthenticationService";
import IsLoading from "../loading";
function MailingListMemberAdd({ state, dispatch }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoad, setIsLoad] = useState(false)
  const mailingListId = state.mailingListId;
  const [data, setData] = useState({
    mailinglist_id: mailingListId,
    email: "",
    fullname:"",
  });
  const axiosConfig = AuthenticationService.getAxiosConfig();
  const clickHandler = async () => {
    console.log(data, "check data")
    const resSplit = data.email.split('\n')
    console.log(resSplit, "check split data")
    
    setIsLoad(true)
    try {
      const res = await axios.post(
        `${config.SERVER_URL}mailinglistmember`,
        data,
        axiosConfig
      );
      console.log(res, "check")
      const { validEmail, inValidEmail } = res.data.payload;
      if (validEmail.length > 0) {
        let message = "";
        for (let index = 0; index < validEmail.length; index++) {
          message = message + validEmail[index] + " ,";
        }
        setIsLoad(false)
        setSuccessMessage(message);
      }
      if (inValidEmail.length > 0) {
        let message = "";
        for (let index = 0; index < inValidEmail.length; index++) {
          message = message + inValidEmail[index] + " ,";
        }
        setErrorMessage(message);
      }
    } catch (e) {
      console.log(e);
    }

  };

  return (
    <React.Fragment>
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>MailingList</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="body">
                  <>
                    {errorMessage ? (
                      <div className="alert alert-warning " role="alert">
                        {`${errorMessage} gagal ditambahkan`}
                      </div>
                    ) : null}
                    {successMessage ? (
                      <div className="alert alert-success " role="alert">
                        {`${successMessage} sukses ditambahkan`}
                      </div>
                    ) : null}
                  </>
                  <h2 className="card-inside-title">Add</h2>
                  <div className="row clearfix">
                    <div className="col-sm-12">
                      
                      {!isLoad ? (<><label> Emaill</label>
                      <div className="form-group">
                        <div className="form-line">
                          <textarea
                            rows="4"
                            className="form-control no-resize"
                            onChange={(e) =>
                              setData({ ...data, email: e.target.value })
                            }
                            value={data.email}
                          ></textarea>
                        </div>
                      </div><label> Full Name</label>
                      <div className='form-group'>
                            <div className='form-line'>
                              <textarea rows="4"
                                className="form-control no-resize"
                                onChange={(e) => setData({...data, fullname:e.target.value})
                              }
                              value={data.fullName}
                              ></textarea>
                            </div>
                        </div></>)
                      :<IsLoading />}
                    </div>
                    <div className="col-sm-12">
                      <button
                        className="btn btn-primary"
                        onClick={clickHandler}
                        style={{ margin: "5px" }}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-primary"
                        style={{ margin: "5px" }}
                        onClick={() => dispatch({ type: "LIST" })}
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
    </React.Fragment>
  );
}

export default MailingListMemberAdd;
