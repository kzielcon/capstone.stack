import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

//jQuery libraries
import 'jquery/dist/jquery.min.js';
 
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

function Inventory() {

    const [inputs, setInputs] = useState({
        productName: "",
        productCategory: 0,
        productQuantity: 0,
        productUnitPrice: 0,
        editProductName: "",
        editProductCategory: 0,
        editProductQuantity: 0,
        editProductUnitPrice: 0
    })
    
    //setting the inputs
    const onChange = e => { setInputs({ ...inputs, [e.target.name]: e.target.value }) }

    //deconstructing the name and description variable from the inputs
    const {
        productName,
        productCategory,
        productQuantity,
        productUnitPrice,
        editProductName,
        editProductCategory,
        editProductQuantity,
        editProductUnitPrice
    } = inputs

    const onSubmitAddProductForm = async (e) => {
        e.preventDefault()
        try {
            if(productName==="")
                throw "Failed to Add. Product Name is required.";
            
            if(productCategory == 0)
                throw "Failed to Add. Product Category is required.";
    
            if(productUnitPrice <= 0)
                throw "Failed to Add. Product Unit Price is required.";

            const body = { productName, productCategory, productQuantity, productUnitPrice }
            //fetch api for POST method
            const response = await fetch(
                "http://localhost:8000/products",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            )
            // parse response
            const parseRes = await response.json();

            // refresh product list
            getProducts();
            // clear input
            setInputs( { productName: "", productCategory: 0, productQuantity: 0, productUnitPrice: 0.0 } )
            // display message
            alert(parseRes.msg);
        } catch (error) {
            alert(error);
        }
    }

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const response = await fetch("http://localhost:8000/products")
            const jsonData = await response.json()

            await setProducts(jsonData);
            
            setTimeout(function(){ $('#table').DataTable(); } , 1);
        } catch (error) {
            console.error(error.message)
        }
    }

    const updateProduct = async (e, id) => {
        e.preventDefault();
        try {
            if(editProductName==="")
                throw "Failed to Update. Product Name is required.";
            
            if(editProductCategory==="" || parseInt(editProductCategory)===0)
                throw "Failed to Update. Product Category is required.";
    
            if(parseFloat(editProductUnitPrice)===0.0)
                throw "Failed to Update. Product Unit Price is required.";

            const body = { editProductName, editProductCategory, editProductQuantity, editProductUnitPrice };
            const response = await fetch(`http://localhost:8000/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            // parse response
            const parseRes = await response.json();

            // refresh product list
            getProducts();
            // display message
            alert(parseRes.msg);
        } catch (error) {
            alert(error);
        }
    }

    //delete product function
    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/products/${id}`, {
                method: "DELETE"
            });
            // parse response
            const parseRes = await response.json();

            setProducts(products.filter(product => product.id !== id));
            // display message
            alert(parseRes.msg);
        } catch (error) {
            console.error(error.message);
        }
    }


    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {
            const response = await fetch("http://localhost:8000/categories")
            const jsonData = await response.json()

            setCategories(jsonData);
        } catch (error) {
            console.error(error.message)
        }
    }


    useEffect(() => { getProducts(); getCategories(); }, []);
    
    return (
        <div class="container no-padding">
            <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-3">
                    <Sidebar/>
                </div>
                
                <div className="col-lg-9 col-md-9 col-sm-9 mt-3">
                    
                    <div className="container border p-3 mt-3">
                        <div className="row">
                            <div className="col-lg-12">
                                <form onSubmit={onSubmitAddProductForm}>
                                    
                                    <div className="container mt-3">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <h4> Add Product </h4>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div class="form-group">
                                                    <label for="productName">Product Name</label>
                                                    <input
                                                        type="text"
                                                        name="productName"
                                                        id="productName"
                                                        value={productName}
                                                        onChange={e => onChange(e)}
                                                        className="form-control"
                                                        placeholder="Product Name"
                                                        maxLength={20}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div class="form-group">
                                                    <label for="productCategory">Product Category</label>
                                                    <select
                                                        class="form-select"
                                                        aria-label="Default select example"
                                                        name="productCategory"
                                                        id="productCategory"
                                                        value={productCategory}
                                                        onChange={e => onChange(e)}
                                                        required
                                                    >
                                                        <option value="">Select Category here</option>
                                                    {categories.map(category => (
                                                        <option value={category.id}>{category.name}</option>
                                                    ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div class="form-group">
                                                    <label for="productQuantity">Quantity</label>
                                                    <input
                                                        type="number"
                                                        min={0} max={1000000}
                                                        name="productQuantity"
                                                        id="productQuantity"
                                                        value={productQuantity}
                                                        onChange={e => onChange(e)}
                                                        className="form-control"
                                                        placeholder="Quantity"
                                                        step={1}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div class="form-group">
                                                    <label for="productUnitPrice">Unit Price (₱)</label>
                                                    <input
                                                        type="number"
                                                        min={0} max={1000000}
                                                        name="productUnitPrice"
                                                        id="productUnitPrice"
                                                        value={productUnitPrice}
                                                        onChange={e => onChange(e)}
                                                        className="form-control"
                                                        placeholder="Unit Price"
                                                        step={0.01}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <div class="d-grid">
                                                    <input type="submit" className="btn btn-primary mt-4" value="Add Product" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <hr className="mt-5" />

                            <div className="col-lg-12">
                                <center><h4> Inventory </h4></center>
                                <table className="table" id="table">
                                    <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Category</th>
                                        <th className="text-right">Qty</th>
                                        <th className="text-right">Price</th>
                                        <th width="5%">Edit</th>
                                        <th width="5%">Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product => (
                                            <tr key={product.id}>
                                                <td>{product.name}</td>
                                                <td>{product.categoryname}</td>
                                                <td>{product.qty}</td>
                                                <td>₱ {Number(parseFloat(product.unitprice).toFixed(2)).toLocaleString('en')}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        class="btn btn-primary"
                                                        data-bs-toggle="modal"
                                                        data-bs-target={`#id${product.id}`}
                                                        onClick={() =>
                                                            setInputs({
                                                                editProductName: product.name,
                                                                editProductCategory: product.categoryid,
                                                                editProductQuantity: product.qty,
                                                                editProductUnitPrice: product.unitprice
                                                            })
                                                        }
                                                    >
                                                        <i class="bi-pencil-square"></i>
                                                    </button>
                                                    <div class="modal fade" id={`id${product.id}`} tabindex="-1" aria-labelledby="modalEditCategoryLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="modalEditCategoryLabel">Edit Product</h5>
                                                            <button
                                                                type="button"
                                                                class="btn-close"
                                                                data-bs-dismiss="modal"
                                                                aria-label="Close"
                                                                >
                                                            </button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <div class="form-group">
                                                                <label for="editProductName">Product Name</label>
                                                                <input
                                                                    type="text"
                                                                    name="editProductName"
                                                                    id="editProductName"
                                                                    value={editProductName}
                                                                    onChange={e => onChange(e)}
                                                                    className="form-control"
                                                                    placeholder="Product Name"
                                                                    maxLength={20}
                                                                    required
                                                                />
                                                            </div>
                                                            <div class="form-group">
                                                                <label for="productCategory">Product Category</label>
                                                                <select
                                                                    class="form-select"
                                                                    aria-label="Default select example"
                                                                    name="editProductCategory"
                                                                    id="editProductCategory"
                                                                    value={editProductCategory}
                                                                    onChange={e => onChange(e)}
                                                                    required
                                                                >
                                                                { categories.map(category => (
                                                                    <option value={category.id}>{category.name}</option>
                                                                )) }
                                                                </select>
                                                            </div>
                                                            <div class="form-group">
                                                                <label for="editProductQuantity">Quantity</label>
                                                                <input
                                                                    type="number"
                                                                    min={0} max={1000000}
                                                                    name="editProductQuantity"
                                                                    id="editProductQuantity"
                                                                    value={editProductQuantity}
                                                                    onChange={e => onChange(e)}
                                                                    className="form-control"
                                                                    placeholder="Quantity"
                                                                    step={1}
                                                                />
                                                            </div>
                                                            <div class="form-group">
                                                                <label for="editProductUnitPrice">Unit Price (₱)</label>
                                                                <input
                                                                    type="number"
                                                                    min={0} max={1000000}
                                                                    name="editProductUnitPrice"
                                                                    id="editProductUnitPrice"
                                                                    value={editProductUnitPrice}
                                                                    onChange={e => onChange(e)}
                                                                    className="form-control"
                                                                    placeholder="Unit Price"
                                                                    step={0.01}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button
                                                                type="button"
                                                                class="btn btn-primary"
                                                                data-bs-dismiss="modal"
                                                                
                                                                onClick={e => updateProduct(e, product.id)}
                                                                >
                                                                    <i class="bi-pencil-square"></i> &nbsp; Edit
                                                                </button>
                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => deleteProduct(product.id)} >
                                                        <i class="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}


export default Inventory