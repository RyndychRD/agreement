import {
	Form,
	Input,
	Button,
	Row,
	Col,
	Layout,
	Menu,
	Tooltip,
	Table,
	Alert,
} from "antd";
import {
	EyeInvisibleOutlined,
	EyeTwoTone,
	CrownOutlined,
	ArrowLeftOutlined,
	DesktopOutlined,
} from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-layout";

export const AForm = (props) => {
	return <Form {...props}>{props.children}</Form>;
};
export const ATable = (props) => {
	return <Table {...props}>{props.children}</Table>;
};
export const APageHeader = (props) => {
	return <PageHeader {...props}>{props.children}</PageHeader>;
};
export const ATooltip = (props) => {
	return <Tooltip {...props}>{props.children}</Tooltip>;
};

export const AMenu = (props) => {
	return <Menu {...props}>{props.children}</Menu>;
};

export const ALayout = (props) => {
	return <Layout {...props}>{props.children}</Layout>;
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

export const ACrownOutlined = (props) => {
	return <CrownOutlined {...props}>{props.children}</CrownOutlined>;
};

export const AArrowLeftOutlined = (props) => {
	return <ArrowLeftOutlined {...props}>{props.children}</ArrowLeftOutlined>;
};

export const ADesktopOutlined = (props) => {
	return <DesktopOutlined {...props}>{props.children}</DesktopOutlined>;
};

//Работает но есть ошибки в консоли
// export const ANotification = (props) => {
// 	const [api, contextHolder] = notification.useNotification();
// 	const openNotification = () => {
// 		api.open({
// 			message: props.message,
// 			description:props.description,
// 			duration: 3,
// 		});
// 	};
// 	if(props?.show===true)
// 		openNotification()
// 	return <>{contextHolder}</>;
// };

export const AAlert = (props) => {
	return <Alert {...props}>{props.children}</Alert>;
};
