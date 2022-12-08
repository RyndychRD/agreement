import { Form, Input, Button, Row, Col } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

export const AForm = (props) => {
	return <Form {...props}>{props.children}</Form>;
};
//Просто вывод текста
export const ASpan = (props) => {
	return <span {...props}>{props.children}</span>;
};
export const AFormItem = (props) => {
	return <Form.Item {...props}>{props.children}</Form.Item>;
};

export const ARow = (props) => {
	return <Row {...props}>{props.children}</Row>;
};

export const ACol = (props) => {
	return <Col {...props}>{props.children}</Col>;
};

export const AInput = (props) => {
	return <Input {...props}>{props.children}</Input>;
};

export const AInputPassword = (props) => {
	return <Input.Password {...props}>{props.children}</Input.Password>;
};

export const AButton = (props) => {
	return <Button {...props}>{props.children}</Button>;
};

export const AEyeInvisibleOutlined = (props) => {
	return (
		<EyeInvisibleOutlined {...props}>{props.children}</EyeInvisibleOutlined>
	);
};

export const AEyeTwoTone = (props) => {
	return <EyeTwoTone {...props}>{props.children}</EyeTwoTone>;
};
