import { Link } from "react-router-dom";
import WalletIcon from "@mui/icons-material/Wallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SellIcon from "@mui/icons-material/Sell";
import PieChartIcon from "@mui/icons-material/PieChart";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

import "../styles/_NavBar.scss";
import { useState } from "react";
const NavBar = () => {
	const [isMobile, setIsMobile] = useState(false);

	const handleClickHamburguerMobile = () => {
		setIsMobile(!isMobile);
	};
	const handleLinkClick = () => {
		setIsMobile(false);
	};
	return (
		<nav>
			<div className="contenedor-nav-titulo">
				<WalletIcon className="icono-nav-cartera" />
				<h1>control de gastos</h1>
			</div>
			<button
				className="mobile-menu-icon"
				onClick={handleClickHamburguerMobile}
			>
				{isMobile ? <IoMdClose /> : <FiMenu />}
			</button>
			<div className={`contenedor-nav-lista ${isMobile ? "active" : ""}`}>
				<ul>
					<li>
						<Link to="/Balance" className="link-nav" onClick={handleLinkClick}>
							<TrendingUpIcon className="iconos-nav" />
							balance
						</Link>
					</li>
					<li>
						<Link
							to="/Categorias"
							className="link-nav"
							onClick={handleLinkClick}
						>
							<SellIcon className="iconos-nav" />
							categorías
						</Link>
					</li>
					<li>
						<Link to="/Reportes" className="link-nav" onClick={handleLinkClick}>
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
