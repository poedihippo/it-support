import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import { useHistory } from "react-router-dom";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "./../../logic/AuthenticationService";
import IsLoading from "../loading"; 
function SoftwareLisenceAssignTo({ state, dispatch }) {
  const [isLoad, setIsLoad] = useState(false)
  const [dataStaff, setDataStaff] = useState([]);
  const history = useHistory()
  // const isStateData = state?.currentRow
  const isStateData = history?.location?.state
  const axiosConfig = AuthenticationService.getAxiosConfig();
//   const { hardwareSpecId } = state;
  const [handleCheck, setHandleCheck] = useState({});
  const [isMounted, setIsMounted] = useState(false);
  const [dataCh, setDataCh] = useState([]);
  const [checkBoxAll, setCheckBoxAll] = useState(false)
  
  const refCheck = useRef()
const assignForRepairs = async () => {
    let postArr = []
    for(let keyObj in handleCheck){
      if(handleCheck[keyObj]?.isCheck){
        postArr.push(handleCheck[keyObj]?.id)
      }
    }
    let postObj = {
      user_ids: postArr,
      software_inventori_id: isStateData.id
    }
   
      axios.put(`${config.SERVER_URL}softwarelisence/${isStateData.id}/assign_to`, postObj, axiosConfig)
        .then(res => {
          if(res.status === 200){
            window.location.assign(`/software`)
          }
        })
        .catch(error => console.log(error.response))
  }
    useEffect(() => {
        const listStaff = async () => {
            const channelId = localStorage.getItem('channel_id');
            const res = await axios.get(`${config.SERVER_URL}logindata?software_inventori_id=${isStateData.id}`, axiosConfig);
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
    },[])
 
    const assignTo = async (dataAssign) => {
    //   setIsLoad(true)
        // let isDataAssign = state?.currentRow;
        let isDataAssign = history?.location?.state
        isDataAssign.assign_to = dataAssign?.fullname;
        let dataIsAssign = {
            user_ids: dataAssign,
            software_inventori_id: isStateData.id
        }
        axios.put(`${config.SERVER_URL}softwarelisence/${isStateData.id}/assign_to`, dataIsAssign, axiosConfig)
        .then(res => {
          setIsLoad(false);
        //   dispatch({type:"LIST"})
          window.location.assign(`/software`)
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
      const findDataForCheck = () => {
        let newObj = {};
        for(let indx = 0; indx < dataStaff.length; indx++){
          // console.log(dataStaff, "chech data staff")
          if(dataStaff[indx].is_assigned){
            newObj[`check${indx+1}`] = {isCheck:true, id:dataStaff[indx]?.user_id}
          }else {
            newObj[`check${indx+1}`] = {isCheck:false, id:dataStaff[indx]?.user_id}
          }
        }
        setHandleCheck(newObj)
      }

      dataStaff.length !== 0 && findDataForCheck()
    }, [dataStaff])
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
      localStorage.setItem('channel_id', e.target.value);
      window.location.reload();
     
  }
  return (
    <>
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
                    <select id="removes" onChange={handleSortByCh} style={{width: "50%"}}>
                        <option value={0}>pilih channel</option>
                        <option value={0}>Default</option>
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
                          <th>Cabang</th>
                          <th>Email</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody ref={refCheck}>
                      {dataStaff.length !== 0 & dataStaff !== null && dataStaff !== undefined && dataStaff.map((i, indx) => {
                        
                        return (
                          <tr key={indx} data-hardware={i.fullname}>
                            <td><input type="checkbox" name={`check${indx+1}`} style={{position:"static", opacity:"1"}} checked={handleCheck[`check${indx+1}`]?.isCheck ? true : false} class="cls"onChange={(e) => handleCheckEvent(e, i.user_id)}/></td>
                            <td>{i.fullname}</td>
                            <td>{i.username}</td>
                            <td>{i?.sunsafe_response ? JSON.parse(i?.sunsafe_response)?.payload?.cabang?.cabang_name : "-"}</td>
                            <td>{i.email}</td>
                            <td>
                                <button
                                  type="button"
                                  className="btn btn-primary waves-effect "
                                  onClick={() => {
                                    assignTo([i.user_id]);
                                  }}
                                >
                                  Assign To
                                </button>
                            </td>
                          </tr>
                        )})}
                      </tbody>
                    </table>
                  </div>
                  <div>
                  <button
                        
                        className="btn btn-primary waves-effect"
                        onClick={() => {
                          history.push({
                            pathname:"/software",
                            state:{
                              type:"LISENCE_LIST",
                              id: isStateData?.id,
                              row: isStateData
                            }
                          })
                            // dispatch({type: "LIST"})
                            // window.location.assign(`/software`)
                      }}
                    >Back</button>
                  </div>
                </div>) : <IsLoading />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SoftwareLisenceAssignTo;
