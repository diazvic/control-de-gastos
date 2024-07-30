import "../styles/_ModalEditCategory.scss";

const ModalEditCategory = () => {
	return (
		<div className="container-edit">
			<h2>Editar categoría</h2>
			<form>
				<label>Nombre</label>
				<input type="text"></input>
			</form>
			<div className="ctn-button-edit">
				<button className="button-cancel">Cancelar</button>
				<button className="button-edit">Editar</button>
			</div>
		</div>
	);
};

export default ModalEditCategory;
