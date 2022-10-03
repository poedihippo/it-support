import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import AuthenticationService from "./../../logic/AuthenticationService";
import config from "../../config.json";
const SoftwareLisenceView = ({state, dispatch}) => {
    const softwareData = state.currentRow;
    const axiosConfig = AuthenticationService.getAxiosConfig();
    const softwareId = state;
    console.log('woww', softwareId)
    useEffect(() => {
        console.log('ehem')
        const getDataLisence = async () => {
            try{
                const res = await Axios.get(
                    `${config.SERVER_URL}softwarelisence/software/${softwareId}`,
                    axiosConfig
                );
                console.log(res, "check res")
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
              <div className="card">
                <div className="header">
                  <h2>Software Lisence</h2>
                </div>
                <div className="body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover js-mailing-list dataTable button-demo">
                      <tbody>
                        <tr key="name">
                            <td>Nama Supplier</td>
                            <td>Nama Software</td>
                            <td>Permintaan</td>
                            <td>Harga</td>
                            <td>Id Lisence</td>
                            <td>Tanggal Pembelian</td>
                            <td>Tanggal Aktif</td>
                            <td>Tanggal Expired</td>
                        </tr>
                        <tr key="email">
                            <td>Nama Supplier</td>
                            <td>Nama Software</td>
                            <td>Permintaan</td>
                            <td>Harga</td>
                            <td>Id Lisence</td>
                            <td>Tanggal Pembelian</td>
                            <td>Tanggal Aktif</td>
                            <td>Tanggal Expired</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
            </section>
        </React.Fragment>
    )
}

export default SoftwareLisenceView