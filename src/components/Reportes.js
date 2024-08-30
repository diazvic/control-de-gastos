import { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import "../styles/_Reportes.scss";
const Reportes = () => {
	const { data } = useContext(DataContext);
	const [categoriaMayorGanancia, setCategoriaMayorGanancia] = useState(null);
	const [categoriaMayorGasto, setCategoriaMayorGasto] = useState(null);
	const [categoriaBalance, setCategoriaBalance] = useState(null);
	const [mesMayorGanancia, setMesMayorGanancia] = useState(null);
	const [mesMenorGanancia, setMesMenorGanancia] = useState(null);
	const [totalesPorCategorias, setTotalesPorCategorias] = useState([]);
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

				//balance
				const balance = gananciaTotal - gastoTotal;

				return {
					...categoria,
					gananciaTotal,
					gastoTotal,
					balance,
				};
			});

			const catMayorGanancia = resumenPorCategoria.reduce(
				(max, cat) => (cat.gananciaTotal > max.gananciaTotal ? cat : max),
				{ gananciaTotal: -Infinity }
			);

			const catMayorGasto = resumenPorCategoria.reduce(
				(max, cat) => (cat.gastoTotal > max.gastoTotal ? cat : max),
				{ gastoTotal: -Infinity }
			);

			const catMayorBalance = resumenPorCategoria.reduce(
				(max, cat) => (cat.balance > max.balance ? cat : max),
				{ balance: -Infinity }
			);

			const operacionesPorMes = data.operaciones.reduce((acc, op) => {
				const mes = op.fecha;
				if (!acc[mes]) acc[mes] = { ganancia: 0, gasto: 0 };
				// console.log(mes);

				if (op.tipo === "Ganancia") {
					acc[mes].ganancia += Number(op.monto);
				} else if (op.tipo === "Gasto") {
					acc[mes].gasto += Number(op.monto);
				}

				return acc;
			}, {});

			const catConMayorGananciaPorMes = Object.entries(
				operacionesPorMes
			).reduce(
				(max, [mes, datos]) =>
					datos.ganancia > max.ganancia
						? { mes, ganancia: datos.ganancia }
						: max,
				{ ganancia: -Infinity }
			);

			const catConMenorGananciaPorMes = Object.entries(
				operacionesPorMes
			).reduce(
				(max, [mes, datos]) =>
					datos.gasto > max.gasto ? { mes, gasto: datos.gasto } : max,
				{ gasto: -Infinity }
			);

			setCategoriaMayorGanancia(catMayorGanancia);
			setCategoriaMayorGasto(catMayorGasto);
			setCategoriaBalance(catMayorBalance);
			setMesMayorGanancia(catConMayorGananciaPorMes);
			setMesMenorGanancia(catConMenorGananciaPorMes);
			setTotalesPorCategorias(resumenPorCategoria);
			// 	console.log("Categoría con mayor ganancia:", catMayorGanancia);
			// 	console.log(catMayorGanancia);
			// 	console.log(
			// 		"mayor ganancia por mes de categorias:",
			// 		catConMayorGananciaPorMes
			// 	);
		}
	}, [data]);

	return (
		<section>
			<div className="contenedor-operacion-balance">
				<h2 className="reportes-title">Reportes</h2>
				<div className="box-resume">
					<h4 className="title-resume">Resumen</h4>
					<div className="flex-reportes">
						<span>Categoría con mayor ganancia</span>
						<div className="lista-categorias">
							{categoriaMayorGanancia
								? categoriaMayorGanancia.nombre
								: "Calculando"}
						</div>
						<div className={categoriaMayorGanancia ? "monto-ganancia" : ""}>
							{categoriaMayorGanancia
								? `$${categoriaMayorGanancia.gananciaTotal.toFixed(2)}`
								: "Calculando..."}
						</div>
					</div>
					<div className="flex-reportes">
						<span>Categoría con mayor gasto</span>
						<div className="lista-categorias">
							{categoriaMayorGasto ? categoriaMayorGasto.nombre : "Calculando"}
						</div>
						<div
							className={
								categoriaMayorGasto === "Ganancia"
									? "monto-ganancia"
									: "monto-gasto"
							}
						>
							{categoriaMayorGasto
								? `$${categoriaMayorGasto.gastoTotal.toFixed(2)}`
								: "Calculando..."}
						</div>
					</div>
					<div className="flex-reportes">
						<span>Categoría con mayor balance</span>
						<div className="lista-categorias">
							{categoriaBalance ? categoriaBalance.nombre : ""}
						</div>
						<div>
							{categoriaBalance
								? `$${categoriaBalance.balance.toFixed(2)}`
								: ""}
						</div>
					</div>
					<div className="flex-reportes">
						<span>Mes con mayor ganancia</span>
						<div>{mesMayorGanancia ? mesMayorGanancia.mes : ""}</div>
						<div className={mesMayorGanancia ? "monto-ganancia" : ""}>
							{mesMayorGanancia
								? `$${mesMayorGanancia.ganancia.toFixed(2)}`
								: ""}
						</div>
					</div>
					<div className="flex-reportes">
						<span>Mes con mayor gasto</span>
						<div>{mesMenorGanancia ? mesMenorGanancia.mes : ""}</div>
						<div
							className={
								mesMenorGanancia === "Ganancia"
									? "monto-ganancia"
									: "monto-gasto"
							}
						>
							{mesMenorGanancia ? `$${mesMenorGanancia.gasto.toFixed(2)}` : ""}
						</div>
					</div>
					<h4 className="title-resume">Totales por categorías</h4>
					<div className="flex-reportes">
						<div>
							<span>Categoria</span>
							{totalesPorCategorias.map((cat) => (
								<li key={cat.nombre}>{cat.nombre}</li>
							))}
						</div>
						<div>
							<span>Ganancias</span>
							{/* aca tiene q venir las ganancias de c/categoria */}
							{totalesPorCategorias.map((cat) => (
								<li key={cat.nombre}>${cat.gananciaTotal.toFixed(2)}</li>
							))}
						</div>
						<div>
							<span>Gastos</span>
							{totalesPorCategorias.map((cat) => (
								<li key={cat.nombre}>${cat.gastoTotal.toFixed(2)}</li>
							))}
						</div>
						<div>
							<span>Balance</span>
							{totalesPorCategorias.map((cat) => (
								<li key={cat.nombre}>${cat.balance.toFixed(2)}</li>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Reportes;
