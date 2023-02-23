import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "../../logic/AuthenticationService";
import ImageTicket from "../atom/imageTicket";
import HardwareInventoriAssign from "./HardwareInventoriAssign";

function TicketViewPerbaikanInProgress({
  state,
  dispatch,
  ticketData,
  setTitle,
}) {
  const [viewState, setViewState] = useState("VIEW");
  const [assignState, setAssignState] = useState("REPLACE");
  const [assignDetailData, setAssignDetailData] = useState([]);
  const [hardwareInventoryData, setHardwareInventoryData] = useState([]);
  const [idHardware, setIdHardware] = useState(0);
  const [shippingStatus, setShippingStatus] = useState(0)
  const axiosConfig = AuthenticationService.getAxiosConfig();
  
  const initialValues = ticketData;
  const processRepair = async ({ values, inventori, setFieldValue }) => {
    try {
      const res = await axios.post(
        `${config.SERVER_URL}ticketperbaikan/processrepairinventori`,
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

  const processReplace = async ({ values, inventori, setFieldValue }) => {
    try {
      const res = await axios.get(
        `${config.SERVER_URL}hardwareinventori/${inventori.hardware_spesifikasi_id}/available`,
        axiosConfig
      );
      const data = [];
      const mapping = [];
      res.data.forEach((item, index) => {
        mapping[item.no_asset] = item;
        if (data[item.hardware_spesifikasi_id] === undefined) {
          const specField = [];
          JSON.parse(item.spesifikasi, (key, value) => {
            if (key !== "") specField.push(key);
          });

          data[item.hardware_spesifikasi_id] = {
            specField,
            inventoris: [],
          };
        }
        const InventorySpec = [];
        JSON.parse(item.spesifikasi, (key, value) => {
          InventorySpec[key] = value;
        });
        data[item.hardware_spesifikasi_id].inventoris.push({
          ...item,
          spesifikasi: InventorySpec,
        });
      });
      const resDataReal = data.filter(d => Object.keys(d).length === 2)
      setHardwareInventoryData(resDataReal);
      setAssignState("REPLACE");
      setViewState("ASSIGN");
      setAssignDetailData({
        id: inventori.id,
        hardware_spec_id: inventori.hardware_spesifikasi_id,
      });
      setTitle(`Assign ${inventori.nama_hardware}`);
      //setHardwareInventoryDataMapping(mapping);
    } catch (e) {
      console.log(e);
    }
    // setAssignState("REPLACE");
    // setViewState("ASSIGN");
    // setAssignDetailData({
    //   id: inventori.id,
    //   hardware_spec_id: inventori.hardware_spesifikasi_id,
    // });
    // setTitle(`Assign ${inventori.nama_hardware}`);
  };
  const assignPeminjaman = async ({ values, inventori, setFieldValue }) => {
    try {
      const res = await axios.get(
        `${config.SERVER_URL}hardwareinventori/${inventori.hardware_spesifikasi_id}/available`,
        axiosConfig
      );
      const data = [];
      const mapping = [];
      res.data.forEach((item, index) => {
        
        mapping[item.no_asset] = item;
        if (data[item.hardware_spesifikasi_id] === undefined) {
          const specField = [];
          JSON.parse(item.spesifikasi, (key, value) => {
            if (key !== "") specField.push(key);
          });

          data[item.hardware_spesifikasi_id] = {
            specField,
            inventoris: [],
          };
        }
        const InventorySpec = [];
        JSON.parse(item.spesifikasi, (key, value) => {
          InventorySpec[key] = value;
        });
        data[item.hardware_spesifikasi_id].inventoris.push({
          ...item,
          spesifikasi: InventorySpec,
        });
      });
      const resDataReal = data.filter(d => Object.keys(d).length === 2)
      setHardwareInventoryData(resDataReal);
      setAssignState("PEMINJAMAN");
      setViewState("ASSIGN");
      setAssignDetailData({
        id: inventori.id,
        hardware_spec_id: inventori.hardware_spesifikasi_id,
      });
      setTitle(`Assign ${inventori.nama_hardware}`);
      //setHardwareInventoryDataMapping(mapping);
    } catch (e) {
      console.log(e);
    }
    //console.log("inventori", inventori);
    
  };
  const shippingPeminjaman = async ({ values, inventori, setFieldValue }) => {
    try {
      const res = await axios.post(
        `${config.SERVER_URL}ticketperbaikan/shippingpeminjaman`,
        {
          ticket: values,
          inventori,
        },
        axiosConfig
      );
      if(res.status === 200){
        setShippingStatus(200);
      }
      setFieldValue("status", res.data.status);
      setFieldValue("inventoris", res.data.inventoris);
    } catch (e) {
      console.log(e);
    }
  };
  const receivePeminjaman = async ({ values, inventori, setFieldValue }) => {
    try {
      const res = await axios.post(
        `${config.SERVER_URL}ticketperbaikan/receivepeminjaman`,
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
  const returnPeminjaman = async ({ values, inventori, setFieldValue }) => {
    try {
      const res = await axios.post(
        `${config.SERVER_URL}ticketperbaikan/returnpeminjaman`,
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
  const completePeminjaman = async ({ values, inventori, setFieldValue }) => {
    try {
      const res = await axios.post(
        `${config.SERVER_URL}ticketperbaikan/completepeminjaman`,
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
  const processComplete = async ({ values, inventori, setFieldValue }) => {
    try {
      const res = await axios.post(
        `${config.SERVER_URL}ticketperbaikan/completeinventori`,
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

  const completeTicket = async ({ values, setFieldValue }) => {
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
  const assignInventori = async (
    { hardwareInventoriId, ticketDetailId },
    setFieldValue
  ) => {
    //console.log("assign Inventori");
    try {
      if (assignState === "REPLACE") {
        console.log(hardwareInventoriId, ticketDetailId, "check replace")
        const res = await axios.post(
          `${config.SERVER_URL}ticketperbaikan/assignreplaceinventori`,
          {
            hardwareInventoriId,
            perbaikanInventoriId: ticketDetailId,
          },
          axiosConfig
        );
        setFieldValue("status", res.data.status);
        setFieldValue("inventoris", res.data.inventoris);
        setViewState("VIEW");
        setInventori();
      }
      if (assignState === "PEMINJAMAN") {
        const res = await axios.post(
          `${config.SERVER_URL}ticketperbaikan/assignpeminjamaninventori`,
          {
            hardwareInventoriId,
            perbaikanInventoriId: ticketDetailId,
          },
          axiosConfig
        );
        setFieldValue("status", res.data.status);
        setFieldValue("inventoris", res.data.inventoris);
        setViewState("VIEW");
        // setInventori();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const setInventori = async (isId) => {
    try {
      const res = await axios.get(
        `${config.SERVER_URL}hardwareinventori/${isId}/available`,
        axiosConfig
      );
      const data = [];
      const mapping = [];
      res.data.forEach((item, index) => {
        mapping[item.no_asset] = item;
        if (data[item.hardware_spesifikasi_id] === undefined) {
          const specField = [];
          JSON.parse(item.spesifikasi, (key, value) => {
            if (key !== "") specField.push(key);
          });

          data[item.hardware_spesifikasi_id] = {
            specField,
            inventoris: [],
          };
        }
        const InventorySpec = [];
        JSON.parse(item.spesifikasi, (key, value) => {
          InventorySpec[key] = value;
        });
        data[item.hardware_spesifikasi_id].inventoris.push({
          ...item,
          spesifikasi: InventorySpec,
        });
      });
      setHardwareInventoryData(data);
      //setHardwareInventoryDataMapping(mapping);
    } catch (e) {
      console.log(e);
    }
  };
  const sendMessage = async ({ values, setFieldValue }) => {
    try {
      const message = values.message;
      const res = await axios.post(
        `${config.SERVER_URL}ticketperbaikan/sendmessage`,
        {
          ticket: values,
          message,
          userState: state.userState,
        },
        axiosConfig
      );
      setFieldValue("messages", res.data.messages);
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

  useEffect( () => {
    setInventori();
    setShippingStatus(0)
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      // validationSchema={validationSchema}
    >
      {({ values, setFieldValue }) => (
        <React.Fragment>
          {viewState === "VIEW" ? (
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
                            <th>Peminjaman</th>
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
                                <React.Fragment>
                                  {!inventoris[index].peminjaman &&
                                  inventoris[index].status === 3 &&
                                  state.userState === "ADMIN" ? (
                                    <button
                                      type="button"
                                      style={{ margin: "10px" }}
                                      className="btn btn-primary waves-effect"
                                      onClick={() => {
                                        processRepair({
                                          values,
                                          inventori: item,
                                          setFieldValue,
                                        });
                                      }}
                                    >
                                      Process Repair
                                    </button>
                                  ) : null}
                                  {!inventoris[index].peminjaman &&
                                  (inventoris[index].status === 3 ||
                                    inventoris[index].status === 7) &&
                                  state.userState === "ADMIN" ? (
                                    <button
                                      type="button"
                                      style={{ margin: "10px" }}
                                      className="btn btn-primary waves-effect"
                                      onClick={() => {
                                        processComplete({
                                          values,
                                          inventori: item,
                                          setFieldValue,
                                        });
                                      }}
                                    >
                                      Complete
                                    </button>
                                  ) : null}
                                  {!inventoris[index].peminjaman &&
                                  (inventoris[index].status === 3 ||
                                    inventoris[index].status === 7) &&
                                  state.userState === "ADMIN" ? (
                                    <button
                                      type="button"
                                      style={{ margin: "10px" }}
                                      className="btn btn-primary waves-effect"
                                      onClick={() => {
                                        processReplace({
                                          values,
                                          inventori: item,
                                          setFieldValue,
                                        });
                                      }}
                                    >
                                      Replace
                                    </button>
                                  ) : null}
                                  {inventoris[index].peminjaman &&
                                  inventoris[index].status === 3 &&
                                  state.userState === "ADMIN" ? (
                                    <button
                                      type="button"
                                      style={{ margin: "10px" }}
                                      className="btn btn-primary waves-effect"
                                      onClick={() => {
                                        processRepair({
                                          values,
                                          inventori: item,
                                          setFieldValue,
                                        });
                                      }}
                                    >
                                      Process Repair
                                    </button>
                                  ) : null}
                                </React.Fragment>
                              </td>
                              <td>
                                {!inventoris[index].peminjaman &&
                                (inventoris[index].status === 3 ||
                                  inventoris[index].status === 7) &&
                                state.userState === "ADMIN" ? (
                                  <button
                                    type="button"
                                    style={{ margin: "10px" }}
                                    className="btn btn-primary waves-effect"
                                    onClick={() => {
                                      assignPeminjaman({
                                        values,
                                        inventori: item,
                                        setFieldValue,
                                      });
                                    }}
                                  >
                                    Assign Peminjaman
                                  </button>
                                ) : null}
                                {inventoris[index].peminjaman &&
                                (inventoris[index].status === 3 ||
                                  inventoris[index].status === 7) &&
                                state.userState === "ADMIN" ? (
                                  <button
                                    type="button"
                                    style={{ margin: "10px" , display: shippingStatus === 200 ? "none" : "block"}}
                                    className="btn btn-primary waves-effect"
                                    onClick={() => {
                                      shippingPeminjaman({
                                        values,
                                        inventori: item,
                                        setFieldValue,
                                      });
                                    }}
                                  >
                                    Shipping
                                  </button>
                                ) : null}
                                {inventoris[index].peminjaman &&
                                inventoris[index].peminjaman.status === 4 &&
                                state.userState === "USER" ? (
                                  <button
                                    type="button"
                                    style={{ margin: "10px" }}
                                    className="btn btn-primary waves-effect"
                                    onClick={() => {
                                      receivePeminjaman({
                                        values,
                                        inventori: item,
                                        setFieldValue,
                                      });
                                    }}
                                  >
                                    Receive
                                  </button>
                                ) : null}
                                {inventoris[index].peminjaman &&
                                inventoris[index].peminjaman.status === 5 &&
                                state.userState === "USER" ? (
                                  <button
                                    type="button"
                                    style={{ margin: "10px" }}
                                    className="btn btn-primary waves-effect"
                                    onClick={() => {
                                      returnPeminjaman({
                                        values,
                                        inventori: item,
                                        setFieldValue,
                                      });
                                    }}
                                  >
                                    Return
                                  </button>
                                ) : null}
                                {inventoris[index].peminjaman &&
                                inventoris[index].peminjaman.status === 6 &&
                                state.userState === "ADMIN" ? (
                                  <button
                                    style={{ margin: "10px" }}
                                    className="btn btn-primary waves-effect"
                                    onClick={() => {
                                      completePeminjaman({
                                        values,
                                        inventori: item,
                                        setFieldValue,
                                      });
                                    }}
                                  >
                                    Complete
                                  </button>
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
              </div>
              <label> Message</label>
              <FieldArray name="messages">
                {(params) => {
                  const { form } = params;
                  const { messages } = form.values;
                  return (
                    <React.Fragment>
                      <table className="table table-bordered ">
                        <thead>
                          <tr>
                            <th style={{ width: "10%" }}>Sender</th>
                            <th>Message</th>
                          </tr>
                        </thead>
                        <tbody>
                          {messages.map((item, index) => (
                            <tr key={index}>
                              <td>
                                {messages[index].fullname} <br />
                                {messages[index].user_type === 1
                                  ? "(User)"
                                  : "(Admin)"}
                              </td>
                              <td>{messages[index].message}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </React.Fragment>
                  );
                }}
              </FieldArray>
              <div className="row clearfix">
                <div className="col-sm-10">
                  <Field
                    as="textarea"
                    rows="3"
                    className="form-control no-resize"
                    id="message"
                    name="message"
                  />
                </div>
                <div className="col-sm-2">
                  <button
                    className="btn btn-primary"
                    style={{ margin: "5px" }}
                    type="button"
                    onClick={() => {
                      sendMessage({ values, setFieldValue });
                    }}
                  >
                    Send Message
                  </button>
                </div>
              </div>
              <div className="row clearfix">
                <div className="col-sm-12">
                  {state.userState === "ADMIN" ? (
                    <button
                      className="btn btn-primary"
                      style={{ margin: "5px" }}
                      type="button"
                      onClick={() => {
                        completeTicket({ values, setFieldValue });
                      }}
                    >
                      Complete
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
          ) : null}
          {viewState === "ASSIGN" ? (
            <HardwareInventoriAssign
              
              hardwareInventoryData={hardwareInventoryData}
              assignDetailData={assignDetailData}
              setFieldValue={setFieldValue}
              assignInventori={assignInventori}
              state={state}
              dispatch={dispatch}
              setViewState={setViewState}
            />
          ) : null}
        </React.Fragment>
      )}
    </Formik>
  );
}

export default TicketViewPerbaikanInProgress;
