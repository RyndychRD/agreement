import { Grid } from 'react-loader-spinner'
import { ADiv } from '../../adapter'
import React from 'react'
import './style.css'
export const GridSpinner = () => {
	return (
		<ADiv className="spinner-div">
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
	)
}
