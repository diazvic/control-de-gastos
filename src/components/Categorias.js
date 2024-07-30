import { useLocalStorage } from "@uidotdev/usehooks";
// Hook en https://usehooks.com/uselocalstorage
import { useState } from "react";
import "../styles/_ModalOperacion.scss";
import "../styles/_Categorias.scss";
import ModalEditCategory from "./ModalEditCategory";
const Categorias = () => {
	const categorias = {
		categorias: [
			{ id: 1, nombre: "comidas" },
			{ id: 2, nombre: "servicios" },
			{ id: 3, nombre: "salidas" },
			{ id: 4, nombre: "educación" },
			{ id: 5, nombre: "transporte" },
			{ id: 6, nombre: "trabajo" },
		],
		operaciones: [],
	};

	const [data, setData] = useLocalStorage("controlDeGastos", categorias);
	const [nuevaCategoria, setNuevaCategoria] = useState("");
	// El valor inicial del id es la longitud del array que esta en el local storage mas uno.
	const [id, setId] = useState(Number(data.categorias.length + 1));
	const [showModalEditCategory, setShowModalEditCategory] = useState(false);

	const handleClickEliminarCategoria = (e) => {
		// Del evento agarro el valor del elemento del dataset para buscar la categoria.
		const categoriaId = Number(e.target.dataset.categoria);
		// Creo una copia de data y modifico en el lugar el array de categorias.
		const newData = {
			...data,
			categorias: data.categorias.filter((item) => item.id !== categoriaId),
		};
		// Actualizo el estado de data
		setData(newData);
	};

	const handleClickAgregarCategoria = (e) => {
		e.preventDefault();
		if (nuevaCategoria.trim() !== "") {
			//condicion para no agregar una categoria vacia
			const newCategory = { id: id, nombre: nuevaCategoria };
			// Genero la estructura de lo que tengo guardado en local storage pero con la nueva categoria.
			const newData = {
				...data,
				categorias: [...data.categorias, newCategory],
			};
			// Guardo en local storage
			setData(newData);
			// Pongo en blanco el input
			setNuevaCategoria("");
			// Sumo uno al id para que el siguiente elemento se guarde con el id correlativo.
			setId(id + 1);
		}
	};

	const handleChangeAgregarCategorias = (e) => {
		setNuevaCategoria(e.target.value);
	};
	const handleClickEditCategory = () => {
		setShowModalEditCategory(!showModalEditCategory);
	};
	const handleCancelEdit = () => {
		setShowModalEditCategory(false);
	};
	return (
		<section>
			<div
				className={`contenedor-modal ${showModalEditCategory ? "oculto" : ""}`}
			>
				<h2 className="titulo-categorias">Categorías</h2>
				<form className="form-categorias">
					<label className="categorias-label">Nombre</label>
					<div className="ctn-form-categorias">
						<input
							type="text"
							className="input-categorias"
							placeholder="Agregar nueva categoría"
							//actualizo el nuevo estado con el valor ingresado
							value={nuevaCategoria}
							onChange={handleChangeAgregarCategorias}
						></input>
						<button
							className="btn-agregar"
							type="submit"
							onClick={handleClickAgregarCategoria}
						>
							Agregar
						</button>
					</div>
				</form>
				<ul className="lista-categorias-map">
					{data.categorias.map((categoria) => (
						<div key={categoria.id} className="ctn-categorias-lista">
							<li className="lista-categorias">{categoria.nombre}</li>
							<div>
								<button
									className="btn-categoria"
									onClick={handleClickEditCategory}
								>
									Editar
								</button>
								<button
									// Aca pongo el id para despues poder encontrar la categoria y eliminarla.
									data-categoria={categoria.id}
									className="btn-categoria"
									onClick={handleClickEliminarCategoria}
								>
									Eliminar
								</button>
							</div>
						</div>
					))}
				</ul>
			</div>
			{showModalEditCategory && (
				<ModalEditCategory handleCancelEdit={handleCancelEdit} />
			)}
		</section>
	);
};

export default Categorias;
