import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "../../logic/AuthenticationService";
import { useHistory } from "react-router-dom";
import UpldFile from "../atom/uploadFile";
import dateFormat from "dateformat";

function TicketEditPerbaikanUser({ state, dispatch, ticketData, setTitle }) {
  const [jenisPerbaikan, setJenisPerbaikan] = useState([]);
  const [hardwareInventoriData, setHardwareInventoriData] = useState({
    list: [],
    mapping: [],
  });
  const [isImage, setIsImage] = useState({
    image1: "",
    image2: "",
    image3: ""
  });
  const [upldImage, setUpldImage] = useState({
    image1: "",
    image2: "",
    image3: ""
  })
  const today = dateFormat(new Date(), "yyyy-mm-dd");
  const history = useHistory();

  const axiosConfig = AuthenticationService.getAxiosConfig();
  const defaultRow = {
    inventori_id: 0,
    keterangan: "",
  };
  const initialValues = ticketData;
  const validationSchema = Yup.object({});
  const onSubmit = async (values) => {
    console.log("values", values);
    if(upldImage.image1 !== ""){
      getBase64(upldImage.image1).then(res => values.image1path = res)
    }
    if(upldImage.image2 !== ""){
      getBase64(upldImage.image2).then(res => values.image2path = res)
    }
    if(upldImage.image3 !== ""){
      getBase64(upldImage.image3).then(res => values.image3path = res)
    }
    console.log(values, "check values untuk check values yah ")
    try {
      const res = await axios.put(
        `${config.SERVER_URL}ticketperbaikan/${values.id}`,
        values,
        axiosConfig
      );
      dispatch({ type: "VIEW", id: res.data.id, row: res.data });
    } catch (e) {
      console.log(e);
    }
  };
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
          resolve(reader.result)
      };
      reader.onerror = function (error) {
          reject(error)
        };
      })
  }
  const handleEventChange = (e) => {
    const file = e.target.files[0]
    setIsImage(prev => {
      return {
        ...prev,
        [e.target.name]: URL.createObjectURL(file)
      }
    });
    setUpldImage(prev => {
      return {
        ...prev,
        [e.target.name]: file
      }
    })
  }
  const handleRemoveImage = (isName) => {
    setIsImage(prev => {
      return{
        ...prev,
        [isName]: ""
      }
    })
    setUpldImage(prev => {
      return {
        ...prev,
        [isName]: ""
      }
    })
  }
  useEffect(async () => {
    try {
      const res = await axios.get(
        `${config.SERVER_URL}dropdowndata/jenisperbaikan`,
        axiosConfig
      );
      if (res.data[0] !== undefined) {
        initialValues.jenis_perbaikan = res.data[0].jenis_perbaikan_value;
      }
      setJenisPerbaikan(res.data);
    } catch (e) {
      console.log(e);
    }
    try {
      const res = await axios.get(
        `${config.SERVER_URL}user/mypermintaaninventori`,
        axiosConfig
      );

      const hardwareInventoriMapping = [];
      res.data.forEach((inventoriItem) => {
        hardwareInventoriMapping[inventoriItem.id] = inventoriItem;
      });

      setHardwareInventoriData({
        list: res.data,
        mapping: hardwareInventoriMapping,
      });
    } catch (e) {
      console.log(e);
    }
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
                <Field
                  as="select"
                  className="form-control"
                  name="jenis_perbaikan"
                  id="jenis_perbaikan"
                >
                  {jenisPerbaikan[0] !== undefined
                    ? jenisPerbaikan.map((item, index) => (
                        <option
                          value={item.jenis_perbaikan_value}
                          key={`jenis-perbaikan${index}`}
                        >
                          {item.jenis_perbaikan_value}
                        </option>
                      ))
                    : null}
                </Field>
              </div>
            </div>
          </div>
          <label> Detail</label>
          <FieldArray name="inventoris">
            {(params) => {
              const { form, push, remove } = params;
              const { inventoris } = form.values;
              let no_seq = 1;
              return (
                <React.Fragment>
                  <table className="table table-bordered ">
                    <thead>
                      <tr>
                        <th>Hardware (No Asset)</th>
                        <th>Merek</th>
                        <th>Tipe</th>
                        <th>Serial Number</th>
                        <th>Keterangan</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventoris.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <Field
                              as="select"
                              className="form-control"
                              name={`inventoris[${index}].inventori_id`}
                            >
                              <option value={0}>Pilih Inventori</option>
                              {hardwareInventoriData.list[0] !== undefined
                                ? hardwareInventoriData.list.map(
                                    (inventoriItem, inventoriIndex) => (
                                      <option
                                        value={inventoriItem.id}
                                        key={`option${index}-${inventoriIndex}`}
                                      >
                                        {inventoriItem.nama_hardware} (
                                        {inventoriItem.no_asset})
                                      </option>
                                    )
                                  )
                                : null}
                            </Field>
                          </td>
                          <td>
                            {hardwareInventoriData.mapping[
                              inventoris[index].inventori_id
                            ] !== undefined
                              ? hardwareInventoriData.mapping[
                                  inventoris[index].inventori_id
                                ].merek
                              : null}
                          </td>
                          <td>
                            {hardwareInventoriData.mapping[
                              inventoris[index].inventori_id
                            ] !== undefined
                              ? hardwareInventoriData.mapping[
                                  inventoris[index].inventori_id
                                ].tipe
                              : null}
                          </td>
                          <td>
                            {hardwareInventoriData.mapping[
                              inventoris[index].inventori_id
                            ] !== undefined
                              ? hardwareInventoriData.mapping[
                                  inventoris[index].inventori_id
                                ].serial_number
                              : null}
                          </td>
                          <td>
                            <Field
                              as="textarea"
                              className="form-control"
                              rows="2"
                              name={`inventoris[${index}].keterangan`}
                            />
                          </td>
                          <td>
                            <button
                              type="button"
                              style={{ margin: "10px" }}
                              className="btn btn-primary waves-effect"
                              type="button"
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
                      type="button"
                      onClick={() => {
                        no_seq++;
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
              <div style={{display:"flex", justifyContent: "space-around"}}>
                      <UpldFile isId="image1" isHtmlFor="image1" isName="image1" handleChangeImage={handleEventChange} preImage={isImage?.image1 === "" ? initialValues.image1path === "" ? "" : `${config.SERVER_BASE_URL}${initialValues.image1path}` : isImage?.image1} handleRemoveImage={() => handleRemoveImage('image1')}/>
                      <UpldFile isId="image2" isHtmlFor="image2" isName="image2" handleChangeImage={handleEventChange} preImage={isImage?.image2 === "" ? initialValues.image2path ==="" ? "" : `${config.SERVER_BASE_URL}${initialValues.image2path}` : isImage?.image2} handleRemoveImage={() => handleRemoveImage('image2')}/>
                      <UpldFile isId="image3" isHtmlFor="image3" isName="image3" handleChangeImage={handleEventChange} preImage={isImage?.image3 === "" ? initialValues.image3path === "" ?"" : `${config.SERVER_BASE_URL}${initialValues.image3path}` : isImage?.image3}handleRemoveImage={() => handleRemoveImage('image3')}/>
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
              <button className="btn btn-primary" type="submit">
                Save
              </button>
              <button
                  style={{marginLeft:"30px"}}
                  className="btn btn-primary waves-effect"
                  onClick={() => {
                  window.location.assign('/ticket-list')
                }}
                >Back</button>
            </div>
          </div>
        </Form>
      </Formik>
    </React.Fragment>
  );
}

export default TicketEditPerbaikanUser;
