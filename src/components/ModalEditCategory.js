import "../styles/_ModalEditCategory.scss";

const ModalEditCategory = ({ handleCancelEdit }) => {
	return (
		<div className="container-edit">
			<h2>Editar categoría</h2>
			<form>
				<label>Nombre</label>
				<input type="text"></input>
				<div className="ctn-button-edit">
					{/* el boton cancelar tiene que volver a categorias */}
					<button
						className="button-cancel"
						type="button"
						onClick={handleCancelEdit}
					>
						Cancelar
					</button>
					<button className="button-edit">Editar</button>
				</div>
			</form>
		</div>
	);
};

export default ModalEditCategory;
