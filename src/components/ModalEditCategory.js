import "../styles/_ModalEditCategory.scss";
const ModalEditCategory = ({
	handleCancelEdit,
	handleEdit,
	nuevaCategoria,
	SetNuevaCategoria,
}) => {
	return (
		<div className="container-edit">
			<h2>Editar categoría</h2>
			<form>
				<label>Nombre</label>
				<input
					type="text"
					value={nuevaCategoria}
					onChange={(e) => SetNuevaCategoria(e.target.value)}
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
