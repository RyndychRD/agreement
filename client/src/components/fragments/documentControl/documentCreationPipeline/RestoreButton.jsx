import { Button } from "antd";

export default function RestoreButton(props) {
  const { isShow, onClick } = props;
  if (!isShow) return null;
  return <Button onClick={onClick}>Вернуть к первоначальным настройкам</Button>;
}
