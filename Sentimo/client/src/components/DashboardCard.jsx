import React from "react";
import "./DashboardCard.css"

function DashboardCard( { icon, number, title, desc } ) {
    return (
        <div className="val-box">
            <i className={icon}></i>
            <div>
                <div id="values-number">{number}</div>
                <div id="values-text">{title}</div>
                <small>{desc}</small>
            </div>
        </div>
    )
}

export default DashboardCard;