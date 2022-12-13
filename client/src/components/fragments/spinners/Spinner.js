import { Grid } from "react-loader-spinner";
import { ADiv } from "../../adapter";
export const GridSpinner = () => {
	return (
		<ADiv
			style={{
				width: "100%",
				height: "100%",
				alignContent: "center",
				justifyContent: "center",
				display: "flex",
				alignItems: "center",
			}}
		>
			<Grid
				height="80"
				width="80"
				color="#4fa94d"
				ariaLabel="grid-loading"
				radius="12.5"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
			/>
		</ADiv>
	);
};
