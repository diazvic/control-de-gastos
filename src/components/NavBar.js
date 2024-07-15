import { Link } from "react-router-dom";
import WalletIcon from "@mui/icons-material/Wallet";
const NavBar = () => {
	return (
		<nav>
			<div>
				<WalletIcon />
				<h1>control de gastos</h1>
			</div>
			<ul>
				<li>
					<Link to="/Balance" />
				</li>
				<li>
					<Link to="/Categorias" />
				</li>
				<li>
					<Link to="/Reportes" />
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
