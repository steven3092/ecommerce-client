import React, { useState } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth/index'
import { Link } from 'react-router-dom'
import { createCategory } from './apiAdmin'


const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // destructure user and info from localstorage
    const { user, token } = isAuthenticated()

    const handleChange = (e) => {
        setError('')
        setName(e.target.value)
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        //make to api to create category
        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(true)
                } else {
                    setError(false)
                    setSuccess(true)
                }
            })
    }

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" autoFocus className="form-control" onChange={handleChange} value={name} required />
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    )


    const showSuccess = () => {
        if (success) {
            return <h6 className="text-success">{name} is created</h6>
        }
    }

    const showError = () => {
        if (error) {
            return <h6 className="text-danger">This category already exists, it should be unique</h6>
        }
    }

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">Back to Dashboard</Link>
        </div>

    )

    return (
        <Layout title="Add a new category" description={`Good day ${user.name}, ready to add a new category ?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    )
}

export default AddCategory;