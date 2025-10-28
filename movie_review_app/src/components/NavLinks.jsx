import { Link } from "react-router-dom";
function NavLinks(){
    return(
        <>
        <nav>
            <Link to="/Profile">Profile</Link> | <Link to="/Dashboard">Dashboard</Link> | <Link to="/Movielist">Movielist</Link>
        </nav>
        
        </>
    );
}
export default NavLinks;