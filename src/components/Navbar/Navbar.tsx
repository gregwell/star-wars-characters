import logo from "../../images/logo.svg";
import { AppBar } from "@material-ui/core";

import useStyles from './styles';

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="fixed">
      <img src={logo} alt="star wars logo" className={classes.img}/>
    </AppBar>
  );
};

export default Navbar;
