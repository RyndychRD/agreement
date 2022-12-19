import { ADiv,ASpin } from '../../adapter'
import React from 'react'
import './style.css'
export const SimpleSpinner = () => {
	return (
		<ADiv className="spinner-div">
			<ASpin/>
		</ADiv>
	)
}
