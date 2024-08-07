import { useState, useContext, useEffect } from "react";
import "../styles/_ModalEditCategory.scss";
import { DataContext } from "../context/DataContext";
const ModalEditCategory = () => {
	const { nuevaCategoria, data, setData, setShowModalEditCategory } =
		useContext(DataContext);
	const [nuevoNombreCategoria, setNuevoNombreCategoria] = useState(
		nuevaCategoria.nombre
	);
	useEffect(() => {
		if (nuevaCategoria) {
			setNuevoNombreCategoria(nuevaCategoria.nombre);
		}
	}, [nuevaCategoria]);
	const handleCancelEdit = () => {
		setShowModalEditCategory(false);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	const handleClickEnviarCategoriaEditada = () => {
		console.log(`El id de la categoria es: ${nuevaCategoria.id}`);
		console.log(`La nueva cat es ${nuevoNombreCategoria}`);
		const newData = {
			...data,
			categorias: data.categorias.map((item) =>
				item.id === nuevaCategoria.id
					? { ...item, nombre: nuevoNombreCategoria }
					: item
			),
		};
		setData(newData);
		setShowModalEditCategory(false);
	};

	return (
		<div className="container-edit">
			<h2>Editar categoría</h2>
			<form onSubmit={handleSubmit}>
				<label>Nombre</label>
				<input
					type="text"
					value={nuevoNombreCategoria}
					onChange={(e) => setNuevoNombreCategoria(e.target.value)}
				></input>
				<div className="ctn-button-edit">
					<button
						className="button-cancel"
						type="button"
						onClick={handleCancelEdit}
					>
						Cancelar
					</button>
					<button
						className="button-edit"
						type="submit"
						onClick={handleClickEnviarCategoriaEditada}
					>
						Editar
					</button>
				</div>
			</form>
		</div>
	);
};

export default ModalEditCategory;
