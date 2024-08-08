import "../styles/_ModalListaOperaciones.scss";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
const ModalListaOperaciones = () => {
	const { data } = useContext(DataContext);

	console.log(data.operaciones);
	return (
		<div className="card-opn">
			<div className="header">
				<div>Descripción</div>
				<div>Categoría</div>
				<div>Fecha</div>
				<div>Monto</div>
				<div>Acciones</div>
			</div>
			{data.operaciones.length > 0 ? (
				data.operaciones.map((operacion, index) => (
					<div key={index} className="row">
						<div className="flex-item">
							<p>{operacion.descripcion}</p>
						</div>
						<div className="flex-item">
							<p className="lista-categorias">{operacion.categoria}</p>
						</div>
						<div className="flex-item">
							<p>{operacion.fecha}</p>
						</div>
						<div className="flex-item">
							<p>${operacion.monto}</p>
						</div>
						<div className="btn-opcn">
							<div className="box-btn-opn">
								<button>Editar</button>
								<button>Eliminar</button>
							</div>
						</div>
					</div>
				))
			) : (
				<p>No hay operaciones disponibles.</p>
			)}
		</div>
	);
};
export default ModalListaOperaciones;
