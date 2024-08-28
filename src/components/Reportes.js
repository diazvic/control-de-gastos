import { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import "../styles/_Reportes.scss";
const Reportes = () => {
	const { data } = useContext(DataContext);
	const [categoriaMayorGanancia, setCategoriaMayorGanancia] = useState(null);
	const [categoriaMayorGasto, setCategoriaMayorGasto] = useState(null);

	useEffect(() => {
		if (data && data.operaciones && data.categorias) {
			const resumenPorCategoria = data.categorias.map((categoria) => {
				const operacionesCategoria = data.operaciones.filter(
					(op) => op.categoria === categoria.nombre
				);

				const gananciaTotal = operacionesCategoria
					.filter(
						(op) => op.categoria === categoria.nombre && op.tipo === "Ganancia"
					)
					.reduce((total, op) => total + Number(op.monto), 0);

				// filtrar por gasto
				const gastoTotal = operacionesCategoria
					.filter(
						(op) => op.categoria === categoria.nombre && op.tipo === "Gasto"
					)
					.reduce((total, op) => total + Number(op.monto), 0);
				return { ...categoria, gananciaTotal, gastoTotal };
			});

			const catMayorGanancia = resumenPorCategoria.reduce(
				(max, cat) => (cat.gananciaTotal > max.gananciaTotal ? cat : max),
				{ gananciaTotal: -Infinity }
			);

			const catMayorGasto = resumenPorCategoria.reduce(
				(max, cat) => (cat.gastoTotal > max.gastoTotal ? cat : max),
				{ gastoTotal: -Infinity }
			);

			setCategoriaMayorGanancia(catMayorGanancia);
			setCategoriaMayorGasto(catMayorGasto);
			console.log("Categoría con mayor ganancia:", catMayorGanancia);
			console.log(catMayorGanancia);
		}
		console.log("Operaciones:", data.operaciones);
		console.log("Categorías:", data.categorias);
	}, [data]);

	return (
		<section>
			<div className="contenedor-operacion-balance">
				<h2 className="reportes-title">Reportes</h2>
				<div className="box-resume">
					<h4 className="title-resume">Resumen</h4>
					<div className="flex-reportes">
						Categoría con mayor ganancia
						<div className="lista-categorias">
							{categoriaMayorGanancia
								? categoriaMayorGanancia.nombre
								: "Calculando"}
						</div>
						<div>
							{categoriaMayorGanancia
								? `$${categoriaMayorGanancia.gananciaTotal.toFixed(2)}`
								: "Calculando..."}
						</div>
					</div>
					<div className="flex-reportes">
						Categoría con mayor gasto
						<div className="lista-categorias">
							{categoriaMayorGasto ? categoriaMayorGasto.nombre : "Calculando"}
						</div>
						<div>
							{categoriaMayorGasto
								? `$${categoriaMayorGasto.gastoTotal.toFixed(2)}`
								: "Calculando..."}
						</div>
					</div>
					<div>Categoría con mayor balance</div>
					<div>Mes con mayor ganancia</div>
					<div>Mes con mayor gasto</div>
				</div>
			</div>
		</section>
	);
};

export default Reportes;
