import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "./../../logic/AuthenticationService";
import { useHistory } from "react-router-dom";
import IsLoading from "../loading";
import dateFormat from "dateformat";
import '../../stylei.css'
function TicketAddPerbaikan({ state, dispatch, jenisTicket }) {
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
  const [uploadImage, setUploadImage] = useState({
    image1:"",
    image2:"",
    image3:"",
  })
  const [isLoad, setIsLoad] = useState(false)
  const today = dateFormat(new Date(), "yyyy-mm-dd");
  const history = useHistory()
  const axiosConfig = AuthenticationService.getAxiosConfig();
  const defaultRow = {
    inventori_id: 0,
    keterangan: "",
  };
  
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    setIsImage(prev => {
      return {
        ...prev,
        [e.target.name]:URL.createObjectURL(file) 
      }
    })
    setUploadImage(prev => {
      return {
        ...prev,
        [e.target.name]: file
      }
    })
		
  }
  const initialValues = {
    subject: "",
    tanggal_pengajuan: today,
    jenis_perbaikan: "",
    alasan: "",
    inventoris: [],
  };
  const onSubmit = async (values) => {
    
    let data = new FormData();
    data.append('subject', values.subject);
    data.append('tanggal_pengajuan', values.tanggal_pengajuan)
    data.append('jenis_perbaikan', values.jenis_perbaikan)
    data.append('alasan', values.alasan)
    values.inventoris.forEach((isd, idx) => {
      data.append('inventoris[]', JSON.stringify(values.inventoris[idx]))
    })
    data.append('jenis_ticket', jenisTicket)
    data.append('image1path', uploadImage.image1)
    data.append('image2path', uploadImage.image2)
    data.append('image3path', uploadImage.image3)
    data.append('coba', JSON.stringify(values.inventoris))
    
    try {
      const res = await axios.post(
        `${config.SERVER_URL}ticketperbaikan`,data,{
          headers:{
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token")
          },
        }
      );
      if(res.status === 200){
        setIsLoad(false)
        history.push("/my-ticket-list");
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
  
    const getData = async () => {
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
          `${config.SERVER_URL}user/:id/myinventory`,
          axiosConfig
        );
        const hardwareInventoriMapping = [];
        if(res?.data?.error_code !== 1){
          res?.data?.forEach((inventoriItem) => {
            hardwareInventoriMapping[inventoriItem.id] = inventoriItem;
          });
        }
  
        setHardwareInventoriData({
          list: res.data,
          mapping: hardwareInventoriMapping,
        });
      } catch (e) {
        console.log(e);
      }
    }
    getData()
  }, []);
  const handleRemoveImage = (e, names) => {
    setIsImage(prev => {
      return {
        ...prev,
        [names]: ""
      }
    })
  }
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
              
              <label> Repair Type</label>
              {jenisPerbaikan.length !== 0 && (<div className="form-group">
                <Field
                  as="select"
                  className="form-control"
                  name="jenis_perbaikan"
                  id="jenis_perbaikan"
                >
                  {jenisPerbaikan.length !== 0
                    && jenisPerbaikan.map((item, index) => {
                      return (
                        <option
                          value={item.jenis_perbaikan_value}
                          key={`jenis-perbaikan${index}`}
                        >
                          {item.jenis_perbaikan_value}
                        </option>
                      )})}
                </Field>
              </div>)}
            </div>
          </div>
          <label> Detail</label>
          <FieldArray name="inventoris">
            {(params) => {
              const { form, push, remove } = params;
              const { inventoris } = form.values;
              
              return (
                <React.Fragment>
                   <div>
                    <button
                      type="button"
                      style={{ margin: "10px" }}
                      className="btn btn-primary waves-effect"
                      
                      onClick={() => {
                        
                        push(defaultRow);
                      }}
                    >
                      [+]
                    </button>
                  </div>
                  {!isLoad ? (<table className="table table-bordered ">
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
                  </table>)
                  : <IsLoading />}
                 
                </React.Fragment>
              );
            }}
          </FieldArray>
          <div className="row clearfix">
            <div className="col-sm-12">
              <label> Trouble Detail</label>
              <div className="form-group" style={{display:"flex",justifyContent:"space-around"}}>
                <div className="form-line img-upld"style={{width:"max-content"}}>
                  <div className="preview-image">
                    <div className={`remove-image ${isImage?.image1 === "" ?"hiden":"showd"}`} onClick={(e) => handleRemoveImage(e, "image1")}>X</div>
                    {isImage?.image1 === "" ? <div >Upload your image</div>:<img src={isImage?.image1} alt="gambar preview"/>}
                  </div>
                  <label htmlFor="image1" style={{cursor: "pointer"}}>Pilih File</label>
                  <input
                  style={{display:"none"}}
                    type="file"
                    className="form-control no-resize"
                    id="image1"
                    name="image1"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  
                </div>
                <div className="form-line img-upld" style={{width:"max-content"}}>
                  <div className="preview-image">
                  <div className={`remove-image ${isImage?.image2 === "" ?"hiden":"showd"}`} onClick={(e) => handleRemoveImage(e, "image2")}>X</div>
                  {isImage?.image2 === "" ? <div >Upload your image</div>:<img src={isImage?.image2} alt="gambar preview"/>}
                  </div>
                  <label htmlFor="image2" style={{cursor: "pointer"}}>Pilih File</label>
                  <input
                  style={{display:"none"}}
                    type="file"
                    className="form-control no-resize"
                    id="image2"
                    name="image2"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  
                </div>
                <div className="form-line img-upld"style={{width:"max-content"}}>
                  <div className="preview-image" style={{position:"relative"}}>
                    <div className={`remove-image ${isImage?.image3 === "" ?"hiden":"showd"}`} onClick={(e) => handleRemoveImage(e, "image3")}>X</div>
                  {isImage?.image3 === "" ? <div>Upload your image</div>:<img src={isImage?.image3} alt="gambar preview"/>}
                  </div>
                  <label htmlFor="image3" style={{cursor: "pointer"}}>Pilih File</label>
                  <input
                    style={{display:"none"}}
                    type="file"
                    className="form-control no-resize"
                    id="image3"
                    name="image3"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  
                </div>
              </div>
              <div className="form-group">
                <div className="form-line">
                  <Field
                    as="textarea"
                    rows="3"
                    className="form-control no-resize"
                    id="alasan"
                    name="alasan"
                    placeholder="Ketik Trouble Anda Di Sini"
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <button className="btn btn-primary" type="submit">
                Save
              </button>
              <button style={{marginLeft: "50px"}} className="btn btn-primary" type="submit" onClick={() => window.location.assign('/')}>
                Back
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </React.Fragment>
  );
}

export default TicketAddPerbaikan;
