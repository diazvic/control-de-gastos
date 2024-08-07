import { useLocalStorage } from "@uidotdev/usehooks";
import { useContext, useState } from "react";
import "../styles/_ModalOperacion.scss";
import "../styles/_Categorias.scss";
import ModalEditCategory from "./ModalEditCategory";
import { DataContext } from "../context/DataContext";
const Categorias = () => {
	const {
		data,
		nuevaCategoria,
		setNuevaCategoria,
		id,
		showModalEditCategory,
		setShowModalEditCategory,
		handleClickEliminarCategoria,
		handleClickEditarCategoria,
		handleClickAgregarCategoria,
		handleChangeAgregarCategorias,
	} = useContext(DataContext);

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
									// data-categoria={categoria.id}
									className="btn-categoria"
									//Le paso como parametro categoria
									onClick={() => handleClickEditarCategoria(categoria)}
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
			{showModalEditCategory && <ModalEditCategory />}
		</section>
	);
};

export default Categorias;
