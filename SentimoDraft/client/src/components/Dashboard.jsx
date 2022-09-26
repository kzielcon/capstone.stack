import React, { useState } from "react";
import Sidebar from "./Sidebar";

function Dashboard() {
    return (
        <>
        <div className="col">
        <Sidebar/>
        </div>
        <div className="col">
            <div>Container</div>
        </div>

        </>

    );
}

export default Dashboard;