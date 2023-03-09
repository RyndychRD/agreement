import { NavLink } from "react-router-dom";

export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const dict = {
  document_archive: getItem(
    <NavLink to="/archive/document-archive">Архив документов</NavLink>,
    "/archive/document-archive"
  ),
};

function getLink(LinkKey) {
  return dict[LinkKey] ? dict[LinkKey] : null;
}

export default getLink;
