import _ from "lodash";

export default function getUniqNotNullIds(array) {
  return _.uniq(_.reject(array, ["id", null])?.map((el) => el.id));
}
