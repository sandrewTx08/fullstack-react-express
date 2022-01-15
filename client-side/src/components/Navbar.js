import { Component } from "react"
import { Link } from 'react-router-dom'


class Navbar extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (<nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <Link to='/' className='navbar-brand'>
                    Home
                </Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
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
