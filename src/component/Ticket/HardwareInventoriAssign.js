import React, { useEffect } from "react";
import $ from "jquery";
import "datatables.net";

function HardwareInventoriAssign({
  hardwareInventoryData,
  assignInventori,
  setFieldValue,
  assignDetailData,
  dispatch,
  state,
  setViewState
}) {
  useEffect( () => {
    $(".js-mailing-list").DataTable({
      responsive: true,
    });
  }, []);
  return (
    <div className="row clearfix">
      <div className="col-sm-12">
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover js-mailing-list dataTable button-demo">
            <thead>
              <tr>
                <th>Nomor Asset</th>
                <th>Nomor Seri</th>
                <th>Merek</th>
                <th>Tipe</th>

                {hardwareInventoryData[0] !==
                undefined
                  ? hardwareInventoryData[
                      0
                    ].specField.map((i) => <th key={`th${i}`}>{i}</th>)
                  : null}

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {hardwareInventoryData[0] !==
              undefined
                ? hardwareInventoryData[
                    0
                  ].inventoris.map((i) => {
                    return (
                    <tr key={i.id}>
                      <td>{i.no_asset}</td>
                      <td>{i.serial_number}</td>
                      <td>{i.merek}</td>
                      <td>{i.tipe}</td>
                      {hardwareInventoryData[
                        0
                      ] !== undefined
                        ? hardwareInventoryData[
                          0
                          ].specField.map((f) => (
                            <td key={`td${i.id}-${f}`}>{i.spesifikasi[f]}</td>
                          ))
                        : null}
                      <td>
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={() => {
                            assignInventori(
                              {
                                hardwareInventoriId: i.id,
                                ticketDetailId: assignDetailData.id,
                              },
                              setFieldValue
                            );
                          }}
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  )})
                : null}
            </tbody>
            
          </table>
          <div className="col-sm-12">
            
              <button className="btn btn-primary" onClick={() => {
                dispatch({ type: "VIEW", id: state?.currentId, row: state?.currentRow });
                setViewState("VIEW")
              }}>
                Back
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default HardwareInventoriAssign;
