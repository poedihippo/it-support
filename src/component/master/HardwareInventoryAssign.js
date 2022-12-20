import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "datatables.net";
import { useParams } from "react-router-dom";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "./../../logic/AuthenticationService";
import IsLoading from "../loading"; 
function HardwareInventoryAssign({ state, dispatch }) {
  const [isLoad, setIsLoad] = useState(false)
  const [data, setData] = useState([]);
  const [dataStaff, setDataStaff] = useState([]);
  const isStateData = state.currentRow
  const axiosConfig = AuthenticationService.getAxiosConfig();
//   const { hardwareSpecId } = state;
  const [handleCheck, setHandleCheck] = useState({});
  const [isMounted, setIsMounted] = useState(false);
  const [dataCh, setDataCh] = useState([]);
  const [idCh, setIdCh] = useState(0)
  const [checkBoxAll, setCheckBoxAll] = useState(false)
  const [dataSort, setDataSort] = useState([])
  const refCheck = useRef()
const assignForRepairs = async () => {
    let postArr = []
    for(let keyObj in handleCheck){
      if(handleCheck[keyObj]?.isCheck){
        postArr.push(handleCheck[keyObj]?.id)
      }
    }
    let dataIsAssign = {
      user_ids: postArr
    }
    if(postArr.length !== 0){
      const result = await axios.post(
        `${config.SERVER_URL}hardwareinventori/${isStateData.id}/assign`,
        dataIsAssign,
        axiosConfig
      );
      if(result.status === 200){
        window.location.reload()
      }
    }
    // setData(result.data);
  }
    useEffect(() => {
        const listStaff = async () => {
            const res = await axios.get(`${config.SERVER_URL}logindata?cabang_id=${parseInt(idCh) !== 0 ? parseInt(idCh) :"" }`, axiosConfig);
            setDataStaff(res.data)
            $(".js-mailing-list").DataTable({
                responsive: true,
              });
        }
        listStaff()

        const getChannels = () => {
          axios.get(`${config.SERVER_URL}hardwareinventori/channels/list`, axiosConfig)
          .then(res => {
            setDataCh(res.data)
            setIsMounted(true)
          })
          .catch(error => console.log(error.response, "check error ch"))
        }
        !isMounted && getChannels()
    },[idCh])
 
    const assignTo = async (dataAssign) => {
      setIsLoad(true)
        let isDataAssign = state.currentRow;
        isDataAssign.assign_to = dataAssign.fullname;
        let dataIsAssign = {
            user_ids: [dataAssign.user_id]
        }
        const resAssign = await axios.put(`${config.SERVER_URL}hardwareinventori/${isStateData.id}/assign`, dataIsAssign, axiosConfig)
        .then(res => {
          setIsLoad(false);
          dispatch({type:"LIST"})
        })
        .catch(error => console.log(error.response))
    }


    useEffect(() => {
    const checkBox = () => {
      for(let keyObj in handleCheck){
        if(handleCheck[keyObj]?.isCheck === false){
          setCheckBoxAll(false)
        }
      }
    }
    Object.keys(handleCheck).length !== 0 && checkBox()
  }, [handleCheck])
  const handleCheckEvent = (e, data) => {
    if(e.target.checked){
      setHandleCheck(prev => {
        return{
          ...prev,
          [e.target.name]: {isCheck:true, id:data}
        }
      })
    }else{
      setHandleCheck(prev => {
        return{
          ...prev,
          [e.target.name]: {isCheck:false, id:data}
        }
      })
    }
  }
  const handleAllcheck = (e) => {
    setCheckBoxAll(!checkBoxAll)
    let newObjCheck = {}
    let count = 0
    if(e.target.checked){
      const toArr = Array.from(refCheck?.current?.children);
      for(let arrEl of toArr){
        count = count + 1
        const filterId = dataStaff.filter(d => d?.fullname?.toUpperCase() === arrEl?.dataset?.hardware?.toUpperCase())
        newObjCheck[`check${count}`] = {isCheck:true, id:filterId[0]?.user_id}
      }
    }else{
      const toArr = Array.from(refCheck?.current?.children);
      for(let arrEl of toArr){
        count = count + 1
        const filterId = dataStaff.filter(d => d?.fullname?.toUpperCase() === arrEl?.dataset?.hardware?.toUpperCase())
        newObjCheck[`check${count}`] = {isCheck:false, id:filterId[0]?.user_id}
      }
    }

    setHandleCheck(newObjCheck)
  }
  const handleSortByCh = async (e) => {
      setIdCh(e.target.value)
      // const res = await axios.get(`${config.SERVER_URL}logindata?cabang_id=1`, axiosConfig);
      // if(res.status === 200){
      //   setDataSort(res.data)
      // }
      // console.log(parseInt(e.target.value), "sama check value", res)
  }
  const tableData = (isData) => {
    const els = isData.map((i, indx) => {
      return (
        <tr key={indx} data-hardware={i.fullname}>
                            <td><input type="checkbox" name={`check${indx+1}`} style={{position:"static", opacity:"1"}} checked={handleCheck[`check${indx+1}`]?.isCheck ? true : false} class="cls"onChange={(e) => handleCheckEvent(e, i.user_id)}/></td>
                            <td>{i.fullname}</td>
                            <td>{i.username}</td>
                            <td>{i.email}</td>
                            <td>
                                <button
                                  type="button"
                                  className="btn btn-primary waves-effect "
                                  onClick={() => {
                                    assignTo(i);
                                  }}
                                >
                                  Assign To
                                </button>
                            </td>
                          </tr>
      )
    })
    return els
  }
  return (
    <div>
      <section className="content">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>List Staff For Assign</h2>
                </div>
                {!isLoad ? (<div className="body">
                <div style={{display:"flex", gap:"20px", marginBottom:"5px"}} className="remove-bootstrap">
                    <select id="removes" onChange={handleSortByCh}>
                        <option value={0}>pilih channel</option>
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
                      
                  </div>
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover js-mailing-list dataTable button-demo">
                      <thead>
                        <tr>
                          <th><input type="checkbox" style={{position:"static", opacity:"1"}} onChange={handleAllcheck}htmlFor="cls" checked={checkBoxAll}/>
                          </th>
                          <th>FullName</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody ref={refCheck}>
                        {dataStaff.length !== 0 && tableData(dataStaff)}
                      
                      </tbody>
                    </table>
                  </div>
                  <div>
                  <button
                        
                        className="btn btn-primary waves-effect"
                        onClick={() => {
                            dispatch({type: "LIST"})
                      }}
                    >Back</button>
                  </div>
                </div>) : <IsLoading />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HardwareInventoryAssign;
