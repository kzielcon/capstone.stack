import React, { useState } from "react";
import Sidebar from "./Sidebar";

function Reports() {
    return (
        <div class="container no-padding homecontent">
            <div className="row">
                <div className="col col-lg-2 col-md-6 col-sm-6">
                    <Sidebar/>
                </div>
                <div className="col col-lg-9 col-md-6 col-sm-6">
                    <h4 className="col">Reports</h4>
                </div>
            </div>
        </div>
    );
}


export default Reports