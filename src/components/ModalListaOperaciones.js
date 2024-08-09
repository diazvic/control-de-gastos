import "../styles/_ModalListaOperaciones.scss";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
const ModalListaOperaciones = () => {
	const { data } = useContext(DataContext);

	console.log(data.operaciones);
	return (
		<div className="card-opn">
			<div className="header">
				<div className="title-opn">Descripción</div>
				<div className="title-opn">Categoría</div>
				<div className="title-opn">Fecha</div>
				<div className="title-opn">Monto</div>
				<div className="title-opn">Acciones</div>
			</div>
			{data.operaciones.length > 0 ? (
				data.operaciones.map((operacion, index) => (
					<div key={index} className="row">
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
							<span>${operacion.monto}</span>
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
				<span>No hay operaciones disponibles.</span>
			)}
		</div>
	);
};
export default ModalListaOperaciones;
