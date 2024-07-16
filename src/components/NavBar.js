import { Link } from "react-router-dom";
import WalletIcon from "@mui/icons-material/Wallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SellIcon from "@mui/icons-material/Sell";
import PieChartIcon from "@mui/icons-material/PieChart";
import "../styles/_NavBar.scss";
const NavBar = () => {
	return (
		<nav>
			<div className="contenedor-nav-titulo">
				<WalletIcon className="icono-nav-cartera" />
				<h1>control de gastos</h1>
			</div>
			<div className="contenedor-nav-lista">
				<ul>
					<li>
						<Link to="/Balance" className="link-nav">
							<TrendingUpIcon className="iconos-nav" />
							balance
						</Link>
					</li>
					<li>
						<Link to="/Categorias" className="link-nav">
							<SellIcon className="iconos-nav" />
							categorías
						</Link>
					</li>
					<li>
						<Link to="/Reportes" className="link-nav">
							<PieChartIcon className="iconos-nav" />
							reportes
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default NavBar;
