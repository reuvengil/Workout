import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import ApiRequest from '../api/Requests';
import cookie from "react-cookies";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            confirmPassword: '',
            alertdisplay: false,
            alerttext: '',
        }
    }
    alert(message) {
        this.setState({ alertdisplay: true, alerttext: message });
        setTimeout(() => this.setState({ alertdisplay: false }), 7000);
    }
    render() {
        return (
            <form
                autoComplete="off"
                className="form-signin text-center needs-validation">
                <div style={{ position: 'absolute', right: '5px', top: '72px', display: this.state.alertdisplay ? 'block' : 'none' }}>
                    <Alert variant='danger'>
                        {this.state.alerttext}
                    </Alert>
                </div>
                <h1 className="h3 mb-4 font-weight-normal text-light"><u>Please Register</u></h1>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    required
                    value={this.state.name}
                    autoFocus
                    onChange={(e) => { this.setState({ name: e.target.value }) }}
                />
                <input
                    type="password"
                    name="form_password"
                    className="form-control"
                    required
                    value={this.state.password}
                    placeholder="Password"
                    onChange={(e) => this.setState({ password: e.target.value })}
                />
                <input
                    type="password"
                    name="form_password"
                    className="form-control"
                    required
                    value={this.state.confirmPassword}
                    placeholder="Confirm"
                    onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                />
                <button className="btn btn-dark mb-2" type="submit"
                    onClick={
                        async (e) => {
                            e.preventDefault();
                            if (this.state.name.length === 0) {
                                this.alert('Enter name please!');
                                return;
                            }
                            if (this.state.password.length === 0) {
                                this.alert('Enter password please!');
                                return;
                            }
                            if (!(this.state.confirmPassword === this.state.password)) {
                                this.alert('Passwords mismatch!');
                                return;
                            }
                            var res = await ApiRequest.register(this.state.name, this.state.password);
                            if (res.data.message) {
                                this.alert(res.data.message)
                            } else if (res.data.token) {
                                cookie.save("token", `${res.data.token}`, { path: "/" });
                                document.location.href = '/';
                            }
                        }
                    }>
                    register
                </button>
                <br /><br />
                <a href='/'>
                    you already have an account - login here
                </a>
            </form>


        )
    }
}