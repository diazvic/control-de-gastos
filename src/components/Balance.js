import "../styles/_Balance.scss";
import "../styles/_ModalOperacion.scss";
import imagenOperacion from "../imagenes/imagenOperacion.svg";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import ModalListaOperaciones from "./ModalListaOperaciones";
const Balance = () => {
	const [mostrarFiltros, setMostrarFiltros] = useState(true);
	const [mostrarModalOperacion, setMostrarModalOperacion] = useState(false);
	const [mostrarBotonNuevaOperacion, setMostrarBotonNuevaOperacion] =
		useState(true);
	const { data, setData } = useContext(DataContext);
	const [valuesForm, setValuesForm] = useState({
		descripcion: "",
		monto: "",
		tipo: "",
		categoria: "",
		fecha: "",
	});
	const [mostrarImagenOperacion, setMostrarImagenOperacion] = useState(
		data.operaciones.length === 0
	);

	useEffect(() => {
		setMostrarImagenOperacion(data.operaciones.length === 0);
	}, [data.operaciones]);
	//funcion para mostrar modal de filtros y a la vez ocultarlos
	const toggleFiltros = () => {
		setMostrarFiltros(!mostrarFiltros);
	};
	//funcion mostrar modal de nueva operacion
	const handleClickNuevaOperacion = () => {
		setMostrarModalOperacion(!mostrarModalOperacion);
		setMostrarFiltros(!mostrarFiltros);
		setMostrarBotonNuevaOperacion(false);
	};
	//funcion clic para cambiar el estado y volver a la seccion balance
	const handleClickCancelarOperacion = () => {
		setMostrarModalOperacion(false);
		setMostrarBotonNuevaOperacion(true);
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setValuesForm({
			...valuesForm,
			[name]: value,
		});
	};
	const handleSubmitNuevaOperacion = (e) => {
		e.preventDefault();
		console.log("envio de form");
		console.log(valuesForm);
		const nuevasOperaciones = [...data.operaciones, valuesForm];
		setData({
			...data,
			operaciones: nuevasOperaciones,
		});
		handleClickCancelarOperacion();
		setMostrarImagenOperacion(false);
	};
	return (
		<section>
			<div
				className={`columnas-balance ${mostrarModalOperacion ? "oculto" : ""}`}
			>
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
			<div
				className={`contenedor-operacion-balance ${
					mostrarModalOperacion ? "oculto" : ""
				}`}
			>
				<div className="operacion-balance-titulo">
					<h3>operaciones</h3>
					{mostrarBotonNuevaOperacion && (
						<button
							onClick={handleClickNuevaOperacion}
							className="btn-operacion"
						>
							+ Nueva operación
						</button>
					)}
				</div>
				{mostrarImagenOperacion && (
					<div className="contenedor-img-operacion">
						<img src={imagenOperacion} alt="operaciones en un ordenador" />
					</div>
				)}
				{data.operaciones.length > 0 ? (
					<ModalListaOperaciones />
				) : (
					<div className="parrafo-operaciones">
						<h4>Sin resultados</h4>
						<p>Cambia los filtros o agrega operaciones</p>
					</div>
				)}
			</div>
			<section
				className={`contenedor-modal ${mostrarModalOperacion ? "" : "oculto"}`}
			>
				<div className="contenedor-modal">
					<h2>Nueva operación</h2>
					<form onSubmit={handleSubmitNuevaOperacion}>
						<label>Descripción</label>
						<input
							type="text"
							name="descripcion"
							value={valuesForm.descripcion}
							onChange={handleChange}
						></input>
						<label>Monto</label>
						<input
							type="text"
							name="monto"
							value={valuesForm.monto}
							onChange={handleChange}
						></input>
						<label>Tipo</label>
						<select name="tipo" value={valuesForm.tipo} onChange={handleChange}>
							<option>Gasto</option>
							<option>Ganancia</option>
						</select>
						<label>Categoría</label>
						<select
							name="categoria"
							value={valuesForm.categoria}
							onChange={handleChange}
						>
							{data.categorias.map((categoria) => (
								<option key={categoria.id} value={categoria.nombre}>
									{categoria.nombre}
								</option>
							))}
						</select>
						<label>Fecha</label>
						<input
							type="date"
							name="fecha"
							value={valuesForm.fecha}
							onChange={handleChange}
						></input>
					</form>
					<div className="botones-operacion">
						<button
							className="btn-cancelar"
							onClick={handleClickCancelarOperacion}
						>
							Cancelar
						</button>
						<button
							className="btn-agregar"
							type="submit"
							onClick={handleSubmitNuevaOperacion}
						>
							Agregar
						</button>
					</div>
				</div>
			</section>
		</section>
	);
};

export default Balance;
