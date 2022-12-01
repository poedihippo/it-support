import React, { useState } from "react";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "./../../logic/AuthenticationService";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import IsLoading from "../loading";
function PublicEmailAdminAdd({ state, dispatch }) {
  const [isLoad, setIsLoad] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);
  const publicEmailId = state.publicEmailId;
  const [datas, setData] = useState({
    publicemail_id: publicEmailId,
    email: "",
  });
  const initialValues = {
    publicemail_id: publicEmailId,
    email: "",
  };
  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email"),
  });
  const axiosConfig = AuthenticationService.getAxiosConfig();
  const onSubmit = async (data) => {
    const multEmail = {
      publicemail_id: datas.publicemail_id,
      email: datas.email.replace('\n', ',')
    }
    setIsLoad(true)

    try {
      const res = await axios.post(
        `${config.SERVER_URL}publicemailadmin`,
        multEmail,
        axiosConfig
      );
      if (res.data.error_code !== 0) {
        setIsLoad(false)
        setErrorMessage(res.data.message);
      } else {
        setIsLoad(false)
        dispatch({ type: "LIST" });
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
            <h2>Public Email Admin</h2>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={ValidationSchema}
          >
            {({ errors, touched, isValidating }) => {
              return (
                <Form>
                  <div className="row clearfix">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="card">
                        <div className="body">
                          <>
                            {errorMessage ? (
                              <div class="alert alert-warning " role="alert">
                                {`${errorMessage}`}
                              </div>
                            ) : null}
                          </>
                          <h2 className="card-inside-title">Add</h2>
                          <div className="row clearfix">
                            {!isLoad ? (<div className="col-sm-12">
                              <label> Email</label>
                              <div className="form-group">
                                {/* <div
                                  className={`form-line ${
                                    errors.email && touched.email
                                      ? "focused error"
                                      : null
                                  }`}
                                >
                                  <Field
                                    type="textarea"
                                    className={`form-control `}
                                    placeholder="Email"
                                    id="email"
                                    name="email"
                                  />
                                </div> */}
                                <div className="form-line">
                                  <textarea
                                    rows="5"
                                    name="email"
                                    className="form-control no-resize"
                                    value={datas.email}
                                    onChange={(e) => setData(prev => {return{...prev, [e.target.name]: e.target.value}})}
                                  ></textarea>
                                </div>
                                {errors.email && touched.email ? (
                                  <label class="error">{errors.email}</label>
                                ) : null}
                              </div>
                            </div>)
                            :<IsLoading />}
                            <div className="col-sm-12">
                              <button className="btn btn-primary" type="submit">
                                Save
                              </button>
                              <button
                                style={{marginLeft: "40px"}}
                                  className="btn btn-primary waves-effect"
                                  onClick={() => {
                                    dispatch('LIST')
                                  }}
                              >Back</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </section>
    </React.Fragment>
  );
}

export default PublicEmailAdminAdd;
