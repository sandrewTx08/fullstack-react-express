import { Component } from "react"
import { Link } from 'react-router-dom'


class Navbar extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to='/' className='navbar-brand'>
                    Home
                </Link>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to='/login' className='nav-link'>
                            Login
                        </Link>
                        <Link to='/signin' className='nav-link'>
                            Sign-in
                        </Link>
                    </div>
                </div>
            </div>
        </nav>)
    }
}

export default Navbar
