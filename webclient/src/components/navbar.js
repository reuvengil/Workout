import { Component } from "react";
import logo from '../images/favicon.png';
import logout from '../images/logout.png';
import cookie from 'react-cookies';
import FitnessIcon from '@material-ui/icons/FitnessCenter';
import EditIcon from '@material-ui/icons/Edit';
import Link from '@material-ui/core/Link';


export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = props.state;
    }
    render() {
        var extraNavbarBrand = null;
        if (this.state.connected) {
            extraNavbarBrand =
                <>
                    <Link href="/createNew"
                        underline='none'
                        className="navbar-brand text-light">
                        Create New Workout
                        <EditIcon style={{ width: '20px', height: '20px' }} />
                    </Link>
                    <Link href="/showWorkout"
                        underline='none'
                        className="navbar-brand text-light">
                        Show Workout
                        <FitnessIcon style={{ width: '20px', height: '20px' }} />
                    </Link>
                    <Link href="/"
                        underline='none'
                        className="navbar-brand text-light">
                        <img src={logout} width="30" height="30" alt="logout"
                            onClick={(e) => {
                                cookie.remove('token');
                                window.location.reload();
                            }} />
                    </Link>
                </>
        }
        return (
            <nav id="navbar" className="navbar">
                <a className="navbar-brand text-light" href="/">
                    <big>{this.state.title}</big> <img src={logo} width="30" height="30" alt=""></img> <small>- {this.state.subtitle}</small>
                </a>
                {extraNavbarBrand}
            </nav>
        );
    }
}