import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import DashboardCard from "./DashboardCard";

function Dashboard() {

    const [products, setProducts] = useState([]);
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [noStockProducts, setNoStockProducts] = useState([]);
    const [assetPrice, setAssetPrice] = useState([]);
    
    const getProducts = async () => {
        try {
            const response = await fetch("http://localhost:8000/productscount")
            const jsonData = await response.json()

            await setProducts(jsonData);
        } catch (error) {
            console.error(error.message)
        }
    }
    
    const getLowStockProducts = async () => {
        try {
            const response = await fetch("http://localhost:8000/productslowstock")
            const jsonData = await response.json()

            await setLowStockProducts(jsonData);
        } catch (error) {
            console.error(error.message)
        }
    }
    
    const getNoStockProducts = async () => {
        try {
            const response = await fetch("http://localhost:8000/productsnostock")
            const jsonData = await response.json()

            await setNoStockProducts(jsonData);
        } catch (error) {
            console.error(error.message)
        }
    }

    const getAssetPrice = async () => {
        try {
            const response = await fetch("http://localhost:8000/products")
            const jsonData = await response.json()

            let totalAssetPrice = 0.0;
            jsonData.forEach(product => {
                if(product.qty > 0) {
                    totalAssetPrice += (product.qty * product.unitprice)
                }
            });

            totalAssetPrice = "₱ " + Number(parseFloat(totalAssetPrice).toFixed(2)).toLocaleString('en')

            await setAssetPrice(totalAssetPrice);
        } catch (error) {
            console.error(error.message)
        }
    }




    useEffect(() => {
        getProducts();
        getLowStockProducts();
        getNoStockProducts();
        getAssetPrice();
    }, []);
    

    return (
        <div className="container no-padding home_content">
            <div className="row">
                <div className="col col-lg-3 col-md-6 col-sm-6">
                    <Sidebar/>
                </div>
                <div className="col col-lg-9 col-md-6 col-sm-6 mt-5">
                    <h3> Dashboard </h3>
                    <div className="values">

                        <DashboardCard
                            icon="bx bx-money"
                            number={assetPrice}
                            title="Total Asset Price"
                        />
                        <DashboardCard
                            icon="bx bx-box"
                            number={products}
                            title="Total Products"
                        />
                        <DashboardCard
                            icon="bx bx-package"
                            number={lowStockProducts}
                            title="Low Stock"
                            desc="Less than 10"
                        />
                        <DashboardCard
                            icon="bx bxs-error-circle"
                            number={noStockProducts}
                            title="Out of Stock"
                        />

                    </div>
                </div>
            </div>
            <div className="col col-lg-9 col-md-6 col-sm-6 mt-5">
                

            </div>
        </div>
    );
}

export default Dashboard;