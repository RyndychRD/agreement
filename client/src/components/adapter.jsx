/**
 * eslint-disable react/destructuring-assignment
 *
 * @format
 */

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
	Modal,
	Spin,
} from 'antd'
import {
	EyeInvisibleOutlined,
	EyeTwoTone,
	CrownOutlined,
	ArrowLeftOutlined,
	DesktopOutlined,
} from '@ant-design/icons'
import { PageHeader } from '@ant-design/pro-layout'

export function AForm(props) {
	return <Form {...props}>{props.children}</Form>
}
export function ASpin(props) {
	return <Spin {...props}>{props.children}</Spin>
}
export function ATable(props) {
	return <Table {...props}>{props.children}</Table>
}
export function AModal(props) {
	return <Modal {...props}>{props.children}</Modal>
}
export function APageHeader(props) {
	return <PageHeader {...props}>{props.children}</PageHeader>
}
export function ATooltip(props) {
	return <Tooltip {...props}>{props.children}</Tooltip>
}

export function AMenu(props) {
	return <Menu {...props}>{props.children}</Menu>
}

export function ALayout(props) {
	return <Layout {...props}>{props.children}</Layout>
}
// Просто вывод текста
export function ASpan(props) {
	return <span {...props}>{props.children}</span>
}
// Просто вывод текста
export function ADiv(props) {
	return <div {...props}>{props.children}</div>
}
export function AFormItem(props) {
	return <Form.Item {...props}>{props.children}</Form.Item>
}

export function ARow(props) {
	return <Row {...props}>{props.children}</Row>
}

export function ACol(props) {
	return <Col {...props}>{props.children}</Col>
}

export function AInput(props) {
	return <Input {...props}>{props.children}</Input>
}

export function AInputPassword(props) {
	return <Input.Password {...props}>{props.children}</Input.Password>
}

export function AButton(props) {
	return <Button {...props}>{props.children}</Button>
}

export function AEyeInvisibleOutlined(props) {
	return (
		<EyeInvisibleOutlined {...props}>{props.children}</EyeInvisibleOutlined>
	)
}

export function AEyeTwoTone(props) {
	return <EyeTwoTone {...props}>{props.children}</EyeTwoTone>
}

export function ACrownOutlined(props) {
	return <CrownOutlined {...props}>{props.children}</CrownOutlined>
}

export function AArrowLeftOutlined(props) {
	return <ArrowLeftOutlined {...props}>{props.children}</ArrowLeftOutlined>
}

export function ADesktopOutlined(props) {
	return <DesktopOutlined {...props}>{props.children}</DesktopOutlined>
}

// Работает но есть ошибки в консоли
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

export function AAlert(props) {
	return <Alert {...props}>{props.children}</Alert>
}
