/* eslint-disable no-throw-literal */
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

//jQuery libraries
import 'jquery/dist/jquery.min.js';
 
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

function Category() {

    const [inputs, setInputs] = useState({
        categoryName: "",
        categoryDescription: "",
        editCategoryName: "",
        editCategoryDescription: ""
    })
    
    //setting the inputs
    const onChange = e => { setInputs({ ...inputs, [e.target.name]: e.target.value }) }

    //deconstructing the name and description variable from the inputs
    const {
        categoryName,
        categoryDescription,
        editCategoryName,
        editCategoryDescription
    } = inputs

    const onSubmitAddCategoryForm = async (e) => {
        e.preventDefault()
        try {
            const body = { categoryName, categoryDescription }
            //fetch api for POST method
            const response = await fetch(
                "http://localhost:8000/categories",
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

            // refresh category list
            getCategories();
            // clear input
            setInputs({categoryName: "", categoryDescription: ""})
            // display message
            alert(parseRes.msg);
        } catch (error) {
            console.log(error)
        }
    }

    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {
            const response = await fetch("http://localhost:8000/categories")
            const jsonData = await response.json()

            setCategories(jsonData);
            
            setTimeout(function(){ $('#table').DataTable() } , 1);
        } catch (err) {
            console.error(err.message)
        }
    }

    const updateCategory = async (e, id) => {
        e.preventDefault();
        try {
            if(editCategoryName==="")
                throw "Failed to Update. Category Name is required.";
            
            if(editCategoryDescription==="")
                throw "Failed to Update. Category Description is required.";

            const body = { editCategoryName, editCategoryDescription };
            const response = await fetch(`http://localhost:8000/categories/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            // parse response
            const parseRes = await response.json();

            // refresh category list
            getCategories();
            // display message
            alert(parseRes.msg);
        } catch (err) {
            alert(err);
        }
    }

    //delete category function
    const deleteCategory = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/categories/${id}`, {
                method: "DELETE"
            });
            // parse response
            const parseRes = await response.json();

            // refresh category list
            getCategories();
            // display message
            alert(parseRes.msg);
        } catch (err) {
            console.error(err.message);
        }
    }




    useEffect(() => { getCategories(); }, []);

    return (
        <div class="cards m-5">
            <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-3">
                    <Sidebar/>
                </div>
                
                <div className="col-lg-9 col-md-9 col-sm-9 mt-3">
                    
                    <div className="container border p-3 mt-3">
                        <div className="row">
                            <div className="col-lg-12">
                                    
                                <form onSubmit={onSubmitAddCategoryForm}>

                                    <div className="container mt-3">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <h4> Add Category </h4>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div class="form-group">
                                                    <label for="categoryName">Category Name</label>
                                                    <input
                                                        type="text"
                                                        name="categoryName"
                                                        id="categoryName"
                                                        value={categoryName}
                                                        onChange={e => onChange(e)}
                                                        className="form-control"
                                                        placeholder="Category Name"
                                                        maxLength={20}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div class="form-group">
                                                    <label for="categoryDescription">Category Description</label>
                                                    <input
                                                        type="text"
                                                        name="categoryDescription"
                                                        id="categoryDescription"
                                                        value={categoryDescription}
                                                        onChange={e => onChange(e)}
                                                        className="form-control"
                                                        placeholder="Category Description"
                                                        maxLength={50}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-2 col-md-12 col-sm-12">
                                                <div class="d-grid">
                                                    <input type="submit" className="btn btn-primary mt-4" value="Add Category" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            
                            <hr className="mt-5" />

                            <div className="col-lg-12 mt-3">
                                <center><h4> Category List </h4></center>
                                <table className="table" id="table">
                                    <thead>
                                    <tr>
                                        <th>Category Name</th>
                                        <th>Description</th>
                                        <th width="5%">Edit</th>
                                        <th width="5%">Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map(category => (
                                            <tr key={category.id}>
                                                <td>{category.name}</td>
                                                <td>{category.description}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        class="btn btn-primary"
                                                        data-bs-toggle="modal"
                                                        data-bs-target={`#id${category.id}`}
                                                        onClick={() =>
                                                            setInputs({editCategoryName: category.name, editCategoryDescription: category.description})
                                                        }
                                                    >
                                                        <i class="bi-pencil-square"></i>
                                                    </button>
                                                    <div class="modal fade" id={`id${category.id}`} tabindex="-1" aria-labelledby="modalEditCategoryLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="modalEditCategoryLabel">Edit Category</h5>
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
                                                                <label for="editCategoryName">Category Name</label>
                                                                <input
                                                                    type="text"
                                                                    name="editCategoryName"
                                                                    id="editCategoryName"
                                                                    value={editCategoryName}
                                                                    onChange={e => onChange(e)}
                                                                    className="form-control text-center"
                                                                    placeholder="Category Name"
                                                                    maxLength={20}
                                                                    required
                                                                />
                                                            </div>
                                                            <div class="form-group">
                                                                <label for="editCategoryDescription">Category Description</label>
                                                                <input
                                                                    type="text"
                                                                    name="editCategoryDescription"
                                                                    id="editCategoryDescription"
                                                                    value={editCategoryDescription}
                                                                    onChange={e => onChange(e)}
                                                                    className="form-control text-center"
                                                                    placeholder="Category Description"
                                                                    maxLength={50}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button
                                                                type="button"
                                                                class="btn btn-warning"
                                                                data-bs-dismiss="modal"
                                                                
                                                                onClick={e => updateCategory(e, category.id)}
                                                                >
                                                                    Update
                                                                </button>
                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => deleteCategory(category.id)} >
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


export default Category