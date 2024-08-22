import "../styles/_Balance.scss";
import "../styles/_ModalOperacion.scss";
import imagenOperacion from "../imagenes/imagenOperacion.svg";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import ModalListaOperaciones from "./ModalListaOperaciones";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);
const Balance = () => {
	const [mostrarFiltros, setMostrarFiltros] = useState(true);
	const [mostrarModalOperacion, setMostrarModalOperacion] = useState(false);
	const [modoEdicion, setModoEdicion] = useState(false);
	const [operacionAEditar, setOperacionAEditar] = useState(null);
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
	const [filtroTipo, setFiltroTipo] = useState("");
	const [filtroCategoria, setFiltroCategoria] = useState("");
	const [filterDate, setFilterDate] = useState("");
	const [ordenarPor, setOrdenarPor] = useState("");
	useEffect(() => {
		setMostrarImagenOperacion(data.operaciones.length === 0);
	}, [data.operaciones]);

	const sumaGanancia = () => {
		return data.operaciones
			.filter((operacion) => operacion.tipo === "Ganancia")
			.reduce((total, operacion) => total + parseFloat(operacion.monto), 0);
	};
	const sumaGastos = () => {
		return data.operaciones
			.filter((operacion) => operacion.tipo === "Gasto")
			.reduce((total, operacion) => total + parseFloat(operacion.monto), 0);
	};
	const totalBalance = () => {
		return sumaGanancia() - sumaGastos();
	};

	//funcion ordenar por: mas reciente, menos reciente, mayor monto, menor monto, a/z, z/a
	const handleSortOperaciones = (opn, ordenarPor) => {
		const sortOperaciones = [...opn];

		const ordenAZ = (ope1, ope2) => {
			if (ope1.descripcion < ope2.descripcion) return -1;
			if (ope1.descripcion > ope2.descripcion) return 1;
			return 0;
		};

		switch (ordenarPor) {
			case "Mas reciente":
				sortOperaciones.sort((a, b) => dayjs(b.fecha).diff(dayjs(a.fecha)));
				break;
			case "Menos reciente":
				sortOperaciones.sort((a, b) => dayjs(a.fecha).diff(dayjs(b.fecha)));
				break;
			case "Mayor monto":
				sortOperaciones.sort(
					(a, b) => parseFloat(b.monto) - parseFloat(a.monto)
				);
				break;
			case "Menor monto":
				sortOperaciones.sort(
					(a, b) => parseFloat(a.monto) - parseFloat(b.monto)
				);
				break;
			case "A/Z":
				sortOperaciones.sort(ordenAZ);
				break;
			case "Z/A":
				sortOperaciones.sort(ordenAZ).reverse();
				break;
			default:
				break;
		}
		return sortOperaciones;
	};

	//filtrar operaciones por tipo y categoria
	const operacionesFiltradas = handleSortOperaciones(
		data.operaciones.filter((operacion) => {
			const tipoCoincide = filtroTipo === "" || operacion.tipo === filtroTipo;
			const categoriaCoincide =
				filtroCategoria === "" || operacion.categoria === filtroCategoria;

			//Verifico si la fecha es valida con dayjs
			const operacionFecha = dayjs(operacion.fecha);
			const filterDateFormatted = filterDate ? dayjs(filterDate) : null;

			// Compara las fechas solo si filterDate está definido y operacion.fecha es válida
			const fechaCoincide =
				!filterDateFormatted ||
				operacionFecha.isSameOrAfter(filterDateFormatted, "day");
			return tipoCoincide && categoriaCoincide && fechaCoincide;
		}),
		ordenarPor
	);

	const handleSelectFilterType = (e) => {
		setFiltroTipo(e.target.value);
	};

	const handleSelectFilterCategory = (e) => {
		setFiltroCategoria(e.target.value);
	};

	//funcion filtrar por fecha
	const handleChangeDate = (e) => {
		setFilterDate(e.target.value);
	};

	//funcion para mostrar modal de filtros y a la vez ocultarlos
	const toggleFiltros = () => {
		setMostrarFiltros(!mostrarFiltros);
	};
	//funcion mostrar modal de nueva operacion
	const handleClickNuevaOperacion = (operacion = null) => {
		setMostrarModalOperacion(true);
		setMostrarFiltros(false);
		setMostrarBotonNuevaOperacion(false);

		if (operacion) {
			setModoEdicion(true);
			setOperacionAEditar(operacion);
			setValuesForm(operacion);
		} else {
			setModoEdicion(false);
			setOperacionAEditar(null);
			setValuesForm({
				descripcion: "",
				monto: "",
				tipo: "",
				categoria: "",
				fecha: "",
			});
		}
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

		if (modoEdicion) {
			const operacionesActualizadas = data.operaciones.map((operacion) =>
				operacion.id === operacionAEditar.id
					? { ...valuesForm, id: operacion.id }
					: operacion
			);

			setData({
				...data,
				operaciones: operacionesActualizadas,
			});
		} else {
			const nuevaOperacionId = {
				...valuesForm,
				id: uuidv4(),
			};
			console.log(nuevaOperacionId);
			const nuevasOperaciones = [...data.operaciones, nuevaOperacionId];
			setData({
				...data,
				operaciones: nuevasOperaciones,
			});
		}

		handleClickCancelarOperacion();
		setMostrarImagenOperacion(false);
		//Reseteo el Formulario cuando elimino una operacion
		setValuesForm({
			descripcion: "",
			monto: "",
			tipo: "",
			categoria: "",
			fecha: "",
		});
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
							<div className="ganancia">$+{sumaGanancia()}</div>
						</div>
						<div className="contenedor-filas">
							<div>gastos</div>
							<div className="gasto">$-{sumaGastos()}</div>
						</div>
						<div className="contenedor-filas">
							<div className="total-balance">total</div>
							<div>${totalBalance()}</div>
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
						<select onChange={handleSelectFilterType}>
							<option value="">Todos</option>
							<option value="Gasto">Gasto</option>
							<option value="Ganancia">Ganancia</option>
						</select>
						<label>categoria</label>
						<select onChange={handleSelectFilterCategory}>
							<option value="">Todos</option>
							{data.categorias.map((option) => (
								<option key={option.id}>{option.nombre}</option>
							))}
						</select>
						<label>desde</label>
						<input
							type="date"
							name="fecha"
							value={valuesForm.fecha}
							onChange={handleChangeDate}
						></input>
						<label>ordenar por</label>
						<select
							value={ordenarPor}
							onChange={(e) => setOrdenarPor(e.target.value)}
						>
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
							onClick={() => handleClickNuevaOperacion()}
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
					<ModalListaOperaciones
						operaciones={operacionesFiltradas}
						handleClickNuevaOperacion={handleClickNuevaOperacion}
					/>
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
					<h2>{modoEdicion ? "Editar Operación" : "Nueva operación"}</h2>
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
							type="number"
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
							{modoEdicion ? "Guardar cambios" : "Agregar"}
						</button>
					</div>
				</div>
			</section>
		</section>
	);
};

export default Balance;
