import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import "../styles/_Balance.scss";
const Balance = () => {
	return (
		<div className="row-balance">
			<div>
				<Box
					sx={{
						display: "flex",
						flexWrap: "wrap",
						"& > :not(style)": {
							m: 1,
							width: 300,
							height: 300,
						},
					}}
				>
					<Paper
						elevation={3}
						sx={{
							p: 2,
						}}
					>
						<Typography variant="h4">Balance</Typography>
						<CardContent>
							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
									p: 1,
								}}
							>
								<Typography variant="h6">Gastos</Typography>
								<Typography variant="h6" color="error">
									-$0
								</Typography>
							</Box>
							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
									p: 1,
								}}
							>
								<Typography variant="h6">Ganancias</Typography>
								<Typography variant="h6" color="success">
									$0
								</Typography>
							</Box>
							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
									p: 1,
								}}
							>
								<Typography variant="h6">Total</Typography>
								<Typography variant="h6">$0</Typography>
							</Box>
						</CardContent>
					</Paper>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexWrap: "wrap",
						"& > :not(style)": {
							m: 1,
							width: 300,
							height: 500,
						},
					}}
				>
					<Paper elevation={3} />
				</Box>
			</div>
			<div>
				<Box
					sx={{
						display: "flex",
						flexWrap: "wrap",
						"& > :not(style)": {
							m: 1,
							width: 900,
							height: 815,
						},
					}}
				>
					<Paper elevation={3} />
				</Box>
			</div>
		</div>
	);
};

export default Balance;
