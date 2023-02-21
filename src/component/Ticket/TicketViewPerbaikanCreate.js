import React from "react";
import { Formik, Form, Field, FieldArray,  } from "formik";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "../../logic/AuthenticationService";
import ImageTicket from "../atom/imageTicket";

function TicketViewPerbaikanCreate({ state, dispatch, ticketData, setTitle }) {
 
  const axiosConfig = AuthenticationService.getAxiosConfig();
  
  const initialValues = ticketData;
  const processInventori = async ({ values, inventori, setFieldValue }) => {
    try {
      const res = await axios.post(
        `${config.SERVER_URL}ticketperbaikan/processinventori`,
        {
          ticket: values,
          inventori,
        },
        axiosConfig
      );
      setFieldValue("status", res.data.status);
      setFieldValue("inventoris", res.data.inventoris);
    } catch (e) {
      console.log(e);
    }
  };
  const declineInventori = async ({ values, inventori, setFieldValue }) => {
    try {
      const res = await axios.post(
        `${config.SERVER_URL}ticketperbaikan/declineinventori`,
        {
          ticket: values,
          inventori,
        },
        axiosConfig
      );
      setFieldValue("status", res.data.status);
      setFieldValue("inventoris", res.data.inventoris);
    } catch (e) {
      console.log(e);
    }
  };
  const processTicket = async ({ values, setFieldValue }) => {
    try {
      const res = await axios.post(
        `${config.SERVER_URL}ticketperbaikan/processticket`,
        {
          ticket: values,
        },
        axiosConfig
      );
      if(res.status === 200){
        dispatch({ type: "LIST" });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onSubmit = async (values) => {
    try {
      const res = await axios.put(
        `${config.SERVER_URL}ticketperbaikan`,
        { ticket: values, user: state.userState },
        axiosConfig
      );
      dispatch({ type: "VIEW", id: res.data.id, row: res.data });
    } catch (e) {
      console.log(e);
    }
  };

 

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      // validationSchema={validationSchema}
    >
      {({ values, setFieldValue }) => (
        <React.Fragment>
          <Form>
            <div className="row clearfix">
              <div className="col-sm-12">
                <label> Subject</label>
                <div className="form-group">
                  <div className="form-line">
                    <Field
                      disabled={true}
                      type="text"
                      className="form-control"
                      id="subject"
                      name="subject"
                    />
                  </div>
                </div>
                <label> Tanggal</label>
                <div className="form-group">
                  <div className="form-line">
                    <Field
                      type="date"
                      disabled={true}
                      className="form-control"
                      id="tanggal_pengajuan"
                      name="tanggal_pengajuan"
                    />
                  </div>
                </div>
                <label> Jenis Perbaikan</label>
                <div className="form-group">
                  {
                      ticketData?.inventoris?.length === 0 ? "-" : ticketData?.inventoris[0]?.jenis_perbaikan
                    }
                </div>
                <label> Request By</label>
                <div className="form-group">
                  <div className="form-line">
                    <Field
                      disabled={true}
                      type="text"
                      className="form-control"
                      placeholder="Question"
                      id="fullname"
                      name="fullname"
                    />
                  </div>
                </div>

                <label> Status</label>
                <div className="form-group">
                  <div className="form-line">
                    <Field
                      disabled={true}
                      type="text"
                      className="form-control"
                      placeholder="Question"
                      value={state.statusMapping[ticketData.status]}
                    />
                  </div>
                </div>
              </div>
            </div>
            <label> Detail</label>
            <FieldArray name="inventoris">
              {(params) => {
                const { form } = params;
                const { inventoris } = form.values;
                return (
                  <React.Fragment>
                    <table className="table table-bordered ">
                      <thead>
                        <tr>
                          <th>Hardware</th>
                          <th>No Asset</th>
                          <th>Merek</th>
                          <th>Tipe</th>
                          <th>Serial Number</th>
                          <th>Keterangan</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventoris.map((item, index) => (
                          <tr key={index}>
                            <td>{inventoris[index].nama_hardware}</td>
                            <td>{inventoris[index].no_asset}</td>
                            <td>{inventoris[index].merek}</td>
                            <td>{inventoris[index].tipe}</td>
                            <td>{inventoris[index].serial_number}</td>
                            <td>
                              <Field
                                disabled={true}
                                as="textarea"
                                className="form-control"
                                rows="2"
                                name={`inventoris[${index}].keterangan`}
                              />
                            </td>
                            <td>
                              {state.statusMapping[inventoris[index].status]}
                            </td>

                            <td>
                              {inventoris[index].status === 1 ? (
                                <React.Fragment>
                                  <button
                                    type="button"
                                    style={{ margin: "10px" }}
                                    className="btn btn-primary waves-effect"
                                    onClick={() => {
                                      processInventori({
                                        values,
                                        inventori: item,
                                        setFieldValue,
                                      });
                                    }}
                                  >
                                    Process
                                  </button>
                                  <button
                                    type="button"
                                    style={{ margin: "10px" }}
                                    className="btn btn-primary waves-effect"
                                    onClick={() => {
                                      declineInventori({
                                        values,
                                        inventori: item,
                                        setFieldValue,
                                      });
                                    }}
                                  >
                                    Decline
                                  </button>
                                </React.Fragment>
                              ) : null}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </React.Fragment>
                );
              }}
            </FieldArray>
            <div className="row clearfix">
              <div className="col-sm-12">
                <label> Alasan</label>
                <div className="img-ticket" style={{display:"flex", justifyContent: "space-around"}}>
                  <ImageTicket srcImg={initialValues?.image1path === "" ?"":`${config.SERVER_BASE_URL}${initialValues?.image1path}`}/>
                  <ImageTicket srcImg={initialValues?.image2path === "" ?"":`${config.SERVER_BASE_URL}${initialValues?.image2path}`}/>
                  <ImageTicket srcImg={initialValues?.image3path === "" ?"":`${config.SERVER_BASE_URL}${initialValues?.image3path}`}/>
                </div>
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
                {state.userState === "ADMIN" ? (
                  <button
                    className="btn btn-primary"
                    style={{ margin: "5px" }}
                    type="button"
                    onClick={() => {
                      processTicket({ values, setFieldValue });
                    }}
                  >
                    Process
                  </button>
                ) : null}
                <button
                  className="btn btn-primary"
                  style={{ margin: "5px" }}
                  type="button"
                  onClick={() => {
                    dispatch({ type: "LIST" });
                  }}
                >
                  Back
                </button>
              </div>
            </div>
          </Form>
        </React.Fragment>
      )}
    </Formik>
  );
}

export default TicketViewPerbaikanCreate;
