import { GetTable } from "../../../fragments/table/table";
export function CreatedDocument(props) {
	return <GetTable>{props.children}</GetTable>;
}
