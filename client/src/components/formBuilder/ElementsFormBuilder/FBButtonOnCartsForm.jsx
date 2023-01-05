import {
	DownSquareTwoTone,
	MinusCircleOutlined,
	UpSquareTwoTone,
} from "@ant-design/icons";
import color from "../FormBuilderColorRow";

export default function ButtonOnCarts(remove, move, name, fields, key) {
	return (
		<div className="flexibleCart">
			<button
				className="button-style"
				type="button"
				onClick={() => remove(name)}
			>
				Удалить <MinusCircleOutlined />
			</button>
			{name >= 1 && (
				<button
					className="button-style"
					type="button"
					onClick={() => remove(move(name, name - 1))}
				>
					Выше <UpSquareTwoTone />
				</button>
			)}
			{name < fields.length - 1 && (
				<button
					className="button-style"
					type="button"
					onClick={() => remove(move(name, name + 1))}
				>
					Ниже <DownSquareTwoTone />
				</button>
			)}
			<div
				className="square"
				style={{
					backgroundColor: `${color[key]}`,
					border: `5px ridge ${color[key]}`,
				}}
			/>
		</div>
	);
}
