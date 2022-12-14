/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useParams } from "react-router";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
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
      history.push("/hardware-spec");
    } catch (e) {
      console.log(e);
    }
  };
function HardwareInventoryAddStock() {
    // Yang Baru
    const [handleSubmitStock, setHandleSubmitStock] = useState([
        {
            stock1:{
            hardwareSpecId: 0,
            merek: "wakwau",
            tipe: "",
            serial_number: "",
            harga: 0,
            tanggal_pembelian: "",
            supplier_id: 0,
            form_permintaan: "",
            spesifikasi: {},
            }
        }
    ])


    // Yang lama
    
  history = useHistory();
  const { id: hardwareSpecId } = useParams();
  defaultRow.hardwareSpecId = hardwareSpecId;
  initialValues.hardwareSpecId = hardwareSpecId;
  const [isLoad, setIsLoad] = useState(false)
  const [supplierList, setSupplierList] = useState([]);
  const [hardwareSpec, setHardwareSpec] = useState({});
  const [spesifikasi, setSpesifikasi] = useState({});
  const [isConsumable, setIsConsumable] = useState(true);
  const [isError, setIsError] = useState(false);
  const [dataError, setdataError] = useState([])
  const onSubmit = async ({ inventoris }) => {
    let checkError = false
    let newArr = []
    let postArr = []
    inventoris.forEach(isData => {
      let newObj = {}
      let postObj = {}
      for(let keyObj in isData){
        if(isData[keyObj] === "" || isData[keyObj] === 0){
          newObj[keyObj] = isData[keyObj]
          checkError = true
        }else {
          console.log(keyObj === "spesifikasi", "check obejck")
          if(keyObj === "spesifikasi"){
            console.log('aturan masuk ke sini', keyObj)
            let count = 0
            const copySpekObj = {...isData[keyObj]}
            // isData[keyObj] = {}
            newObj.keyObj = {}
            for(let keySpek in isData[keyObj]){
              console.log(isData, 'masuk ke perulangan spek kaga okokok?', isData[keyObj][keySpek])
              count = count + 1;
              newObj[keyObj][`type${count}`] = isData[keyObj][keySpek]

              console.log('berarti berhasil ini mah')
            }
          }

          if(keyObj !== "spesifikasi"){
            postObj[keyObj] = isData[keyObj]
          }
        }
      }
      newArr.push(newObj)
    })
    console.log(inventoris, "dan check selain inventoris", newArr)
    if(checkError !== true){
      // setIsLoad(true)
      try {
        // const result = await axios.post(
        //   `${config.SERVER_URL}hardwareinventori`,
        //   inventoris,
        //   axiosConfig
        // );
        // setIsLoad(false)
        // history.push("/hardware-spec");
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
      setHardwareSpec(hardwareSpecRes.data);
      setIsConsumable(hardwareSpecRes.data.consumable);
      const specArr = JSON.parse(hardwareSpecRes.data.spesifikasi);
      const spec = {};
      specArr.map((i, index) => {
        spec[i] = "";
      });
      defaultRow.spesifikasi = spec;
      setSpesifikasi(spec);
    } catch (e) {
      console.log(e);
    }
  }, []);
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
                      <div className="body">
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
                                          (specName) => (
                                            <th key={`header-${specName}`}>
                                              type
                                            </th>
                                          )
                                        )}

                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {handleSubmitStock.map((item, index) => {
                                        console.log(item[`stock${index+1}`].merek, "check item nya dulu")
                                        return(
                                        <tr key={index}>
                                          <td>
                                            <select name={`supplier_id`}>
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
                                            </select>
                                            {dataError[index]?.supplier_id === 0 && isError && (<label className="error" style={{color:"red"}}>Required</label>)}
                                          </td>
                                          <td>
                                           <input type="text" name="merek" value={item[`stock${index+1}`]['merek']} />
                                            {dataError[index]?.merek === "" && isError && (<label className="error" style={{color:"red"}}>Required</label>)}
                                          </td>
                                          <td>
                                            
                                            {dataError[index]?.tipe === "" && isError && (<label className="error" style={{color:"red"}}>Required</label>)}
                                          </td>
                                          <td>
                                            
                                            {dataError[index]?.serial_number === "" && isError && (<label className="error" style={{color:"red"}}>Required</label>)}
                                          </td>
                                          <td>
                                           
                                            {dataError[index]?.harga === 0 && isError && (<label className="error" style={{color:"red"}}>Required</label>)}
                                          </td>
                                          <td>
                                            
                                            {dataError[index]?.tanggal_pembelian === "" && isError && (<label className="error" style={{color:"red"}}>Required</label>)}
                                          </td>
                                          <td>
                                            
                                            {dataError[index]?.form_permintaan === "" && isError && (<label className="error" style={{color:"red"}}>Required</label>)}
                                          </td>
                                          
                                          {Object.keys(spesifikasi).map(
                                            (specItem, specIndex) => (
                                              <td
                                                key={`spec${index}-${specItem}`}
                                              >
                                                
                                              </td>
                                            )
                                          )}
                                          <td>
                                            <button
                                              className="btn btn-primary waves-effect"
                                              type="button"
                                              
                                            >
                                              X
                                            </button>
                                          </td>
                                        </tr>
                                      )}
                                      )}
                                    </tbody>
                                  </table>
                                </div>)
                                :<IsLoading />}

                                <div>
                                  <button
                                    style={{ marginTop: "10px" }}
                                    className="btn btn-primary waves-effect"
                                    type="button"
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
                            
                          
                      </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
    )
}

export default HardwareInventoryAddStock;
