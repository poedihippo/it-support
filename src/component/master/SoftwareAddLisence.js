import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "./../../logic/AuthenticationService";
import IsLoading from "../loading";
import dateFormat from "dateformat";
function SoftwareAddLisence({ state, dispatch }) {
  const [supplierList, setSupplierList] = useState([]);
  const [lisenceValue, setLisenceValue] = useState([]);
  const [isError, setIsError] = useState(false)
  const [isLoad, setIsLoad] = useState(false);
  const [handleCheckbox, setHandleCheckbox] = useState("0")
  const axiosConfig = AuthenticationService.getAxiosConfig();
  const today = dateFormat(new Date(), "yyyy-mm-dd");
  const softwareData = state.currentRow;
  console.log(softwareData.id)
  const defaultRow = {
    softwareId: softwareData.id,
    supplier_id: "",
    form_permintaan: "",
    lisence_id: "",
    harga: "",
    tanggal_pembelian: today,
    tanggal_aktif: "",
    tanggal_expired: "",
    have_expired: "0"
  };
  const initialValues = {
    lisences: [defaultRow],
  };
  // const validationSchema = Yup.object({});
  const ValidationSchema = Yup.object({}).shape({
    supplier_id: Yup.string(),
    form_permintaan: Yup.string(),
    harga: Yup.string(),
    lisence_id: Yup.string(),
    tanggal_pembelian: Yup.string(),
    tanggal_aktif: Yup.string(),
    tanggal_expired: Yup.string(),
  });
  const onSubmit = async ({ lisences }) => {
    console.log(lisences, "check expired")
    let newArr = []
    lisences.map(async (isData, index) => {
      let newObj = {}
      // Jika tanggal expired tidak diisi maka secara default yang akan dikirim ke Back-end "Expired"
      if(isData.tanggal_expired === ""){
        lisences[index].tanggal_expired = "Expired"
      }
      // Error Required jika salah satu field tidak diisi
      if(isData.supplier_id === "" || isData.form_permintaan === "" || isData.harga === "" || isData.lisence_id === ""|| isData.tanggal_aktif === "" || isData.tanggal_pembelian === "" ){
        for(let keyObj in defaultRow){
          newObj[keyObj] = isData[keyObj]
        }
        newArr.push(newObj)
        setIsError(true);
      }else {
        console.log(lisences, "check kok")
        if(lisences.length - 1 === index){
          setIsLoad(true)
          try {
            const result = await axios.post(
              `${config.SERVER_URL}softwarelisence`,
              lisences,
              axiosConfig
            );
            console.log('masuk kah?')
            setIsLoad(false)
            dispatch({
              type: "LIST",
            });
          } catch (e) {
            console.log(e);
          }
        }
      }
    })
    setLisenceValue(newArr)
  };
  useEffect(async () => {
    try {
      const res = await axios.get(
        `${config.SERVER_URL}suppliervendor`,
        axiosConfig
      );
      setSupplierList(res.data);
    } catch (e) {
      console.log(e);
    }
  }, []);
  console.log(handleCheckbox, "check box")
  return (
    <React.Fragment>
      <section className="content">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Tambah Lisensi Software</h2>
                </div>
                <div>
                  {isError && !isLoad && <label style={{color:"red", marginLeft: "20px"}}>Field Tidak Boleh Kosong</label>}
                </div>
                <Formik initialValues={initialValues} validationSchema={ValidationSchema}  onSubmit={onSubmit}>
                  {({ errors, touched, isValidating }) => {
                    
                    return (
                      <Form>
                    <div className="body">
                      <FieldArray name="lisences">
                        {({ form, push, remove }) => {
                          const { lisences } = form.values;
                          
                          return (
                            <div>
                              {!isLoad ? (<div className="table-responsive">
                                <table className="table table-bordered table-striped table-hover js-mailing-list dataTable button-demo">
                                  <thead>
                                    <tr>
                                      <th>Supplier</th>
                                      <th>Form Permintaan</th>
                                      <th>ID Lisensi</th>
                                      <th>Harga</th>
                                      <th>Tanggal Pembelian</th>
                                      <th>Tanggal Aktif</th>
                                      <th>Have Expired</th>
                                      <th>Tanggal Expired</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {lisences.map((item, index) => (
                                      
                                      <tr key={index}>
                                        <td>
                                          <Field

                                            as="select"
                                            name={`lisences[${index}].supplier_id`}
                                          >
                                            <option value={0}>
                                              Pilih Supplier
                                            </option>
                                            {supplierList.map(
                                              (supplierItem, supplierIndex) => (
                                                <option
                                                  value={supplierItem.id}
                                                  key={`option${index}-${supplierIndex}`}
                                                >
                                                  {supplierItem.nama_pt}
                                                </option>
                                              )
                                            )}
                                          </Field>
                                          {isError && lisenceValue[index]?.supplier_id === "" && <label style={{color:"red", marginLeft: "20px"}}>Required</label>}
                                        </td>
                                        <td>
                                          <Field
                                            type="text"
                                            name={`lisences[${index}]form_permintaan`}
                                          />
                                          {isError && lisenceValue[index]?.form_permintaan === "" && <label style={{color:"red", marginLeft: "20px"}}>Required</label>}
                                        </td>
                                        <td>
                                          <Field
                                       
                                            type="text"
                                            name={`lisences[${index}].lisence_id`}
                                          />
                                          {isError && lisenceValue[index]?.lisence_id === "" && <label style={{color:"red", marginLeft: "20px"}}>Required</label>}
                                        </td>
                                        <td>
                                          <Field
                                          
                                            type="number"
                                            name={`lisences[${index}].harga`}
                                          />
                                         {isError && lisenceValue[index]?.harga === "" && <label style={{color:"red", marginLeft: "20px"}}>Required</label>}
                                        </td>
                                        <td>
                                          <Field
                                          
                                            type="date"
                                            name={`lisences[${index}].tanggal_pembelian`}
                                          />
                                          {isError && lisenceValue[index]?.tanggal_pembelian === "" && <label style={{color:"red", marginLeft: "20px"}}>Required</label>}
                                        </td>
                                        <td>
                                          <Field
                                            
                                            type="date"
                                            name={`lisences[${index}].tanggal_aktif`}
                                          />
                                          
                                          {isError && lisenceValue[index]?.tanggal_aktif === "" && <label style={{color:"red", marginLeft: "20px"}}>Required</label>}
                                        </td>
                                        <td>
                                        <Field as="select" name={`lisences[${index}].have_expired`}  >
                                          <option value="0">Punya</option>
                                          <option value="1">Tidak Punya</option>
                                        
                                        </Field>
                                        </td>
                                        <td>
                                          <Field
                                            style={{display:handleCheckbox === "1" ? "none" : "block"}}
                                            type="date"
                                            name={`lisences[${index}].tanggal_expired`}
                                          />
                                       
                                        </td>
                                        
                                        <td>
                                          <button
                                          type="button"
                                          className="btn btn-primary waves-effect"
                                          type="button"
                                          onClick={() => remove(defaultRow)}
                                          >X</button>
                                          
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>)
                              :<IsLoading />}

                              <div>
                                <button
                                  type="button"
                                  style={{ marginTop: "10px" }}
                                  className="btn btn-primary waves-effect"
                                  type="button"
                                  onClick={() => push(defaultRow)}
                                >
                                  Tambah
                                </button>
                                <button
                                  style={{ marginTop: "10px", marginLeft: "40px"}}
                                  className="btn btn-primary waves-effect"
                                  type="submit"
                                >
                                  Save
                                </button>
                                <button
                                  style={{marginLeft: "40px", marginTop:"10px"}}
                                  className="btn btn-primary waves-effect"
                                  onClick={() => {
                                    dispatch({
                                      type: "LIST",
                                    });
                                }}
                                >Back</button>
                              </div>
                            </div>
                          );
                        }}
                      </FieldArray>
                    </div>
                  </Form>
                    )
                  }}
                  
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default SoftwareAddLisence;
