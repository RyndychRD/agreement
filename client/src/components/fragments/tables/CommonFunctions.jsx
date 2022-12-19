/** @format */

import { ARow, ACol, ASpan, ADiv, AButton } from '../../adapter'

export function getColumn(
	title,
	dataIndex
	// sorter, defaultSortOrder
) {
	return {
		title,
		dataIndex,
		// sorter,
		// defaultSortOrder
	}
}

export function getTitle(name, buttons) {
	const buttonsDict = {
		create: (
			<AButton
				key='keyCreateAdminTableSettings'
				type='primary'
				onClick={buttons.create}
				className='space-right'
			>
				Создать
			</AButton>
		),
		delete: (
			<AButton
				key='keyDeleteAdminTableSettings'
				danger
				onClick={buttons.delete}
				className='space-right'
			>
				Удалить
			</AButton>
		),
		update: (
			<AButton
				key='keyUpdateAdminTableSettings'
				type='primary'
				onClick={buttons.update}
				className='space-right '
			>
				Просмотр
			</AButton>
		),
	}

	const buttonsView = []
	Object.keys(buttons).forEach(
		(
			key
			// index
		) => {
			buttonsView.push(buttonsDict[key])
		}
	)

	return (
		<ARow>
			<ACol flex='auto'>
				<ADiv className='center-text'>
					<ASpan className='table-header'>{name}</ASpan>
				</ADiv>
			</ACol>
			<ACol>{buttonsView}</ACol>
		</ARow>
	)
}
