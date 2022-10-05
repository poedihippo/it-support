import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import AuthenticationService from "./../../logic/AuthenticationService";
import config from "../../config.json";
const SoftwareLisenceView = ({state, dispatch}) => {
    const [isData, setIsData] = useState([]) 
    const softwareData = state.currentRow;
    const axiosConfig = AuthenticationService.getAxiosConfig();
    const softwareId = state.currentId;
    console.log('woww', softwareData)
    useEffect(() => {
        const getDataLisence = async () => {
            try{
                const res = await Axios.get(
                    `${config.SERVER_URL}softwarelisence/software/${softwareId}`,
                    axiosConfig
                );
                const resFilter = res.data.filter(resData => parseInt(resData.id) === parseInt(softwareId));
                console.log(resFilter, "check data filter")
                setIsData(resFilter);

            }catch(error){

            }
        }
        getDataLisence();
    }, [])
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
                                  {/* <Field
                                    type="text"
                                    className="form-control"
                                    placeholder="Question"
                                    id="nama_hardware"
                                    name="nama_hardware"
                                  /> */}
                                  <span>{softwareData?.nama_software}</span>
                                </div>
                              </div>
                              <label>Deskripsi</label>
                              <div className="form-group">
                                <div className="form-line">
                                  {/* <Field
                                    type="text"
                                    className="form-control"
                                    placeholder="Question"
                                    id="no_asset"
                                    name="no_asset"
                                  /> */}
                                  <span>{softwareData?.deskripsi}</span>
                                </div>
                              </div>
                              <label>Form Permintaan</label>
                              <div className="form-group">
                                <div className="form-line">
                                  {/* <Field
                                    type="text"
                                    className="form-control"
                                    placeholder="Question"
                                    id="merek"
                                    name="merek"
                                  /> */}
                                  <span>{isData[0]?.form_permintaan}</span>
                                </div>
                              </div>
                              <label>Harga</label>
                              <div className="form-group">
                                <div className="form-line">
                                  {/* <Field
                                    type="text"
                                    className="form-control"
                                    placeholder="Question"
                                    id="tipe"
                                    name="tipe"
                                  /> */}
                                  <span>{isData[0]?.harga}</span>
                                </div>
                              </div>

                              <label>Lisence Id</label>
                              <div className="form-group">
                                <div className="form-line">
                                  {/* <Field
                                    type="text"
                                    className="form-control"
                                    placeholder="Question"
                                    id="serial_number"
                                    name="serial_number"
                                  /> */}
                                  <span>{isData[0]?.lisence_id}</span>
                                </div>
                              </div>
                              <label>Tanggal Pembelian</label>
                              <div className="form-group">
                                <div className="form-line">
                                  {/* <Field
                                    type="text"
                                    className="form-control"
                                    placeholder="Question"
                                    id="harga"
                                    name="harga"
                                  /> */}
                                  <span>{isData[0]?.tanggal_pembelian}</span>
                                </div>
                              </div>
                              <label>Tanggal Aktif</label>
                              <div className="form-group">
                                <div className="form-line">
                                  {/* <Field
                                    type="text"
                                    className="form-control"
                                    placeholder="Question"
                                    id="nama_supplier"
                                    name="nama_supplier"
                                  /> */}
                                  <span>{isData[0]?.tanggal_aktif}</span>
                                </div>
                              </div>
                              <label>Tanggal Expired</label>
                              <div className="form-group">
                                <div className="form-line">
                                  {/* <Field
                                    type="text"
                                    className="form-control"
                                    placeholder="Question"
                                    id="nama_supplier"
                                    name="nama_supplier"
                                  /> */}
                                  <span>{isData[0]?.tanggal_expired}</span>
                                </div>
                              </div>
                              {/* {Object.keys(values.spesifikasi).map(
                                (specKey, specIndex) => (
                                  <>
                                    <label> {specKey}</label>
                                    <div className="form-group">
                                      <div className="form-line">
                                        <Field
                                          type="text"
                                          className="form-control"
                                          placeholder="Question"
                                          id={`spesifikasi[${specKey}]`}
                                          name={`spesifikasi[${specKey}]`}
                                        />
                                      </div>
                                    </div>
                                  </>
                                )
                              )} */}
                              <label> Lisence</label>
                              {/* <FieldArray name="lisences">
                                {({ form, push }) => {
                                  const { lisences } = form.values;
                                  let no_seq = 1;
                                  console.log("lisences", lisences);
                                  return (
                                    <React.Fragment>
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
                                          {lisences.map((item, index) => (
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
                                          ))}
                                        </tbody>
                                      </table>
                                      <div>
                                        <button
                                          type="button"
                                          className="btn btn-primary waves-effect"
                                          onClick={() => {
                                            setViewState("ASSIGN");
                                          }}
                                        >
                                          [+]
                                        </button>
                                      </div>
                                    </React.Fragment>
                                  );
                                }}
                              </FieldArray> */}

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