const PositionService = require("../../service/catalogServices/position-service")

class PositionController {
   async getAllPositions(req, res, next) {
      try {
         const data = await PositionService.getAllPositions()
         return res.json(data)
      } catch (e) {
         next(e)
      }
   }
   //    async createNewDepartment(req, res, next) {
   //       try {
   //          const departmentData = await DepartmentService.createNewDepartment(
   //             req.body
   //          )
   //          return res.json(departmentData)
   //       } catch (e) {
   //          next(e)
   //       }
   //    }
   //    async updateDepartment(req, res, next) {
   //       try {
   //          const departmentData = await DepartmentService.updateDepartment(
   //             req.body
   //          )
   //          return res.json(departmentData)
   //       } catch (e) {
   //          next(e)
   //       }
   //    }
   //    async deleteDepartment(req, res, next) {
   //       try {
   //          const departmentData = await DepartmentService.deleteDepartment(
   //             req.body
   //          )
   //          return res.json(departmentData)
   //       } catch (e) {
   //          next(e)
   //       }
   //    }
}

module.exports = new PositionController()
