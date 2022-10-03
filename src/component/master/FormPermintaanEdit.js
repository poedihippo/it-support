import React, { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom';
import config from "../../config.json";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AuthenticationService from "./../../logic/AuthenticationService";
import axios from 'axios'
import * as Yup from "yup";
import IsLoading from "../loading";
// focused error
function FormPermintaanEdit() {
  const location = useLocation();
  const [isLoad, setIsLoad] = useState(false)
  const axiosConfig = AuthenticationService.getAxiosConfig();
  const [values, setValues] = useState({
    supplier: location.state !== undefined ? location.state.data.nama_pt : ""
  });
  const ValidationSchema = Yup.object().shape({
    supplier: Yup.string(),
  });
  
  useEffect(() => {
    if(location.state === undefined){
      window.location.assign('/form-permintaan')
    }
  }, [location])
  const handleChange = (e) => {
    setValues(prev => {
      return{
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  const onSubmit = () => {
    setIsLoad(true)
    let newObj = {}
    const stateObj = location.state.data
    for(let newStateObj in stateObj ){
      newObj[newStateObj] = stateObj[newStateObj]
    }
    newObj["nama_pt"] = values.supplier
    
    axios
      .put(`${config.SERVER_URL}formpermintaan/${location.state.data.id}`, newObj,axiosConfig)
      .then((res) => {
        setIsLoad(false)
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>MailingList</h2>
          </div>
                <form>
                  <div className="row clearfix">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="card">
                        <div className="body">
                          <h2 className="card-inside-title">Edit</h2>
                          <div className="row clearfix">
                            <div className="col-sm-12">
                              <div className="form-group">
                                <div>
                                  Nama Supplier:
                                  <input
                                    onChange={handleChange}
                                    type="text"
                                    className={`form-control `}
                                    placeholder="Supplier"
                                    id="supplier"
                                    name="supplier"
                                    value={values.supplier}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <button onClick={onSubmit}className="btn btn-primary" type="button">
                                Save
                              </button>
                              <button
                              style={{marginLeft: "40px"}}
                                className="btn btn-primary waves-effect"
                                onClick={() => {
                                  window.location.assign('/form-permintaan')
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
                </form>
        </div>
      </section>
    </>
  );
}

export default FormPermintaanEdit;
