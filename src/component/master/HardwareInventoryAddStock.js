/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useParams } from "react-router";
import { Formik, Form, Field, FieldArray } from "formik";
import IsLoading from "../loading";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "./../../logic/AuthenticationService";
let history = null;
const axiosConfig = AuthenticationService.getAxiosConfig();
const defaultRow = {
  hardwareSpecId: 0,
  merek: "",
  tipe: "",
  serial_number: "",
  harga: 0,
  tanggal_pembelian: "",
  supplier_id: 0,
  form_permintaan: "",
  spesifikasi: {},
};
const initialValues = {
  inventoris: [defaultRow],
  hardwareSpecId: 0,
  harga: 0,
  tanggal_pembelian: "",
  supplier_id: 0,
  form_permintaan: "",
  qty: 0,
};



const consumableSubmit = async ({
  hardwareSpecId,
  harga,
  tanggal_pembelian,
  supplier_id,
  form_permintaan,
  qty,
}) => {
  const stockCardData = {
    hardwareSpecId,
    harga,
    tanggal_pembelian,
    supplier_id,
    form_permintaan,
    qty,
  };
  try {
    const result = await axios.post(
      `${config.SERVER_URL}hardwarestockcard`,
      stockCardData,
      axiosConfig
    );
    if(result?.status === 200){
      history.push("/hardware-spec");
    }
  } catch (e) {
    console.log(e);
  }
};
function HardwareInventoryAddStock() {
  history = useHistory();
  const { id: hardwareSpecId } = useParams();
  defaultRow.hardwareSpecId = hardwareSpecId;
  initialValues.hardwareSpecId = hardwareSpecId;
  const [isLoad, setIsLoad] = useState(false)
  const [supplierList, setSupplierList] = useState([]);
  // const [hardwareSpec, setHardwareSpec] = useState({});
  const [spesifikasi, setSpesifikasi] = useState({});
  const [isConsumable, setIsConsumable] = useState(true);
  const [isError, setIsError] = useState(false);
  const [dataError, setdataError] = useState([]);
  const [objectForSpek, setObjectForSpek] = useState({
    spek0: {
      type1: "",
      type2:"",
      type3:"",
      type4:"",
      type5:"",
      type6:""
    }
  })
  const [dataSpek, setDataSpek] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [checkType, setCheckType] = useState({})
  const [searchForm, setSearchForm] = useState({form0: ""});
  const [dataSearchForm, setDataSearchForm] = useState([]);
  const [dataForm, setDataForm] = useState([]);
  const [focusForm, setFocusForm] = useState("");
  const [nameForm, setNameform] = useState("")
  useEffect(() => {
    const getDataForm = async () => {
      try{
        const res = await axios.get(`${config.SERVER_URL}formpermintaan`,axiosConfig);
        if(res.status === 200){
          setDataForm(res.data)
        }
      }catch(error){
        console.log(error.response, "check response")
      }
      
    }
    getDataForm()
  }, [])
  useEffect(() => {
    const filterDataForm = () => {
      const resFilter = dataForm.filter(d => {
        return d?.request_by?.toUpperCase().includes(searchForm[nameForm]?.toUpperCase());
      });
      setDataSearchForm(resFilter)
    }

    dataForm.length !== 0 && Object.keys(searchForm).length !== 0 &&filterDataForm()
  }, [dataForm, searchForm])
  const onSubmit = async ({ inventoris }) => {
    let checkError = false
    let newArr = []
    let postArr = []


    // Yang Baru Punya
    inventoris.forEach((isData, myIndx) => {
      let newObj = {}
      let postObj = {}
      isData['form_permintaan'] = searchForm[`form${myIndx}`] || ""
      for(let keyObj in isData){
        if(isData[keyObj] === "" || isData[keyObj] === 0){
          newObj[keyObj] = isData[keyObj]
          checkError = true
        }else {
          postObj["status_hardware"] = "AVAILABEL"
          if(keyObj === "spesifikasi"){
            if(Object.keys(objectForSpek).length !== 0){
                postObj[keyObj] = {}
                postObj[keyObj]['type1'] = objectForSpek[`spek${myIndx}`]?.type1 || ""
                postObj[keyObj]['type2'] = objectForSpek[`spek${myIndx}`]?.type2 || ""
                postObj[keyObj]['type3'] = objectForSpek[`spek${myIndx}`]?.type3 || ""
                postObj[keyObj]['type4'] = objectForSpek[`spek${myIndx}`]?.type4 || ""
                postObj[keyObj]['type5'] = objectForSpek[`spek${myIndx}`]?.type5 || ""
                postObj[keyObj]['type6'] = objectForSpek[`spek${myIndx}`]?.type6 || ""
            }
            
          }

          if(keyObj !== "spesifikasi"){
            postObj[keyObj] = isData[keyObj]
          }
        }
      }
      postArr.push(postObj)
      newArr.push(newObj)
    });
    if(checkError !== true){
      setIsLoad(true)
      try {
        const result = await axios.post(
          `${config.SERVER_URL}hardwareinventori`,
          postArr,
          axiosConfig
        );
        if(result.status === 200){
          setIsLoad(false)
          history.push("/hardware-spec");
        }
      } catch (e) {
        console.log(e);
      }
    }else {
      setdataError(newArr)
      setIsError(checkError)
    }
  };
  useEffect(async () => {
    try {
      const supplierVendorRes = await axios.get(
        `${config.SERVER_URL}suppliervendor`,
        axiosConfig
      );
      setSupplierList(supplierVendorRes.data);
    } catch (e) {
      console.log(e);
    }
    try {
      const hardwareSpecRes = await axios.get(
        `${config.SERVER_URL}hardwarespec/${hardwareSpecId}`,
        axiosConfig
      );
      // setHardwareSpec(hardwareSpecRes.data);
      setIsConsumable(hardwareSpecRes.data.consumable);
      const specArr = JSON.parse(hardwareSpecRes.data.spesifikasi);
      const spec = {};
      specArr.forEach((i, index) => {
        spec[i] = "";
      });
      defaultRow.spesifikasi = spec;
      setSpesifikasi(spec);
    } catch (e) {
      console.log(e);
    }
  }, []);
  useEffect(() => {
    const getDataSpek = async () => {
      try{
        const result = await axios.get(
          `${config.SERVER_URL}hardwarespec/80/specifications?name=${checkType?.name}&type=${checkType?.type}`,
          axiosConfig
        );
        if(result.status === 200){
          setDataSpek(result.data)
        }
        }catch(error){
          console.log(error.response, "check response error")
        }
    }
    
    getDataSpek()
  }, [objectForSpek])
  const handleChangeSpek = (event, indx, spekIndx) => {
    // let newObj = {}
    // newObj[`type${indx}`] = {}
    setCheckType({type: indx+1,name: event.target.value, spek:`spek${spekIndx}`})
    setObjectForSpek(prev => {
      return{
        ...prev,
        [`spek${spekIndx}`]:{
          ...prev[`spek${spekIndx}`],
          [event.target.name]: event.target.value
        }
      }
    })
  }
  const handleSpekBlur = (e = undefined) => {
    if(e !== undefined){
      if(e.target.name === "" || e.target.name === undefined || e.target.name === null){
      setIsFocus(false)
      }
    }
    if(e === undefined) {
      setIsFocus(false)
    }
  }

  const handleSpekFocus = (event, indx, spekIndx) => {
    setCheckType({type: indx+1,name: "", spek:`spek${spekIndx}`})
    setIsFocus(true);

  }
  const handleClickTarget = (event, indx, spekIndx) => {
    setObjectForSpek(prev => {
      return{
        ...prev,
        [`spek${spekIndx}`]:{
          ...prev[`spek${spekIndx}`],
          [`type${indx+1}`]: event.target.textContent
        }
      }
    })
  }
  // useEffect(() => {
  //   handleSpekBlur()
  // }, [objectForSpek])
  return (
    <React.Fragment>
      <section className="content">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Tambah Inventori Hardware</h2>
                </div>

                {isConsumable === true ? (
                  <Formik
                    initialValues={initialValues}
                    onSubmit={consumableSubmit}
                  >
                    <div className="body">
                      <Form>
                        <div className="row clearfix">
                          <div className="col-sm-12">
                            <label>Supplier</label>
                            <div className="form-group">
                              <div className="form-line">
                                <Field
                                  as="select"
                                  name="supplier_id"
                                  className="form-control no-resize"
                                >
                                  <option value={0}>Pilih Supplier</option>
                                  {supplierList.map(
                                    (supplierItem, supplierIndex) => (
                                      <option
                                        value={supplierItem.id}
                                        key={`option${supplierIndex}`}
                                      >
                                        {supplierItem.nama_pt}
                                      </option>
                                    )
                                  )}
                                </Field>
                              </div>
                            </div>

                            <label> Tanggal Pembelian</label>
                            <div className="form-group">
                              <div className="form-line">
                                <Field
                                  type="date"
                                  className="form-control no-resize"
                                  placeholder="Please type what you want..."
                                  id="tanggal_pembelian"
                                  name="tanggal_pembelian"
                                />
                              </div>
                            </div>
                            <label> Form Permintaan</label>
                            <div className="form-group">
                              <div className="form-line">
                                <Field
                                  type="text"
                                  className="form-control no-resize"
                                  placeholder="Please type what you want..."
                                  id="form_permintaan"
                                  name="form_permintaan"
                                />
                                
                              </div>
                            </div>
                            <label> Harga</label>
                            <div className="form-group">
                              <div className="form-line">
                                <Field
                                  type="number"
                                  className="form-control no-resize"
                                  placeholder="Please type what you want..."
                                  id="harga"
                                  name="harga"
                                />
                              </div>
                            </div>
                            <label> Qty</label>
                            <div className="form-group">
                              <div className="form-line">
                                <Field
                                  type="number"
                                  className="form-control no-resize"
                                  placeholder="Please type what you want..."
                                  id="qty"
                                  name="qty"
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
                    </div>
                  </Formik>
                ) : (
                  <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    <Form>
                      <div className="body">
                        <FieldArray name="inventoris">
                          {({ form, push, remove }) => {
                            const { inventoris } = form.values;
                            return (
                              <div>
                                {!isLoad ? (<div className="table-responsive">
                                  <table className="table table-bordered table-striped table-hover js-mailing-list dataTable button-demo">
                                    <thead>
                                      <tr>
                                        <th>Supplier</th>
                                        <th>Merek</th>
                                        <th>Tipe</th>
                                        <th>Serial Number</th>
                                        <th>Harga</th>
                                        <th>Tanggal Pembelian</th>
                                        <th>Form Permintaan</th>
                                        {Object.keys(spesifikasi).map(
                                          (specName, indxx) => (
                                            <th key={`header-${specName}`}>
                                              Spesifikasi {indxx + 1}
                                            </th>
                                          )
                                        )}
                                        
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody onClick={handleSpekBlur}>
                                      {inventoris.map((item, index) => (
                                        <tr key={index}>
                                          <td>
                                            <Field
                                              as="select"
                                              name={`inventoris[${index}].supplier_id`}
                                            >
                                              <option value={0}>
                                                Pilih Supplier
                                              </option>
                                              {supplierList.map(
                                                (
                                                  supplierItem,
                                                  supplierIndex
                                                ) => (
                                                  <option
                                                    value={supplierItem.id}
                                                    key={`option${index}-${supplierIndex}`}
                                                  >
                                                    {supplierItem.nama_pt}
                                                  </option>
                                                )
                                              )}
                                            </Field>
                                            {dataError[index]?.supplier_id === 0 && isError && (<label className="error" style={{color:"red"}}>Required</label>)}
                                          </td>
                                          <td>
                                            <Field
                                              type="text"
                                              name={`inventoris[${index}].merek`}
                                            />
                                            {dataError[index]?.merek === "" && isError && (<label className="error" style={{color:"red"}}>Required</label>)}
                                          </td>
                                          <td>
                                            <Field
                                              type="text"
                                              name={`inventoris[${index}].tipe`}
                                            />
                                            {dataError[index]?.tipe === "" && isError && (<label className="error" style={{color:"red"}}>Required</label>)}
                                          </td>
                                          <td>
                                            <Field
                                              type="text"
                                              name={`inventoris[${index}].serial_number`}
                                            />
                                            {dataError[index]?.serial_number === "" && isError && (<label className="error" style={{color:"red"}}>Required</label>)}
                                          </td>
                                          <td>
                                            <Field
                                              type="number"
                                              name={`inventoris[${index}].harga`}
                                            />
                                            {dataError[index]?.harga === 0 && isError && (<label className="error" style={{color:"red"}}>Required</label>)}
                                          </td>
                                          <td>
                                            <Field
                                              type="date"
                                              name={`inventoris[${index}].tanggal_pembelian`}
                                            />
                                            {dataError[index]?.tanggal_pembelian === "" && isError && (<label className="error" style={{color:"red"}}>Required</label>)}
                                          </td>
                                          <td style={{position:"relative"}}>
                                            <Field
                                              type="text"
                                              value={searchForm[`form${index}`]}
                                              onChange={(e) => {
                                                setNameform(`form${index}`)
                                                setSearchForm(prev => {
                                                  return {
                                                    ...prev,
                                                    [`form${index}`]: e.target.value
                                                  }
                                                })
                                              }}
                                              onFocus={(e) => {
                                                setDataSearchForm([])
                                                setFocusForm(`form${index}`)
                                              }}
                                              name={`inventoris[${index}].form_permintaan`}
                                            />
                                            {dataError[index]?.form_permintaan === "" && isError && (<label className="error" style={{color:"red"}}>Required</label>)}
                                            {focusForm === `form${index}` && (
                                              <div style={{position:"absolute", display: "flex", flexDirection: "column", gap:"20px", zIndex:"10", background: "white", cursor:"pointer"}}>{dataSearchForm.length !== 0 && dataSearchForm.map((dts, indx) => {
                                                return (<div onClick={(e) => {
                                                  setDataSearchForm([])
                                                  setSearchForm(prev => {
                                                    return {
                                                      ...prev,
                                                      [`form${index}`]: e.target.textContent
                                                    }
                                                  })
                                                }} key={indx}>{dts.request_by}</div>)
                                              }) }</div>
                                            )}
                                          </td>
                                          
                                          {Object.keys(spesifikasi).map(
                                            (specItem, specIndex) => (
                                              <td
                                                key={`spec${index}-${specItem}`}
                                                style={{position:"relative"}}
                                              >
                                                <Field
                                                  onChange={(e) => handleChangeSpek(e, specIndex, index)}
                                                  // name={`inventoris[${index}].spesifikasi.${specItem}`}
                                                  name={`type${specIndex+1}`}
                                                  onFocus={(e) => handleSpekFocus(e, specIndex, index)}
                                                  value={objectForSpek[`spek${index}`] !== undefined ? objectForSpek[`spek${index}`][`type${specIndex+1}`] : ""}
                                                />
                                                {isFocus && checkType?.type === specIndex + 1 && checkType?.spek === `spek${index}` && (<div style={{position:"absolute", display: "flex", flexDirection: "column", gap:"20px", zIndex:"10", background: "white"}}>{dataSpek.length !== 0 ? dataSpek.map((resData, keyInd) => {
                                                  return (
                                                    <div key={keyInd} onClick={(e) => handleClickTarget(e, specIndex, index)} style={{cursor:"pointer"}}>{resData.name}</div>
                                                  )
                                                }): <span>Spesifikasi Tidak Ditemukan.</span>}</div>)}
                                              </td>
                                            )
                                          )}
                                          <td>
                                            <button
                                              className="btn btn-primary waves-effect"
                                              type="button"
                                              onClick={() => {
                                                remove(index)
                                              }}
                                            >
                                              X
                                            </button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>)
                                :<IsLoading />}

                                <div>
                                  <button
                                    style={{ marginTop: "10px" }}
                                    className="btn btn-primary waves-effect"
                                    type="button"
                                    onClick={() => push(defaultRow)}
                                  >
                                    Tambah
                                  </button>
                                  <button
                                    style={{ marginLeft: "40px", marginTop: "10px" }}
                                    className="btn btn-primary waves-effect"
                                    type="submit"
                                  >
                                    Save
                                  </button>
                                  <button
                                      style={{marginLeft: "40px", marginTop: "10px"}}
                                      className="btn btn-primary waves-effect"
                                      onClick={() => {
                                      window.location.assign('/hardware-spec')
                                    }}
                                  >Back</button>
                                </div>
                              </div>
                            );
                          }}
                        </FieldArray>
                      </div>
                    </Form>
                  </Formik>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default HardwareInventoryAddStock;
