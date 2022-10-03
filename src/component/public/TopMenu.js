import React from "react";

function TopMenu() {
  return (
    <div>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <a
              href=""
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar-collapse"
              aria-expanded="false"
            ></a>
            <a href="" className="bars"></a>
            <a className="navbar-brand" href="/">
              IT Support
            </a>
          </div>

          {/* <div className="collapse navbar-collapse" id="navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a
                  href="javascript:void(0);"
                  className="js-search"
                  data-close="true"
                >
                  <i className="material-icons">search</i>
                </a>
              </li>
              <li className="dropdown">
                <a
                  href="javascript:void(0);"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                >
                  <i className="material-icons">notifications</i>
                  <span className="label-count">7</span>
                </a>
                <ul className="dropdown-menu">
                  <li className="header">NOTIFICATIONS</li>
                  <li className="body">
                    <ul className="menu">
                      <li>
                        <a href="javascript:void(0);">
                          <div className="icon-circle bg-light-green">
                            <i className="material-icons">person_add</i>
                          </div>
                          <div className="menu-info">
                            <h4>12 new members joined</h4>
                            <p>
                              <i className="material-icons">access_time</i> 14
                              mins ago
                            </p>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          <div className="icon-circle bg-cyan">
                            <i className="material-icons">add_shopping_cart</i>
                          </div>
                          <div className="menu-info">
                            <h4>4 sales made</h4>
                            <p>
                              <i className="material-icons">access_time</i> 22
                              mins ago
                            </p>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          <div className="icon-circle bg-red">
                            <i className="material-icons">delete_forever</i>
                          </div>
                          <div className="menu-info">
                            <h4>
                              <b>Nancy Doe</b> deleted account
                            </h4>
                            <p>
                              <i className="material-icons">access_time</i> 3
                              hours ago
                            </p>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          <div className="icon-circle bg-orange">
                            <i className="material-icons">mode_edit</i>
                          </div>
                          <div className="menu-info">
                            <h4>
                              <b>Nancy</b> changed name
                            </h4>
                            <p>
                              <i className="material-icons">access_time</i> 2
                              hours ago
                            </p>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          <div className="icon-circle bg-blue-grey">
                            <i className="material-icons">comment</i>
                          </div>
                          <div className="menu-info">
                            <h4>
                              <b>John</b> commented your post
                            </h4>
                            <p>
                              <i className="material-icons">access_time</i> 4
                              hours ago
                            </p>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          <div className="icon-circle bg-light-green">
                            <i className="material-icons">cached</i>
                          </div>
                          <div className="menu-info">
                            <h4>
                              <b>John</b> updated status
                            </h4>
                            <p>
                              <i className="material-icons">access_time</i> 3
                              hours ago
                            </p>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          <div className="icon-circle bg-purple">
                            <i className="material-icons">settings</i>
                          </div>
                          <div className="menu-info">
                            <h4>Settings updated</h4>
                            <p>
                              <i className="material-icons">access_time</i>{" "}
                              Yesterday
                            </p>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="footer">
                    <a href="javascript:void(0);">View All Notifications</a>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <a
                  href="javascript:void(0);"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                >
                  <i className="material-icons">flag</i>
                  <span className="label-count">9</span>
                </a>
                <ul className="dropdown-menu">
                  <li className="header">TASKS</li>
                  <li className="body">
                    <ul className="menu tasks">
                      <li>
                        <a href="javascript:void(0);">
                          <h4>
                            Footer display issue
                            <small>32%</small>
                          </h4>
                          <div className="progress">
                            <div
                              className="progress-bar bg-pink"
                              role="progressbar"
                              aria-valuenow="85"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{ width: "32%" }}
                            ></div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          <h4>
                            Make new buttons
                            <small>45%</small>
                          </h4>
                          <div className="progress">
                            <div
                              className="progress-bar bg-cyan"
                              role="progressbar"
                              aria-valuenow="85"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{ width: "45%" }}
                            ></div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          <h4>
                            Create new dashboard
                            <small>54%</small>
                          </h4>
                          <div className="progress">
                            <div
                              className="progress-bar bg-teal"
                              role="progressbar"
                              aria-valuenow="85"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{ width: "54%" }}
                            ></div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          <h4>
                            Solve transition issue
                            <small>65%</small>
                          </h4>
                          <div className="progress">
                            <div
                              className="progress-bar bg-orange"
                              role="progressbar"
                              aria-valuenow="85"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{ width: "65%" }}
                            ></div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          <h4>
                            Answer GitHub questions
                            <small>92%</small>
                          </h4>
                          <div className="progress">
                            <div
                              className="progress-bar bg-purple"
                              role="progressbar"
                              aria-valuenow="85"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{ width: "92%" }}
                            ></div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="footer">
                    <a href="javascript:void(0);">View All Tasks</a>
                  </li>
                </ul>
              </li>
              <li className="pull-right">
                <a
                  href="javascript:void(0);"
                  className="js-right-sidebar"
                  data-close="true"
                >
                  <i className="material-icons">more_vert</i>
                </a>
              </li>
            </ul>
          </div>
         */}
        </div>
      </nav>
    </div>
  );
}

export default TopMenu;
