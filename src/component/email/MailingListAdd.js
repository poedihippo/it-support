import React, { useState } from "react";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "./../../logic/AuthenticationService";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import IsLoading from "../loading";
function MailingListAdd({ state, dispatch }) {
  const [isLoad, setIsLoad] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);
  const axiosConfig = AuthenticationService.getAxiosConfig();
  const axiosConfigV1 = AuthenticationService.getAxiosConfigV1()
  const initialValues = {
    id: "",
    email: "",
    deskripsi: "",
  };
  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    deskripsi: Yup.string(),
  });

  const onSubmit = async (data) => {
    setIsLoad(true)
    try {
      const res = await axios.post(
        `${config.SERVER_URL}mailinglist`,
        data,
        axiosConfigV1
      );

      if (res.data.error_code === 0) {
        setIsLoad(false)
        dispatch({ type: "LIST" });
      } else {
        setErrorMessage(res.data.message);
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
                              <div className="form-group">
                                <div
                                  className={`form-line ${
                                    errors.email && touched.email
                                      ? "focused error"
                                      : null
                                  }`}
                                >
                                  <Field
                                    type="text"
                                    className={`form-control `}
                                    placeholder="Email"
                                    id="email"
                                    name="email"
                                  />
                                </div>
                                {errors.email && touched.email ? (
                                  <label class="error">{errors.email}</label>
                                ) : null}
                              </div>
                              <div className="form-group">
                                <div className="form-line">
                                  <Field
                                    as="textarea"
                                    className="form-control"
                                    placeholder="Deskripsi"
                                    id="deskripsi"
                                    name="deskripsi"
                                  />
                                </div>
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
                                  dispatch({type: "LIST"})
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
                </Form>
              );
            }}
          </Formik>
        </div>
      </section>
    </React.Fragment>
  );
}

export default MailingListAdd;
