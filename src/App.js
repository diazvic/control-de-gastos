import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Balance from "./components/Balance";
import Categorias from "./components/Categorias";
import Reportes from "./components/Reportes";
const App = () => {
	return (
		<div>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/balance" element={<Balance />}></Route>
					<Route path="/categorias" element={<Categorias />}></Route>
					<Route path="/reportes" element={<Reportes />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
