import React, { Component } from 'react';
import cookie from 'react-cookies';
import ApiRequest from '../api/Requests';
import { Alert } from 'react-bootstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
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
                className="form-signin text-center needs-validation">
                <div style={{ position: 'absolute', right: '5px', top: '72px', display: this.state.alertdisplay ? 'block' : 'none' }}>
                    <Alert variant='danger'>
                        {this.state.alerttext}
                    </Alert>
                </div>
                <h1 className="h3 mb-4 font-weight-normal text-light"><u>Please sign in:</u></h1>
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
                <button className="btn btn-dark mb-2" type="submit"
                    onClick={
                        async (e) => {
                            e.preventDefault();
                            // "name" is required
                            if (this.state.name.length === 0) {
                                this.alert('Enter name please!');
                                return;
                            }
                            if (this.state.password.length === 0) {
                                this.alert('Enter password please!');
                                return;
                            }
                            var res = await ApiRequest.login(this.state.name, this.state.password);
                            if (res.data.token) {
                                cookie.save("token", res.data.token, { path: "/" });
                                window.location.reload();
                            } else {
                                this.setState({ alertdisplay: true, alerttext: res.data.message });
                                setTimeout(() => this.setState({ alertdisplay: false }), 7000);
                            }
                        }
                    }>
                    Sign in
                </button>
                <br /><br />
                <a href='/register'>
                    you don't have an account - register here
                </a>
            </form>
        );
    }
}
export default Login;