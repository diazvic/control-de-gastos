import { useLocalStorage } from "@uidotdev/usehooks";
// Hook en https://usehooks.com/uselocalstorage
import "../styles/_ModalOperacion.scss";
import "../styles/_Categorias.scss";
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
	console.log(` data recien cargado desde LS: ${data}`);
	console.log(data);
	return (
		<section>
			<div className="contenedor-modal">
				<h2 className="titulo-categorias">Categorías</h2>
				<form className="form-categorias">
					<label className="categorias-label">Nombre</label>
					<div className="ctn-form-categorias">
						<input type="text" className="input-categorias"></input>
						<button className="btn-agregar">Agregar</button>
					</div>
				</form>
				<ul className="lista-categorias-map">
					{data.categorias.map((categoria) => (
						<div key={categoria.id} className="ctn-categorias-lista">
							<li className="lista-categorias">{categoria.nombre}</li>
							<div>
								<button className="btn-categoria">Editar</button>
								<button className="btn-categoria">Eliminar</button>
							</div>
						</div>
					))}
				</ul>
			</div>
		</section>
	);
};

export default Categorias;
