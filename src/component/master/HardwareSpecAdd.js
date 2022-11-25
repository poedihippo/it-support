import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "./../../logic/AuthenticationService";
import IsLoading from "../loading";
function HardwareSpecAdd({ state, dispatch }) {
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState("")
  const [categoryData, setCategoryData] = useState([]);
  const [isConsumable, setIsConsumable] = useState("0");
  const axiosConfig = AuthenticationService.getAxiosConfig();
  console.log(state, "check state")
  const initialValues = {
    nama_hardware: "",
    kode_inventori: "-",
    seq_inventori: 0,
    consumable: true,
    deskripsi: "",
    spesifikasi: [],
  };
  useEffect(() => {
    const getDataHardware = async () => {
      const resData = await axios.get(`${config.SERVER_URL}hardwarespec`, axiosConfig)
      .then(res => {
        setCategoryData(res.data)
      })
      .catch(error => {
        console.log(error, "check eerror")
      })
    }
    getDataHardware()
  }, [])
  const validationSchema = Yup.object({
    nama_hardware: Yup.string().required("harus diisi"),
    kode_inventori: Yup.string().required("harus diisi"),
    seq_inventori: Yup.string().required("harus diisi"),
  });
  const onSubmit = (values) => {
    for(let ind = 0; ind <= categoryData.length; ind++){
      if(values.kode_inventori.toString() === categoryData[ind].kode_inventori.toString()){
        setIsError('Kode Inventori Sudah Terdaftar')
        break;
      }
      if(ind === categoryData.length - 1){
        setIsLoad(true)
        if (isConsumable === "1") {
          values.kode_inventori = "-";
          values.consumable = true;
        } else {
          values.consumable = false;
        }

        axios
        .post(`${config.SERVER_URL}hardwarespec`, values, axiosConfig)
        .then((res) => {
          setIsLoad(false)
          dispatch({ type: "LIST" });
        })
        .catch((err) => console.log(err));
      }
    }
    // categoryData.map(datas => {
    //   if(datas.kode_inventori === values.kode_inventori){
    //     setIsLoad(true)
    //     if (isConsumable === "1") {
    //       values.kode_inventori = "-";
    //       values.consumable = true;
    //     } else {
    //       values.consumable = false;
    //     }

    //     axios
    //     .post(`${config.SERVER_URL}hardwarespec`, values, axiosConfig)
    //     .then((res) => {
    //       setIsLoad(false)
    //       dispatch({ type: "LIST" });
    //     })
    //     .catch((err) => console.log(err));
    //     }else {
    //       console.log('error')
    //     }
    //   })
    
    //console.log(values);

    
  };
  const handleErrorModal = () => {

  }
  return (
    <React.Fragment>
      <section className="content" style={{position:"relative"}}>
        <div role="dialog">
          <div className={`${isError !== "" ? "" : "modal"} position-absolute`}style={{position:"fixed", zIndex: "11", top:"50%", transform: "translateY(-50%)", left:"30rem", right: "0", margin: "auto"}} tabindex="-1" role="dialog">
            <div className="modal-dialog " role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <p>{isError}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={() => setIsError("")}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="block-header">
            <h2>Hardware Spesifikasi</h2>
          </div>

          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="body">
                  <h2 className="card-inside-title">Add</h2>
                  <div className="row clearfix">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <select
                          onChange={(e) => {
                            setIsConsumable(e.target.value);
                          }}
                          value={isConsumable}
                        >
                          <option value="1">Consumable</option>
                          <option value="0">Non Consumable</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {isConsumable === "1" ? (
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                      <Form>
                        <div className="row clearfix">
                          <div className="col-sm-12">
                            <label> Hardware</label>
                            <div className="form-group">
                              <div className="form-line">
                                <Field
                                  type="text"
                                  className="form-control"
                                  id="nama_hardware"
                                  name="nama_hardware"
                                />
                              </div>
                            </div>
                            <label> Deskripsi</label>
                            <div className="form-group">
                              <div className="form-line">
                                <Field
                                  as="textarea"
                                  rows="4"
                                  className="form-control no-resize"
                                  id="deskripsi"
                                  name="deskripsi"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <button className="btn btn-primary" type="submit">
                              Save
                            </button>
                          </div>
                        </div>
                      </Form>
                    </Formik>
                  ) : (
                    <Formik
                      initialValues={initialValues}
                      onSubmit={onSubmit}
                      validationSchema={validationSchema}
                    >
                      {({ errors, touched, isValidating }) => {
                        console.log("errors", errors);
                        return (
                          <Form>
                            <div className="row clearfix">
                              {!isLoad ? (<div className="col-sm-12">
                                <label> Hardware</label>
                                <div className="form-group">
                                  <div
                                    className={`form-line ${
                                      errors.nama_hardware &&
                                      touched.nama_hardware
                                        ? "focused error"
                                        : null
                                    }`}
                                  >
                                    <Field
                                      type="text"
                                      className="form-control"
                                      id="nama_hardware"
                                      name="nama_hardware"
                                    />
                                  </div>
                                  {errors.nama_hardware &&
                                  touched.nama_hardware ? (
                                    <label class="error">
                                      {errors.nama_hardware}
                                    </label>
                                  ) : null}
                                </div>
                                <label> Kode Inventori</label>
                                <div className="form-group">
                                  <div
                                    className={`form-line ${
                                      errors.kode_inventori &&
                                      touched.kode_inventori
                                        ? "focused error"
                                        : null
                                    }`}
                                  >
                                    <Field
                                      type="text"
                                      className="form-control no-resize"
                                      id="kode_inventori"
                                      name="kode_inventori"
                                    />
                                  </div>
                                  {errors.kode_inventori &&
                                  touched.kode_inventori ? (
                                    <label class="error">
                                      {errors.kode_inventori}
                                    </label>
                                  ) : null}
                                </div>
                                <label> Sequence Inventori</label>
                                <div className="form-group">
                                  <div
                                    className={`form-line ${
                                      errors.seq_inventori &&
                                      touched.seq_inventori
                                        ? "focused error"
                                        : null
                                    }`}
                                  >
                                    <Field
                                      className="form-control no-resize"
                                      id="seq_inventori"
                                      name="seq_inventori"
                                    />
                                  </div>
                                  {errors.seq_inventori &&
                                  touched.seq_inventori ? (
                                    <label class="error">
                                      {errors.seq_inventori}
                                    </label>
                                  ) : null}
                                </div>

                                <label> Deskripsi</label>
                                <div className="form-group">
                                  <div className="form-line">
                                    <Field
                                      as="textarea"
                                      rows="4"
                                      className="form-control no-resize"
                                      id="deskripsi"
                                      name="deskripsi"
                                    />
                                  </div>
                                </div>
                                <div className="col-sm-12">
                                  <label> Spesifikasi</label>
                                </div>
                                <FieldArray name="spesifikasi">
                                  {(fieldArrayProps) => {
                                    const { push, remove, form } =
                                      fieldArrayProps;
                                    const { values } = form;
                                    const { spesifikasi } = values;
                                    return (
                                      <React.Fragment>
                                        {spesifikasi.map((item, index) => (
                                          <React.Fragment key={index}>
                                            <div className="col-sm-12">
                                              <div className="col-sm-6">
                                                <div className="form-group">
                                                  <div className="form-line">
                                                    <Field
                                                      type="text"
                                                      className="form-control no-resize"
                                                      name={`spesifikasi[${index}]`}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="col-sm-6">
                                                <button
                                                  type="button"
                                                  className="btn btn-primary"
                                                  onClick={() => remove(index)}
                                                >
                                                  -
                                                </button>
                                              </div>
                                            </div>
                                          </React.Fragment>
                                        ))}
                                        <div className="col-sm-12">
                                          <button
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={() => {
                                              push("");
                                            }}
                                          >
                                            +
                                          </button>
                                        </div>
                                      </React.Fragment>
                                    );
                                  }}
                                </FieldArray>
                              </div>)
                              :<IsLoading />}

                              <div className="col-sm-12">
                                <button
                                  className="btn btn-primary"
                                  type="submit"
                                >
                                  Save
                                </button>
                                <button
                                    style={{marginLeft: "40px"}}
                                    className="btn btn-primary waves-effect"
                                    onClick={() => {
                                    dispatch({type:"LIST"})
                                  }}
                                >Back</button>
                              </div>
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default HardwareSpecAdd;
