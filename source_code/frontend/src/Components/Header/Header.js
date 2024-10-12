import './Header.css'
import logo from '../../Assets/01_graphql_logo_icon.png'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header d-flex'>
      <div className="container d-flex align-items-center flex-column flex-sm-row">
        <Link to='/'>
          <img className='header__logo' src={logo} alt="logo" />
        </Link>
        <h1 className='header__title'>Project Management</h1>
      </div>
    </div>
  )
}

export default Header