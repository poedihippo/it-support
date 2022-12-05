import React, { useEffect, useState } from "react";
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
    useEffect(() => {
        const listStaff = async () => {
            const res = await axios.get(`${config.SERVER_URL}logindata`, axiosConfig);
            setDataStaff(res.data)
            $(".js-mailing-list").DataTable({
                responsive: true,
              });
        }

        listStaff()
    },[])
 
    const assignTo = async (dataAssign) => {
      setIsLoad(true)
        let isDataAssign = state.currentRow;
        isDataAssign.assign_to = dataAssign.fullname;
        let dataIsAssign = {
            user_id: dataAssign.user_id
        }
        const resAssign = await axios.put(`${config.SERVER_URL}hardwareinventori/${isStateData.id}/assign`, dataIsAssign, axiosConfig)
        .then(res => {
          setIsLoad(false);
          dispatch({type:"LIST"})
        })
        .catch(error => console.log(error.response))
    }
  return (
    <React.Fragment>
      <section className="content">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>List Staff For Assign</h2>
                </div>
                {!isLoad ? (<div className="body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover js-mailing-list dataTable button-demo">
                      <thead>
                        <tr>
                          <th>FullName</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataStaff.map((i, indx) => (
                          <tr key={indx}>
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
                        ))}
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
    </React.Fragment>
  );
}

export default HardwareInventoryAssign;
