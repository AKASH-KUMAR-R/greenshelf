import { Link } from "react-router-dom/cjs/react-router-dom.min";


const NavBar = (props) => {
    return (
        <div className="navbar bg-base-100 bg-co">
            <div className="navbar-start ml-4">
                <img src="./logo1.png" style={{
                    width: "50px",
                    height: "50px"
                }}></img>
            </div>
            <div className="navbar-center hidden lg:flex" style={{
                display: props.loginStatus? "block": "none",
            }}>
                <ul className="menu menu-horizontal px-1">
                <li><Link to="/inventory">Inventory</Link></li>
                <li><Link to="/contribute">Contribute</Link></li>
                <li><Link to="/requestItem">Request</Link></li>
                <li
                style={{
                    display: props.contributor ? "block": "none",
                }}><Link to="/requestedItems">Requested Item</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <Link to="/"><a className="btn">
                    <span style={{
                        display: props.loginStatus ? "block" : "none",
                }}
                onClick={() => {
                    props.setLoginStatus(false);
                }}>Log out</span>
                <span style={{
                    display: props.loginStatus ? "none" : "block",
                }}>Log in</span></a></Link>
            </div>
        </div>
    );
}

export default NavBar;