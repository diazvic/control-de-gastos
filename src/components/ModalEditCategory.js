import "../styles/_ModalEditCategory.scss";
const ModalEditCategory = ({
	handleCancelEdit,
	handleEdit,
	nuevaCategoria,
	setNuevaCategoria,
	data,
	setData,
}) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("funciona");
		console.log(nuevaCategoria.nombre);
	};
	return (
		<div className="container-edit">
			<h2>Editar categoría</h2>
			<form onSubmit={handleSubmit}>
				<label>Nombre</label>
				<input
					type="text"
					value={nuevaCategoria}
					onChange={(e) => setNuevaCategoria(e.target.value)}
				></input>
				<div className="ctn-button-edit">
					{/* el boton cancelar tiene que volver a categorias */}
					<button
						className="button-cancel"
						type="button"
						onClick={handleCancelEdit}
					>
						Cancelar
					</button>
					<button className="button-edit" type="submit" onSubmit={handleEdit}>
						Editar
					</button>
				</div>
			</form>
		</div>
	);
};

export default ModalEditCategory;
