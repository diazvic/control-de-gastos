import { Link } from "react-router-dom";
import "../styles/NavBar.scss";
const NavBar = () => {
	return (
		<div>
			<ul>
				<li>
					<Link style={{ color: "white", textDecoration: "none" }} to="/">
						Balance
					</Link>
				</li>
				<li>
					<Link
						style={{ color: "white", textDecoration: "none" }}
						to="/categorias"
					>
						Categorias
					</Link>
				</li>
				<li>
					<Link
						style={{
							color: "white",
							textDecoration: "none",
						}}
						to="/reportes"
					>
						Reportes
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default NavBar;
