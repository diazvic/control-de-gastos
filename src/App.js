import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Balance from "./components/Balance";
import Categorias from "./components/Categorias";
import Reportes from "./components/Reportes";
import "./App.scss";
const App = () => {
	return (
		<div>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/" element={<Balance />} />
					<Route path="/categorias" element={<Categorias />} />
					<Route path="/reportes" element={<Reportes />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
