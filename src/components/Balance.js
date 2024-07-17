import "../styles/_Balance.scss";
import imagenOperacion from "../imagenes/imagenOperacion.svg";
import { useState } from "react";
const Balance = () => {
	const [mostrarFiltros, setMostrarFiltros] = useState(true);

	const toggleFiltros = () => {
		setMostrarFiltros(!mostrarFiltros);
	};
	return (
		<section>
			<div className="columnas-balance">
				<div className="contenedor-balance">
					<h2>balance</h2>
					<div className="grupo-filas">
						<div className="contenedor-filas">
							<div>ganancias</div>
							<div className="ganancia">$+0</div>
						</div>
						<div className="contenedor-filas">
							<div>gastos</div>
							<div className="gasto">$-0</div>
						</div>
						<div className="contenedor-filas">
							<div className="total-balance">total</div>
							<div>$0</div>
						</div>
					</div>
				</div>
				<div className="contenedor-balance filtros">
					<div className="contenedor-filtros">
						<h3>filtros</h3>
						<button onClick={toggleFiltros}>
							{mostrarFiltros ? "ocultar filtros" : "mostrar filtros"}
						</button>
					</div>
					<form
						className={`formulario-filtros ${mostrarFiltros ? "" : "oculto"}`}
					>
						<label>tipo</label>
						<select>
							<option>Todos</option>
							<option>Gasto</option>
							<option>Ganancia</option>
						</select>
						<label>categoria</label>
						<select>
							<option>Todos</option>
							<option>Gasto</option>
							<option>Ganancia</option>
						</select>
						<label>desde</label>
						<input type="date"></input>
						<label>ordenar por</label>
						<select>
							<option>Más reciente</option>
							<option>Menos reciente</option>
							<option>Mayor monto</option>
							<option>Menor monto</option>
							<option>A/Z</option>
							<option>Z/A </option>
						</select>
					</form>
				</div>
			</div>
			<div className="contenedor-operacion-balance">
				<div className="operacion-balance-titulo">
					<h3>operaciones</h3>
					<button className="btn-operacion">+ Nueva operación</button>
				</div>
				<div className="contenedor-img-operacion">
					<img src={imagenOperacion} alt="operaciones en un ordenador" />
				</div>
				<div className="parrafo-operaciones">
					<h4>Sin resultados</h4>
					<p>Cambia los filtros o agrega operaciones</p>
				</div>
			</div>
		</section>
	);
};

export default Balance;
