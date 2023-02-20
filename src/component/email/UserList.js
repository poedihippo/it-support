import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import config from "../../config.json";
import axios from "axios";
import AuthenticationService from "./../../logic/AuthenticationService";

function UserList(param) {
  const [data, setData] = useState([]);
  const axiosConfig = AuthenticationService.getAxiosConfig();

  useEffect(() => {
    // Update the document title using the browser API
    axios.get(`${config.SERVER_URL}logindata`, axiosConfig).then((res) => {
      //console.log(res.data);
      if (res.status === 200) {
        setData(res.data);

        $(".js-mailing-list").DataTable({
          responsive: true,
        });
      }
    });
  }, []);
  return (
    <React.Fragment>
      <section className="content">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Mailing List</h2>
                </div>
                <div className="body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover js-mailing-list dataTable button-demo">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Cabang</th>
                          <th>Email</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((i) => (
                          <tr key={i.user_id}>
                            <td>{i.fullname}</td>
                            <td>{i?.sunsafe_response ? JSON.parse(i?.sunsafe_response)?.payload?.cabang?.cabang_name : "-"}</td>
                            <td>{i.email}</td>
                            <td>
                              <a
                                href={`/userview/${i.user_id}`}
                                className="btn btn-primary waves-effect "
                              >
                                View
                              </a>
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
                        window.location.assign(`/`)
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

export default UserList;
