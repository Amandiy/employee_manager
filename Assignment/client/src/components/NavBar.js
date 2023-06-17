import {AppBar , Toolbar, styled} from '@mui/material';
import { NavLink } from 'react-router-dom';

const Hearder = styled(AppBar)`
background: #FFB400;
position:fixed;
top:0;
`

const Tabs = styled(NavLink)`
font-size:20px;
margin-right:20px;
color:inherit;
text-decoration:none;
`

const NavBar = () => {
    return (
        <Hearder position="static">
            <Toolbar>
              <Tabs  >Employee Manager</Tabs> 
              

            </Toolbar>
        </Hearder>
    )
}
export default NavBar;