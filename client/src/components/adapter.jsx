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
} from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  CrownOutlined,
  ArrowLeftOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-layout";

export function AForm(props) {
  const { children } = props;
  return <Form {...props}>{children}</Form>;
}

export function AUseForm() {
  return Form.useForm();
}
export function ASpin(props) {
  const { children } = props;
  return <Spin {...props}>{children}</Spin>;
}
export function ATable(props) {
  const { children } = props;
  return <Table {...props}>{children}</Table>;
}
export function AModal(props) {
  const { children } = props;
  return <Modal {...props}>{children}</Modal>;
}
export function APageHeader(props) {
  const { children } = props;
  return <PageHeader {...props}>{children}</PageHeader>;
}
export function ATooltip(props) {
  const { children } = props;
  return <Tooltip {...props}>{children}</Tooltip>;
}

export function AMenu(props) {
  const { children } = props;
  return <Menu {...props}>{children}</Menu>;
}

export function ALayout(props) {
  const { children } = props;
  return <Layout {...props}>{children}</Layout>;
}
// Просто вывод текста
export function ASpan(props) {
  const { children } = props;
  return <span {...props}>{children}</span>;
}
// Просто вывод текста
export function ADiv(props) {
  const { children } = props;
  return <div {...props}>{children}</div>;
}
export function AFormItem(props) {
  const { children } = props;
  return <Form.Item {...props}>{children}</Form.Item>;
}

export function ARow(props) {
  const { children } = props;
  return <Row {...props}>{children}</Row>;
}

export function ACol(props) {
  const { children } = props;
  return <Col {...props}>{children}</Col>;
}

export function AInput(props) {
  const { children } = props;
  return <Input {...props}>{children}</Input>;
}

export function AInputPassword(props) {
  const { children } = props;
  return <Input.Password {...props}>{children}</Input.Password>;
}

export function AButton(props) {
  const { children } = props;
  return <Button {...props}>{children}</Button>;
}

export function AEyeInvisibleOutlined(props) {
  const { children } = props;
  return <EyeInvisibleOutlined {...props}>{children}</EyeInvisibleOutlined>;
}

export function AEyeTwoTone(props) {
  const { children } = props;
  return <EyeTwoTone {...props}>{children}</EyeTwoTone>;
}

export function ACrownOutlined(props) {
  const { children } = props;
  return <CrownOutlined {...props}>{children}</CrownOutlined>;
}

export function AArrowLeftOutlined(props) {
  const { children } = props;
  return <ArrowLeftOutlined {...props}>{children}</ArrowLeftOutlined>;
}

export function ADesktopOutlined(props) {
  const { children } = props;
  return <DesktopOutlined {...props}>{children}</DesktopOutlined>;
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
  const { children } = props;
  return <Alert {...props}>{children}</Alert>;
}
