import { ARow, ACol, ASpan, ADiv, AButton } from "../../adapter";

export function getColumn(title, dataIndex, sorter, defaultSortOrder) {
	return {
		title,
		dataIndex,
		// sorter,
		// defaultSortOrder
	};
}

export function getTitle(name, buttons) {
	const buttonsDict = {
		create: (
			<AButton type="primary" className="space-right">
				Создать
			</AButton>
		),
		delete: (
			<AButton danger className="space-right">
				Удалить
			</AButton>
		),
		update: (
			<AButton type="primary" className="space-right ">
				Просмотр
			</AButton>
		),
	};

	return (
		<ARow>
			<ACol flex="auto">
				<ADiv className="center-text">
					<ASpan className="table-header">{name}</ASpan>
				</ADiv>
			</ACol>
			<ACol>
				{buttons.map((el) => {
					return buttonsDict[el];
				})}
			</ACol>
		</ARow>
	);
}
