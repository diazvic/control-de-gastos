import "../styles/_Balance.scss";
import imagenOperacion from "../imagenes/imagenOperacion.svg";
const Balance = () => {
	return (
		<section>
			<div className="columnas-balance">
				<div className="contenedor-balance">
					<h2>balance</h2>
					<div className="contenedor-filas">
						<div>ganancias</div>
						<div>$+0</div>
					</div>
					<div className="contenedor-filas">
						<div>gastos</div>
						<div>$-0</div>
					</div>
					<div className="contenedor-filas">
						<div>total</div>
						<div>$0</div>
					</div>
				</div>
				<div className="contenedor-balance filtros">
					<div className="contenedor-filtros">
						<h3>filtros</h3>
						<button>ocultar filtros</button>
					</div>
					<form className="formulario-filtros">
						<label>tipo</label>
						<select>
							<option>todos</option>
							<option>gasto</option>
							<option>ganancia</option>
						</select>
						<label>categoria</label>
						<select>
							<option>todos</option>
							<option>gasto</option>
							<option>ganancia</option>
						</select>
						<label>desde</label>
						<input type="date"></input>
						<label>ordenar por</label>
						<select>
							<option>más reciente</option>
							<option>menos reciente</option>
							<option>mayor monto</option>
							<option>menor monto</option>
							<option>a/z</option>
							<option>z/a</option>
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
