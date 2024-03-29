import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "./../../logic/AuthenticationService";
import { useHistory } from "react-router-dom";
import dateFormat from "dateformat";
function TicketAddPermintaan({ state, dispatch }) {
  const [hardwareList, setHardwareList] = useState([]);
  const axiosConfig = AuthenticationService.getAxiosConfig();
  const history = useHistory();
  const today = dateFormat(new Date(), "yyyy-mm-dd");
  const defaultRow = {
    hardware_spec_id: 0,
    qty: 1,
    keterangan: "",
  };
  const initialValues = {
    tanggal_pengajuan: today,
    subject: "",
    alasan: "",
    details: [defaultRow],
  };
  const onSubmit = async (values) => {
    try {
      const res = await axios.post(
        `${config.SERVER_URL}ticketpermintaan`,
        values,
        axiosConfig
      );
      history.push("/my-ticket-list");
      //dispatch({ type: "LIST" });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect( () => {

  const axiosConfig = AuthenticationService.getAxiosConfig();
    const getHardwareSpec = async () => {
      try {
        const res = await axios.get(
          `${config.SERVER_URL}hardwarespec`,
          axiosConfig
        );
        setHardwareList(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    getHardwareSpec()
  }, []);

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        // validationSchema={validationSchema}
      >
        <Form>
          <div className="row clearfix">
            <div className="col-sm-12">
              <label> Subject</label>
              <div className="form-group">
                <div className="form-line">
                  <Field
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                  />
                </div>
              </div>
              <label> Tanggal Pengajuan</label>
              <div className="form-group">
                <div className="form-line">
                  <Field
                    disabled={true}
                    type="date"
                    className="form-control"
                    placeholder="Question"
                    id="tanggal_pengajuan"
                    name="tanggal_pengajuan"
                  />
                </div>
              </div>
            </div>
          </div>
          <label> Detail</label>
          <FieldArray name="details">
            {(params) => {
              const { form, push, remove } = params;
              const { details } = form.values;
              console.log("params", params);
              return (
                <React.Fragment>
                  <table className="table table-bordered ">
                    <thead>
                      <tr>
                        <th>Jenis Hardware</th>
                        <th>Jumlah</th>
                        <th>Keterangan</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {details.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <Field
                              as="select"
                              className="form-control"
                              name={`details[${index}].hardware_spec_id`}
                            >
                              <option value={0}>Pilih Hardware</option>
                              {hardwareList.map(
                                (hardwareItem, hardwareIndex) => (
                                  <option
                                    value={hardwareItem.id}
                                    key={`option${index}-${hardwareIndex}`}
                                  >
                                    {hardwareItem.nama_hardware}
                                  </option>
                                )
                              )}
                            </Field>
                          </td>
                          <td>
                            <Field
                              type="number"
                              className="form-control"
                              name={`details[${index}].qty`}
                            />
                          </td>
                          <td>
                            <Field
                              as="textarea"
                              className="form-control"
                              rows="2"
                              name={`details[${index}].keterangan`}
                            />
                          </td>
                          <td>
                            <button
                              type="button"
                              style={{ margin: "10px" }}
                              className="btn btn-primary waves-effect"
                              onClick={() => {
                                remove(index);
                              }}
                            >
                              [-]
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div>
                    <button
                      type="button"
                      style={{ margin: "10px" }}
                      className="btn btn-primary waves-effect"
                      onClick={() => {
                        push(defaultRow);
                      }}
                    >
                      [+]
                    </button>
                  </div>
                </React.Fragment>
              );
            }}
          </FieldArray>
          <div className="row clearfix">
            <div className="col-sm-12">
              <label> Alasan</label>
              <div className="form-group">
                <div className="form-line">
                  <Field
                    as="textarea"
                    rows="3"
                    className="form-control no-resize"
                    id="alasan"
                    name="alasan"
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <button className="btn btn-primary" type="submit">
                Save
              </button>
              <button style={{marginLeft: "50px"}} className="btn btn-primary" type="submit" onClick={() => window.location.assign('/')}>
                Back
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </React.Fragment>
  );
}

export default TicketAddPermintaan;
