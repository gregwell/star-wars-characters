import logo from "../images/logo.svg";
import './Header.css';

const Header = () => {
  return (
<div>
  <img src={logo} alt="star wars logo" className="image"/>
  <p className="title"> Browse your favorite Star Wars characters </p>
</div>
  
  )
}


export default Header;
