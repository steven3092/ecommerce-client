import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth/index'
import { Link } from 'react-router-dom'
import { getCategories, deleteCategory } from './apiAdmin'


const ManageCategories = () => {
    const [categories, setCategories] = useState([])
    const { user: { _id }, token } = isAuthenticated()


    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setCategories(data)
            }
        })
    }

    const destroy = productId => {
        deleteCategory(productId, _id, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    loadCategories()
                }
            })
    }


    useEffect(() => {
        loadCategories();
    }, [])




    return (
        <Layout
            className="container-fluid"
            title="Manage Products"
            description="Perform CRUD on products"
        >
            <div className='row'>
                <div className="col-12">
                    <h2 className="text-center">
                        Total {categories.length} categories
                        </h2>
                    <hr />
                    <ul className="list-group">
                        {categories.map((c, i) => {
                            return (
                                <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                    <strong>{c.name}</strong>
                                    <Link to={`/admin/category/update/${c._id}`}>
                                        <span className="badge badge-warning badge-pill">
                                            Update
                                    </span>
                                    </Link>
                                    <span onClick={() => destroy(c._id)} className="badge badge-danger badge-pill">
                                        Delete
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>

        </Layout>
    )
}


export default ManageCategories;