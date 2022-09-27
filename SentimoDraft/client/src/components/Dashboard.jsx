import React, { useState } from "react";
import Sidebar from "./Sidebar";

function Dashboard() {
    return (
        <div class="container no-padding homecontent">
            <div className="row">
                <div className="col col-lg-3 col-md-6 col-sm-6">
                    <Sidebar/>
                </div>
                <div className="col col-lg-9 col-md-6 col-sm-6 mt-5">
                    <h3> Dashboard </h3>
                    <div class="values">
                        <div class="val-box">
                            <i class='bx bx-money'></i>
                            <div>
                                <div id="values-number">80,789</div>
                                <div id="values-text">Total Monthly Sales</div>
                            </div>
                        </div>
                        <div class="val-box">
                            <i class='bx bx-box' ></i>
                            <div>
                                <div id="values-number">689</div>
                                <div id="values-text">Total Products</div>
                            </div>
                        </div>
                        <div class="val-box">
                            <i class='bx bx-package'></i>
                            <div>
                                <div id="values-number">2</div>
                                <div id="values-text">Low Stock Products</div>
                            </div>
                        </div>
                        <div class="val-box">
                            <i class='bx bxs-error-circle' ></i>
                        <div>
                            <div id="values-number">1</div>
                            <div id="values-text">Out of Stock Products</div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="col col-lg-9 col-md-6 col-sm-6 mt-5">
                

            </div>
        </div>
    );
}

export default Dashboard;