import "../styles/_ModalListaOperaciones.scss";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
const ModalListaOperaciones = ({ operaciones, handleClickNuevaOperacion }) => {
	const { data, setData } = useContext(DataContext);

	const handleClickEliminarOperacion = (id) => {
		console.log(`el valor del id es ${id}`);
		// Creo una copia de data y modifico en el lugar el array de operaciones
		const newDataOperaciones = {
			...data,
			operaciones: data.operaciones.filter((item) => item.id !== id),
		};
		// Actualizo el estado de data
		setData(newDataOperaciones);
	};
	const handleClickEditarOperacion = (operacion) => {
		handleClickNuevaOperacion(operacion);
	};
	return (
		<div className="card-opn">
			<div className="header">
				<div className="title-opn">Descripción</div>
				<div className="title-opn">Categoría</div>
				<div className="title-opn">Fecha</div>
				<div className="title-opn">Monto</div>
				<div className="title-opn">Acciones</div>
			</div>
			{operaciones.length > 0 ? (
				operaciones.map((operacion) => (
					<div key={operacion.id} className="row">
						<div className="flex-item">
							<span className="span-description-opn">
								{operacion.descripcion}
							</span>
						</div>
						<div className="flex-item">
							<span className="lista-categorias">{operacion.categoria}</span>
						</div>
						<div className="flex-item">
							<span className="span-date-opn">{operacion.fecha}</span>
						</div>
						<div className="flex-item span-monto">
							<span
								className={
									operacion.tipo === "Ganancia"
										? "monto-ganancia"
										: "monto-gasto"
								}
							>
								{operacion.tipo === "Ganancia" ? "+$" : "-$"}
								{operacion.monto}
							</span>
						</div>
						<div className="btn-opcn">
							<div className="box-btn-opn">
								<button onClick={() => handleClickEditarOperacion(operacion)}>
									Editar
								</button>
								<button
									onClick={() => handleClickEliminarOperacion(operacion.id)}
								>
									Eliminar
								</button>
							</div>
						</div>
					</div>
				))
			) : (
				<div className="span-opcn-modal">
					<span>No hay operaciones disponibles.</span>
				</div>
			)}
		</div>
	);
};
export default ModalListaOperaciones;
