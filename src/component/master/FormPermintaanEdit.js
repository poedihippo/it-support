// import React, { useState, useEffect } from "react";
// import {useLocation} from 'react-router-dom';
// import config from "../../config.json";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import AuthenticationService from "./../../logic/AuthenticationService";
// import axios from 'axios'
// import * as Yup from "yup";
// import IsLoading from "../loading";

import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "./../../logic/AuthenticationService";
import IsLoading from "../loading";
import dateFormat from "dateformat";
// focused error
function FormPermintaanEdit({state, dispatch}) {
  const [isLoad, setIsLoad] = useState(false)
  const [supplierList, setSupplierList] = useState([]);
  const [uomList, setUomList] = useState([]);
  const [isData, setIsData] = useState(null)
  const axiosConfig = AuthenticationService.getAxiosConfig();
  const [incr, setIncr] = useState(isData?.details?.length + 1);
  const [dataError, setDataError] = useState({details: []});
  const [isError, setIsError] = useState(false);
  const [loginData,setLoginData] = useState([]);
  const [handleStaff, setHandleStaff] = useState("");
  const [dataSearch, setDataSearch] = useState(null);
  const [activeStaff, setActiveStaff] = useState(false)

  const today = dateFormat(new Date(), "yyyy-mm-dd");

  const idSuplier = state.currentId
  const defaultRow = {
    no_urut: incr,
    code: "",
    nama_barang: "",
    qty: 0,
    uom: "",
    harga_satuan: 0,
  };

  const initialValues = {
    supplier_id: isData?.supplier_id,
    tanggal_pengajuan: isData?.tanggal_pengajuan,
    date_available:isData?.date_available,
    alasan_pembelian: isData?.alasan_pembelian,
    note: isData?.note || "",
    details: isData?.details,
  };
  
  const onSubmit = async (values) => {
    // setIsLoad(true);
    let newObjCc = {}
    let checkError = false;
    let errObj = {};
    for(let keyObj in values){
      if(keyObj.toUpperCase() === "DETAILS"){
        errObj[keyObj] = {}
        values[keyObj].map(isData => {
          for(let chdKey in isData){
            if(isData[chdKey] === "" || isData[chdKey] === 0){
              checkError = true
              // errObj[keyObj][chdKey] = isData[chdKey];
            }
          }
        })
        
      } else {
        if(values[keyObj] === "" || values[keyObj] === 0){
          checkError = true
          // errObj[keyObj] = values[keyObj]
        }
      }
     
    }
    try {
      if(!checkError){
        
        // newObjCc["alasan_pembelian"] = values.alasan_pembelian
        // newObjCc["date_available"] = values.date_available
        // newObjCc["details"] = values.details
        // newObjCc["note"] = values.note;
        // newObjCc["request_by"] = handleStaff.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase(0) + word.substring((1))).join(' ');
        // newObjCc["supplier_id"] = values.supplier_id;
        // newObjCc["tanggal_pengajuan"] = values.tanggal_pengajuan

        setIsLoad(true)
        const result = await axios.put(
          `${config.SERVER_URL}formpermintaan/${idSuplier}`,
          values,
          axiosConfig
        );
        setIsLoad(false)
        dispatch({
          type: "LIST",
        });
      }else{
        setIsError(checkError);
        setDataError(values)
      }
    } catch (error) {
      console.log(error.response);
    }
  };
useEffect(() => {
  const getLoginData = async () => {
      axios.get(`${config.SERVER_URL}logindata`, axiosConfig)
      .then(res => {
        if(res.status === 200){
          setLoginData(res.data)
        }
      })
      .catch(error => console.log(error.response,"check aing"))
      }
    getLoginData()
  isData !== null && setIncr(isData?.details.length + 1)
}, [isData])
  useEffect(async () => {

    
    const getDataList = async () => {
      // Get Supplier
      try {
        const res = await axios.get(
          `${config.SERVER_URL}suppliervendor`,
          axiosConfig
        );
        setSupplierList(res.data);
      } catch (e) {
        console.log(e);
      }

      // Get Data UOM
      try {
        const res = await axios.get(
          `${config.SERVER_URL}dropdowndata/uom`,
          axiosConfig
        );
        setUomList(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    const getDataFormpermintaan = async () => {
      try{
        const res = await axios.get(`${config.SERVER_URL}formpermintaan/${idSuplier}`, axiosConfig);
        setIsData(res?.data);
        setHandleStaff(res?.data?.request_by)
      }catch(error){
        console.log(error.response, "check error formpermintaan")
      }
    }
    getDataList()
    getDataFormpermintaan()
  }, []);

  useEffect(() => {
    const searchStaff = () => {
      let newRes = loginData.filter((isData,i) => {
        if(isData?.fullname?.toUpperCase()?.indexOf(handleStaff?.toUpperCase()) >= 0){
            return isData
        }
      })
      setDataSearch(newRes)
    }
    loginData.length !== 0 && searchStaff()
      
  }, [handleStaff, loginData]);
const handleEventChange = (e) => {
  setHandleStaff(e.target.value)
}
const handleInputFocus = () => {
  setActiveStaff(true)
}
const handleInputBlur = () => {
}
const handleSelectStaff = (e) => {
  setHandleStaff(e.currentTarget.textContent)
  
  setActiveStaff(false)
}
  return (
    <React.Fragment>
     { isData !== null && (<section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Form Permintaan</h2>
          </div>
      
          <div className="row clearfix" style={{width: "100%"}}>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="body" style={{overflowX: "scroll"}}>
                  <h2 className="card-inside-title">Add</h2>

                  <Formik
                    initialValues={{
                      supplier_id: isData?.supplier_id,
                      tanggal_pengajuan: isData?.tanggal_pengajuan,
                      date_available:isData?.date_available,
                      alasan_pembelian: isData?.alasan_pembelian,
                      request_by:isData?.request_by,
                      note: isData?.note || "",
                      details: isData?.details,
                    }}
                    onSubmit={onSubmit}
                    // validationSchema={validationSchema}
                  >
                    <Form>
                      <div className="row clearfix">
                        {!isLoad ? (<div className="col-sm-12">
                        {/* <label> Staff Yang Request</label>
                          <div className="form-group">
                            <div className="form-line" style={{position:"relative"}}>
                              <Field
                                as="textarea"
                                rows="2"
                                className="form-control no-resize"
                                placeholder="Cari Staff..."
                                id="request_by"
                                name="request_by"
                                value={handleStaff}
                                onChange={handleEventChange}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                              />
                              {dataError?.request_by === "" && isError && (<label className="error" style={{color:"red"}}>Required</label>)}
                              <div style={{position:"absolute", zIndex: "2", background: "white",overflow:"hidden", maxHeight:activeStaff ? "max-content" : "0"}}>
                                {
                                  dataSearch !== null && dataSearch?.length !== 0 && dataSearch?.map(isDatas => {
                                    return (
                                      <div style={{padding:"10px"}} onClick={handleSelectStaff}>{isDatas.fullname}</div>
                                    )
                                  })
                                }
                                {
                                  dataSearch !== null && dataSearch?.length === 0 && <div style={{color: "red"}}>Staff Tidak Ditemukan</div>
                                }
                              </div>
                            </div>
                          </div> */}
                          <label>Staff Yang Request</label>
                          <div className="form-group">
                            <div className="form-line">
                              <Field as="select" name={`request_by`}>
                                <option value={0}>Pilih Staff</option>
                                {loginData.map(
                                  (staffItem, supplierIndex) => (
                                    <option
                                      value={staffItem.fullname}
                                      key={`option-${supplierIndex}`}
                                    >
                                      {staffItem.fullname}
                                    </option>
                                  )
                                )}
                              </Field>
                            </div>
                          </div>
                          <label> Tanggal</label>
                          <div className="form-group">
                            <div className="form-line">
                              <Field
                                type="date"
                                className="form-control"
                                placeholder="Question"
                                id="tanggal_pengajuan"
                                name="tanggal_pengajuan"
                              />
                            </div>
                          </div>
                          <label> Tanggal Diharapkan Tersedia</label>
                          <div className="form-group">
                            <div className="form-line">
                              <Field
                                type="date"
                                className="form-control"
                                placeholder="Question"
                                id="date_available"
                                name="date_available"
                              />
                            </div>
                          </div>
                          <label>Supplier</label>
                          <div className="form-group">
                            <div className="form-line">
                              <Field as="select" name={`supplier_id`}>
                                <option value={0}>Pilih Supplier</option>
                                {supplierList.map(
                                  (supplierItem, supplierIndex) => (
                                    <option
                                      value={supplierItem.id}
                                      key={`option-${supplierIndex}`}
                                    >
                                      {supplierItem.nama_pt}
                                    </option>
                                  )
                                )}
                              </Field>
                            </div>
                          </div>
                          {parseInt(dataError?.supplier_id) === 0 && isError && (<label className="error" style={{color:"red"}}>Required</label>)}
                        </div>)
                        :null}
                      </div>
                      <label> Detail</label>
                      <FieldArray name="details">
                        {({ form, push, remove }) => {
                          const { details } = form.values;
                          let no_seq = 1;
                          return (
                            <React.Fragment>
                              {!isLoad ? (<table className="table table-bordered edit-table">
                                <thead>
                                  <tr>
                                    <th>No</th>
                                    <th>Code</th>
                                    <th>Nama Barang</th>
                                    <th>Qty</th>
                                    <th>UoM</th>
                                    <th>Harga Satuan</th>
                                    <th>Harga Total</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {details.map((item, index) => (
                                    <tr key={index}>
                                      <td>
                                        <Field
                                          type="text"
                                          name={`details[${index}].no_urut`}
                                        />
                                      </td>
                                      <td>
                                        <Field
                                          type="text"
                                          name={`details[${index}].code`}
                                        />
                                        {dataError?.details[index]?.code === "" && isError && (<label className="error" style={{color:"red"}}>Required</label>)}
                                      </td>
                                      <td>
                                        <Field
                                          as="textarea"
                                          rows="4"
                                          name={`details[${index}].nama_barang`}
                                        />
                                        {dataError?.details[index]?.nama_barang === "" && isError && (<label className="error" style={{color:"red"}}>Required</label>)}
                                      </td>
                                      <td>
                                        <Field
                                          type="number"
                                          name={`details[${index}].qty`}
                                        />
                                        {dataError?.details[index]?.qty === "" && isError && (<label className="error" style={{color:"red"}}>Required</label>)}
                                      </td>
                                      <td>
                                        <Field
                                          as="select"
                                          name={`details[${index}].uom`}
                                        >
                                          <option value={0}>Pilih UoM</option>
                                          {uomList.map((uomItem, uomIndex) => (
                                            <option
                                              value={uomItem.uom_value}
                                              key={`option${index}-${uomIndex}`}
                                            >
                                              {uomItem.uom_value}
                                            </option>
                                          ))}
                                        </Field>
                                        {parseInt(dataError?.details[index]?.uom) === 0 && isError && (<label className="error" style={{color:"red"}}>Required</label>)}
                                      </td>
                                      <td>
                                        <Field
                                          type="number"
                                          name={`details[${index}].harga_satuan`}
                                        />
                                        {dataError?.details[index]?.harga_satuan === "" && isError && (<label className="error" style={{color:"red"}}>Required</label>)}
                                      </td>
                                      <td>
                                        {/* <Field
                                          type="number"
                                          value={
                                            details[index].qty *
                                            details[index].harga_satuan
                                          }
                                        /> */}
                                      </td>
                                      <td>
                                        <button className="btn btn-primary waves-effect" onClick={()=> remove(index)}>X</button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>)
                              :<IsLoading />}
                              {!isLoad && (<div>
                                <button
                                  type="button"
                                  style={{ margin: "10px" }}
                                  className="btn btn-primary waves-effect"
                                  type="button"
                                  onClick={() => {
                                    setIncr(incr+1)
                                    push({ ...defaultRow, no_urut: incr });
                                  }}
                                >
                                  [+]
                                </button>
                              </div>)}
                            </React.Fragment>
                          );
                        }}
                      </FieldArray>
                      <div className="row clearfix">
                        {!isLoad && (<div className="col-sm-12">
                          <label> Alasan</label>
                          <div className="form-group">
                            <div className="form-line">
                              <Field
                                as="textarea"
                                rows="7"
                                className="form-control no-resize"
                                placeholder="Please type what you want..."
                                id="alasan_pembelian"
                                name="alasan_pembelian"
                              />
                              {dataError?.alasan_pembelian === "" && isError && (<label className="error" style={{color:"red"}}>Required</label>)}
                            </div>
                          </div>
                          <label> Catatan</label>
                          <div className="form-group">
                            <div className="form-line">
                              <Field
                                as="textarea"
                                rows="7"
                                className="form-control no-resize"
                                placeholder="Please type what you want..."
                                id="note"
                                name="note"
                              />
                              {dataError?.note === "" && isError && (<label className="error" style={{color:"red"}}>Required</label>)}
                            </div>
                          </div>
                        </div>)}
                        <div className="col-sm-12">
                          <button className="btn btn-primary" type="submit">
                            Save
                          </button>
                          <button
                            style={{marginLeft: "40px"}}
                            className="btn btn-primary waves-effect"
                            onClick={() => {
                              dispatch({
                                type: "LIST",
                              });
                          }}
                          >Back</button>
                        </div>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>)}
    </React.Fragment>
  );
}

export default FormPermintaanEdit;
