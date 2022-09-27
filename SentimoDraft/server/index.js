import express, { application, Router } from "express"
import bodyParser from "body-parser"
import { pool } from "./pool.js"
import { generateJWT } from "./jwt/jwtGenerator.js"
import bcrypt from "bcryptjs"
import { auth } from "./middleware/auth.js"
import cors from "cors"


const app = express()
const PORT = 8000

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

//routes
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body

        console.log(req.body);
        
        const user = await pool.query(`
        SELECT * FROM employees_info 
        WHERE user_email = $1 AND user_pass = $2
        `, [username, password], (err, result) => {
            console.log("Row count: %d",result.rows.length);

            if(result.rows.length) {
                const token = generateJWT(result.rows[0])
                const id = result.rows[0].id;
                res.json({ token:token, id:id })
            } else {
                return res.status(401).json({msg:"Username or password is incorrect"})
            }
        })
    } catch (error) {
        // console.error(error.message);
        res.status(500).json({ msg: error.message });
    }
})


// USERS
app.post("/userinfo", async (req, res) => {
    try {
        console.log(req.body);
        const{
            employeeFirstName,
            employeeLastName,
            employeeGender,
            employeeMobile,
            employeeAddress,
            employeeEmail,
            employeePass
        } = req.body;
        
        const userExist = await pool.query("SELECT * FROM employees_info WHERE user_email = $1", [employeeEmail])
        if(userExist.rows.length)
            return res.json({"msg": "Email already exists."});

        const user = await pool.query(
            `INSERT INTO employees_info
            (first_name, last_name, user_gender, user_role, user_mobile, user_addr, user_email, user_pass) VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
            [
                employeeFirstName,
                employeeLastName,
                employeeGender,
                "Admin",
                employeeMobile,
                employeeAddress,
                employeeEmail,
                employeePass
            ]
        );

        res.json({"msg": "User added successfully."});
        // res.json(user.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
}).get("/userinfo", async(req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM employees_info ORDER BY first_name, last_name")
        res.json(allUsers.rows);
    } catch (err) {
        console.log(err.message);
    }
}).get("/userinfo/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const user = await pool.query("SELECT * FROM employees_info WHERE id = $1", [id])

      res.json(user.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
}).put("/userinfo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {
            editEmployeeFirstName,
            editEmployeeLastName,
            editEmployeeGender,
            editEmployeeMobile,
            editEmployeeAddress,
            editEmployeeEmail,
            editEmployeePass
        } = req.body;
        
        const updatecategories = await pool.query(
            `UPDATE employees_info SET
            first_name = $1,
            last_name = $2,
            user_gender = $3,
            user_mobile = $4,
            user_addr = $5,
            user_email = $6,
            user_pass = $7
            WHERE id = $8`,
            [
                editEmployeeFirstName,
                editEmployeeLastName,
                editEmployeeGender,
                editEmployeeMobile,
                editEmployeeAddress,
                editEmployeeEmail,
                editEmployeePass,
                id
            ]   
        );

        res.json({"msg": "User Profile updated successfully."});
        // res.json("Updated!");
    } catch (err) {
        console.log(err.message);
    }
}).delete("/userinfo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query(
            "DELETE FROM employees_info WHERE id = $1",
            [id]
        );

        res.json({"msg": "User was deleted."});
        // res.json("Deleted!");
    } catch (err) {
        console.log(err.message);
    }
})


// CATEGORIES
app.post("/categories", async (req, res) => {
    try {
        console.log(req.body);
        const{ categoryName, categoryDescription } = req.body;
        
        const categoryExist = await pool.query("SELECT * FROM categories WHERE name = $1", [categoryName])
        if(categoryExist.rows.length)
            return res.json({"msg": "Category Name already exists."});

        const category = await pool.query(
            "INSERT INTO categories (name, description) VALUES($1, $2) RETURNING *",
            [categoryName, categoryDescription]
        );

        res.json({"msg": "Category added successfully."});
        // res.json(category.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
}).get("/categories", async(req, res) => {
    try {
        const allCategories = await pool.query("SELECT * FROM categories ORDER BY name")
        res.json(allCategories.rows);
    } catch (err) {
        console.log(err.message);
    }
}).get("/categories/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const category = await pool.query("SELECT * FROM categories WHERE id = $1", [id])

      res.json(category.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
}).put("/categories/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { editCategoryName, editCategoryDescription } = req.body;
        
        const categoryExist = await pool.query("SELECT * FROM categories WHERE name = $1 AND id<>$2 ", [editCategoryName, id])
        if(categoryExist.rows.length)
            return res.json({"msg": "Category Name already exists."});

        const updatecategories = await pool.query(
            "UPDATE categories SET name = $1, description = $2 WHERE id = $3",
            [editCategoryName, editCategoryDescription, id]   
        );

        res.json({"msg": "Category updated successfully."});
        // res.json("Updated!");
    } catch (err) {
        console.log(err.message);
    }
}).delete("/categories/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletecategories = await pool.query(
            "DELETE FROM categories WHERE id = $1",
            [id]
        );

        res.json({"msg": "Category was deleted."});
        // res.json("Deleted!");
    } catch (err) {
        console.log(err.message);
    }
})



// PRODUCTS
app.post("/products", async (req, res) => {
    try {
        console.log(req.body);
        const{ productName, productCategory, productQuantity, productUnitPrice } = req.body;
        
        const productExist = await pool.query("SELECT * FROM products WHERE name = $1", [productName])
        if(productExist.rows.length)
            return res.json({"msg": "Product Name already exists."});

        const product = await pool.query(
            "INSERT INTO products (name, categories_id, qty, unitprice) VALUES($1, $2, $3, $4) RETURNING *",
            [productName, productCategory, productQuantity, productUnitPrice]
        );

        res.json({"msg": "Product added successfully."});
        // res.json(product.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
}).get("/products", async(req, res) => {
    try {
        const allProducts = await pool.query(
            `SELECT products.id, products.name, qty, unitprice, categories.id AS categoryid, categories.name AS categoryname FROM products
            INNER JOIN categories ON categories.id=products.categories_id
            ORDER BY name, qty DESC, unitprice DESC`)
        res.json(allProducts.rows);
    } catch (err) {
        console.log(err.message);
    }
}).get("/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await pool.query("SELECT * FROM products WHERE id = $1", [id])

      res.json(product.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
}).put("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { editProductName, editProductCategory, editProductQuantity, editProductUnitPrice } = req.body;
        
        const productExist = await pool.query("SELECT * FROM products WHERE name = $1 AND id<>$2 ", [editProductName, id])
        if(productExist.rows.length)
            return res.json({"msg": "Product Name already exists."});

        const updateProduct = await pool.query(
            "UPDATE products SET name = $1, categories_id = $2, qty = $3, unitprice = $4 WHERE id = $5",
            [editProductName, editProductCategory, editProductQuantity, editProductUnitPrice, id]   
        );

        res.json({"msg": "Product updated successfully."});
        // res.json("Updated!");
    } catch (err) {
        console.log(err.message);
    }
}).delete("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteProduct = await pool.query(
            "DELETE FROM products WHERE id = $1",
            [id]
        );

        res.json({"msg": "Product was deleted."});
        // res.json("Deleted!");
    } catch (err) {
        console.log(err.message);
    }
})



app.listen(PORT, () => {
    console.log(`Server has started on http://localhost:${PORT}`)
})