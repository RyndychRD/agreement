const signingService = require("../../service/documentSigning/signing-service");

class SigningController {
  async getDocumentRoute(req, res, next) {
    try {
      const data = await signingService.getOneDocumentRoute(req?.query);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new SigningController();
