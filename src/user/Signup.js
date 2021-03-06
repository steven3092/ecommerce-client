import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../core/Layout'
import { signup } from '../auth/index'

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success:
            false
    });

    const { name, email, password, error, success } = values



    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }


    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false })
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: false,
                        success: true
                    });
                }
            })
    }

    const signUpForm = () => (
        <form >
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control" required />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control" required />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control" required />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        < div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signin" > signin</Link>.
        </div >
    )
    return (
        (
            <Layout title="Signup"
                description="Signup to Node React E-commerce App"
                className="container col-md-8 offset-md-2">
                {showSuccess()}
                {showError()}
                {signUpForm()}
            </Layout>

        )
    )
}

export default Signup;