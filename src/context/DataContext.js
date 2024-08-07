import { createContext, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
// Hook en https://usehooks.com/uselocalstorage
const DataContext = createContext();

const DataProvider = ({ children }) => {
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

	const handleClickEditarCategoria = (categoria, e, nuevaCatEditada) => {
		setNuevaCategoria(categoria);
		setShowModalEditCategory(!showModalEditCategory);
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

	return (
		<DataContext.Provider
			value={{
				data,
				setData,
				nuevaCategoria,
				setNuevaCategoria,
				id,
				setId,
				showModalEditCategory,
				setShowModalEditCategory,
				handleClickEliminarCategoria,
				handleClickEditarCategoria,
				handleClickAgregarCategoria,
				handleChangeAgregarCategorias,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};
export { DataProvider, DataContext };
