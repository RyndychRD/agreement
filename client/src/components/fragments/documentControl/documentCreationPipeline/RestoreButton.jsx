import { Button } from "antd";

/**
 * Просто форма вывода кнопки для возвращения к первоначальным значениям. Как будто мы только что открыли окно и не вводили никаких значений
 * @param {*} props.isShow Показывать ли кнопку
 * @param {*} props.onClick Функция, которая выполняется при клике на кнопку
 * @returns
 */
export default function RestoreButton(props) {
  const { isShow, onClick } = props;
  if (!isShow) return null;
  return <Button onClick={onClick}>Вернуть к первоначальным настройкам</Button>;
}
