import { Button, Form, Space, Card } from "antd";
import { useCallback } from "react";
import { useCustomDispatch } from "../FormBuilderProvider";
import ButtonAddComponentOnForm from "./FBButtonAddComponentOnForm";
import InputElementForm from "./FBInputElementForm";
import SelectElementForm from "./FBSelectElementsForm";
import ButtonOnCarts from "./FBButtonOnCartsForm";
import { documentElementIODictionary } from "../FormBuilderInstanceForm";

export default function CustomInput({form}) {
	
	const dispatch = useCustomDispatch();
	const onFinish = useCallback(
		(value) => {
			if (value) {
				dispatch({ type: "SaveFormButton", FormBuilderData: value });
				console.log("onFinish => useCallback => value", value);
			}
		},
		[dispatch]
	);

	return (
		<Form
			form={form}
			name="dynamic_form_nest_item"
			onFinish={(value) => onFinish(value)}
			autoComplete="off"
		>
			<Button
				type="primary"
				htmlType="submit"
				onClick={() => {
					const TestValue = documentElementIODictionary.map((i) => ({
						AreaName: i.name,
						AreaType: i.key,
					}));

					dispatch({
						type: "SaveFormButton",
						FormBuilderData: { FormBuilder: TestValue },
					});
				}}
			>
				Тест (вывод всех типов форм)
			</Button>
			<Form.List name="FormBuilder">
				{(fields, { add, remove, move }) => (
					<>
						<ButtonAddComponentOnForm add={add} />
						{fields.length !== 0 && (
							<span>Всего элементов на форме №{fields.length}</span>
						)}
						{fields.map(({ key, name, ...restField }) => (
							<Space key={key} className="background-Cart" align="baseline">
								<Card
									size="small"
									title={`Порядок в списке №${name} ${JSON.stringify(
										restField
									)}`}
									extra={ButtonOnCarts(remove, move, name, fields, key)}
								>
									<InputElementForm restField={restField} name={name} />
									<SelectElementForm restField={restField} name={name} />
								</Card>
							</Space>
						))}
					</>
				)}
			</Form.List>
			<Form.Item>
				<Button type="primary" htmlType="submit">
					Сохранить форму
				</Button>
			</Form.Item>
		</Form>
	);
}
