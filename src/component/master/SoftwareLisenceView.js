import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import AuthenticationService from "./../../logic/AuthenticationService";
import config from "../../config.json";
const SoftwareLisenceView = ({state, dispatch}) => {
    const [isData, setIsData] = useState([]) 
    const dataLisence = state.currentRow.dataLisence
    const axiosConfig = AuthenticationService.getAxiosConfig();
    const softwareId = state.currentId;
    console.log(dataLisence, "check data lisence")
    useEffect(() => {
        const getDataLisence = async () => {
            try{
                const res = await Axios.get(
                    `${config.SERVER_URL}softwarelisence/${dataLisence?.software_id}`,
                    axiosConfig
                );
                // const resFilter = res.data.filter(resData => parseInt(resData.id) === parseInt(softwareId));
                console.log("check data filter", res)
                setIsData(res.data.data);

            }catch(error){

            }
        }
        getDataLisence();
    }, []);
    console.log(isData, "check data")
    return (
        <React.Fragment>
            <section className='content'>
            <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <span>Software Lisence</span>
              <div className="card">
                <div className="header">
                  <h2>View</h2>
                </div>
                <div className="body">
                  <div className="row clearfix">
                    <div className="col-sm-12">
                      <label>Software</label>
                        <div className="form-group">
                          <div className="form-line">
                            <span>{isData?.nama_software}</span>
                          </div>
                        </div>
                              <label>Form Permintaan</label>
                              <div className="form-group">
                                <div className="form-line">
                                  <span>{isData?.form_permintaan}</span>
                                </div>
                              </div>
                              <label>Harga</label>
                              <div className="form-group">
                                <div className="form-line">
                                  <span>{isData?.harga}</span>
                                </div>
                              </div>

                              <label>Lisence Id</label>
                              <div className="form-group">
                                <div className="form-line">
                                  <span>{isData?.lisence_id}</span>
                                </div>
                              </div>
                              <label>Tanggal Pembelian</label>
                              <div className="form-group">
                                <div className="form-line">
                                  <span>{isData?.tanggal_pembelian}</span>
                                </div>
                              </div>
                              <label>Tanggal Aktif</label>
                              <div className="form-group">
                                <div className="form-line">
                                  <span>{isData?.tanggal_aktif}</span>
                                </div>
                              </div>
                              <label>Tanggal Expired</label>
                              <div className="form-group">
                                <div className="form-line">
                                  <span>{isData?.tanggal_expired}</span>
                                </div>
                              </div>
                              <label> Lisence</label>
                              <div name="lisences">
                            
                                      <table className="table table-bordered ">
                                        <thead>
                                          <tr>
                                            <th>Nama Software</th>
                                            <th>ID Lisence</th>
                                            <th>Tanggal Aktif</th>
                                            <th>Tanggal Expired</th>
                                            <th>Action</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {/* {lisences.map((item, index) => (
                                            <tr key={index}>
                                              <td style={{ width: "500px" }}>
                                                {item.nama_software}
                                              </td>
                                              <td>{item.lisence_id}</td>
                                              <td>{item.tanggal_aktif}</td>
                                              <td>{item.tanggal_expired}</td>

                                              <td>
                                                <button
                                                  type="button"
                                                  className="btn btn-danger waves-effect"
                                                  onClick={() => {
                                                    if (
                                                      window.confirm(
                                                        "Are you sure you wish to delete this lisence?"
                                                      )
                                                    )
                                                      removeLisence({
                                                        inventori_id: values.id,
                                                        lisence_id:
                                                          item.software_lisence_id,
                                                      });
                                                  }}
                                                >
                                                  [-]
                                                </button>
                                              </td>
                                            </tr>
                                          ))} */}
                                        </tbody>
                                      </table>
                                      <div>
                                        <button
                                          type="button"
                                          className="btn btn-primary waves-effect"
                                          onClick={() => {
                                            dispatch({type: "ASSIGN_LISENCE", id: "softwareId", row: {main:"softwareData", lisence:"lisenceData"}})
                                          }}
                                        >
                                          [+]
                                        </button>
                                      </div>
                                   
                              </div>

                              {/* <label> Spesifikasi</label>
                            <div className="form-group">
                              <div className="form-line">
                                <Field
                                  as="textarea"
                                  rows="4"
                                  className="form-control no-resize"
                                  placeholder="Please type what you want..."
                                  id="spesifikasi"
                                  name="spesifikasi"
                                />
                              </div>
                            </div> */}
                            </div>
                            <div className="col-sm-12">
                              <button className="btn btn-primary" type="submit" onClick={() => {
                                dispatch({type: "LIST"})
                              }}>
                                Back
                              </button>
                            </div>
                          </div>
                        </div>
              </div>
            </div>
          </div>
            </section>
        </React.Fragment>
    )
}

export default SoftwareLisenceView