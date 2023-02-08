const DocumentValuesModels = require("../../models/document/document-values-models");
const DevTools = require("../DevTools");
const PositionModel = require("../../models/catalogModels/position-models");
const DepartmentModel = require("../../models/catalogModels/department-models");
const UserModel = require("../../models/catalogModels/user-models");

class DocumentValuesService {
  async getValues({ query, filterIn }) {
    const func = DocumentValuesModels.find({
      filter: filterIn
        ? filterIn
        : {
            document_id: query.documentId,
          },
    });
    const documentValues = await DevTools.addDelay(func);
    if (query?.isGetConnectedTables === "true") {
      return await Promise.all(
        documentValues.map(async (documentValue) => {
          const result = { ...documentValue };
          if (documentValue.data_type === "table") {
            switch (documentValue.select_value.table) {
              case "position":
                result.value = await PositionModel.findOne({
                  filter: { id: result.value },
                });
                break;
              case "users":
                result.value = await UserModel.findOne({
                  filter: { id: result.value },
                });
                break;
              case "departments":
                result.value = await DepartmentModel.findOne({
                  filter: { id: result.value },
                });
                break;
              default:
                break;
            }
          }
          return result;
        })
      );
    }
    return documentValues;
  }
}

module.exports = new DocumentValuesService();
