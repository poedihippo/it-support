import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "datatables.net";
import { useParams, useHistory, useLocation } from "react-router-dom";
import '../../stylei.css'
import { Field } from "formik";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "./../../logic/AuthenticationService";
const statusMapping = [];
statusMapping[4] = "Perlu Perbaikan";
statusMapping[5] = "Sedang diperbaiki";
statusMapping[6] = "Rusak";
function HardwareInventoryList({ state, dispatch }) {
  
  // const [checkBoxAll, setCheckBoxAll] = useState(false)
  const { id: hardwareSpecsId } = useParams();
  // const refCheck = useRef()
  const [data, setData] = useState([]);
  const axiosConfig = AuthenticationService.getAxiosConfig();
  const { hardwareSpecId } = state;
  const history = useHistory()
  // const [handleCheck, setHandleCheck] = useState({});
  // const [isMounted, setIsMounted] = useState(false);
  // const [dataCh, setDataCh] = useState([]);
  // const [idCh, setIdCh] = useState(null)

  // const assignForRepairs = async () => {
  //   let postArr = []
  //   for(let keyObj in handleCheck){
  //     if(handleCheck[keyObj]?.isCheck){
  //       postArr.push(handleCheck[keyObj]?.id)
  //     }
  //   }
  //   const result = await axios.post(
  //     `${config.SERVER_URL}hardwareinventori/assignforrepair`,
  //     postArr,
  //     axiosConfig
  //   );
  //   if(result.status === 200){
  //     window.location.reload()
  //   }
  //   setData(result.data);
  // }
  const assignForRepair = async (inventori) => {
    const result = await axios.post(
      `${config.SERVER_URL}hardwareinventori/assignforrepair`,
      inventori,
      axiosConfig
    );
    if(result.status === 200){
      window.location.reload()
    }
    setData(result.data);
  };
  useEffect(() => {
    
    axios
      .get(
        `${config.SERVER_URL}hardwareinventori/hardwarespecid/${hardwareSpecsId}`,
        axiosConfig
      )
      .then((res) => {
        if (res.status === 200) {
          let newObjCheck = {}
       
          setData(res.data);
          
          $(".js-mailing-list").DataTable({
            responsive: true
          });
        }
      })
      .catch((err) => console.log(err));


      // const getChannels = () => {
      //   axios.get(`${config.SERVER_URL}hardwareinventori/channels/list`, axiosConfig)
      //   .then(res => {
      //     setDataCh(res.data)
      //     setIsMounted(true)
      //   })
      //   .catch(error => console.log(error.response, "check error ch"))
      // }
      // !isMounted && getChannels()
  }, []);
  // useEffect(() => {
  //   const checkBox = () => {
  //     for(let keyObj in handleCheck){
  //       if(handleCheck[keyObj]?.isCheck === false){
  //         setCheckBoxAll(false)
  //       }
  //     }
  //   }
  //   Object.keys(handleCheck).length !== 0 && checkBox()
  // }, [handleCheck])
  // const handleCheckEvent = (e, data) => {
  //   if(e.target.checked){
  //     setHandleCheck(prev => {
  //       return{
  //         ...prev,
  //         [e.target.name]: {isCheck:true, id:data}
  //       }
  //     })
  //   }else{
  //     setHandleCheck(prev => {
  //       return{
  //         ...prev,
  //         [e.target.name]: {isCheck:false, id:data}
  //       }
  //     })
  //   }
  // }
  // const handleAllcheck = (e) => {
  //   setCheckBoxAll(!checkBoxAll)
  //   let newObjCheck = {}
  //   let count = 0
  //   if(e.target.checked){
  //     const toArr = Array.from(refCheck.current.children);
  //     for(let arrEl of toArr){
  //       count = count + 1
  //       const filterId = data.filter(d => d?.no_asset?.toUpperCase() === arrEl?.dataset?.hardware?.toUpperCase())
  //       newObjCheck[`check${count}`] = {isCheck:true, id:filterId[0]?.id}
  //     }
  //   }else{
  //     const toArr = Array.from(refCheck.current.children);
  //     for(let arrEl of toArr){
  //       count = count + 1
  //       const filterId = data.filter(d => d?.no_asset?.toUpperCase() === arrEl?.dataset?.hardware?.toUpperCase())
  //       newObjCheck[`check${count}`] = {isCheck:false, id:filterId[0]?.id}
  //     }
  //   }

  //   setHandleCheck(newObjCheck)
  // }
  // console.log(dataCh, "check lah handle nya ")
  return (
    <React.Fragment>
      <section className="content">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header" >
                  <h2>Hardware Specification List</h2>
                  
                </div>
                <div className="body">
                {/* <div style={{display:"flex", gap:"20px", marginBottom:"5px"}} className="remove-bootstrap">
                    <select id="removes" onChange={(e) => console.log(e.target.value, "check value onChange")}>
                        <option value={false}>pilih channel</option>
                        {dataCh.length !== 0 && dataCh.map(dc => {
                          return(
                            <option key={dc.id} value={dc.id}>{dc.code}</option>
                          )
                        })}
                      </select>
                    <button
                        type="button"
                        className="btn btn-primary waves-effect "
                        onClick={assignForRepairs}
                        // onClick={() => setIsChecked(!isChecked)}
                      >
                          Assign To Selected Rows
                      </button>
                      
                  </div> */}
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover js-mailing-list dataTable button-demo">
                      <thead>
                        <tr>
                          {/* <th><input type="checkbox" style={{position:"static", opacity:"1"}} onChange={handleAllcheck}htmlFor="cls" checked={checkBoxAll}/></th> */}
                          <th>Hardware</th>
                          <th>No Asset</th>
                          <th>Merek</th>
                          <th>Tipe</th>
                          <th>Serial Number</th>
                          <th>Harga</th>
                          <th>Assigned Users</th>
                          <th>Assign Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody >
                        {data.map((i,indx) => (
                          
                          <tr key={i.id} data-hardware={i.no_asset}>
                            {/* <td><input type="checkbox" name={`check${indx+1}`} style={{position:"static", opacity:"1"}} checked={handleCheck[`check${indx+1}`]?.isCheck ? true : false} class="cls"onChange={(e) => handleCheckEvent(e, i.id)}/></td> */}
                            <td>{i.nama_hardware}</td>
                            <td>{i.no_asset}</td>
                            <td>{i.merek}</td>
                            <td>{i.tipe}</td>
                            <td>{i.serial_number}</td>
                            <td>{i.harga}</td>
                            <td>{i.assigned_users}</td>
                            <td>
                              {i.assign_status
                                ? statusMapping[i.assign_status]
                                : null}
                            </td>
                            <td>
                                <button className="btn btn-primary waves-effect " onClick={() => dispatch({type: "VIEW", row: {data:i}})}>
                                  View
                                </button>
                              <button
                                className="btn btn-primary waves-effect "
                                onClick={() => {
                                  dispatch({
                                    type: "EDIT",
                                    id: i.id,
                                    row: {
                                      ...i,
                                      spesifikasi: JSON.parse(i.spesifikasi),
                                    },
                                  });
                                }}
                              >
                                Edit
                              </button>
                              {!i.assign_status ? (
                                <button
                                  type="button"
                                  className="btn btn-primary waves-effect "
                                  onClick={() => {
                                    assignForRepair(i);
                                  }}
                                >
                                  Assign For Repair
                                </button>
                              ) : null}
                              {!i.assign_to ? (
                                <button
                                  type="button"
                                  className="btn btn-primary waves-effect "
                                  onClick={() => {
                                    history.push({
                                      pathname: "/hardware-inventori-assign-to",
                                      state:i
                                    })
                                    dispatch({type:"ASSIGN", row:i})
                                  }}
                                >
                                  Assign To
                                </button>
                              ) : null}
                              <button className="btn btn-primary waves-effect ">
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div>
                  <button
                        
                        className="btn btn-primary waves-effect"
                        onClick={() => {
                        window.location.assign(`/hardware-spec`)
                      }}
                    >Back</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default HardwareInventoryList;
