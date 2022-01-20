import { Link } from 'react-router-dom'


export default () => {
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
                    <Link to='/signup' className='nav-link'>
                        Sign-Up
                    </Link>
                </div>
            </div>
        </div>
    </nav>)
}

