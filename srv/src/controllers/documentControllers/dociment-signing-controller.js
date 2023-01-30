const signingService = require("../../service/document/document-signing-service");

class SigningController {
  async getDocumentRoute(req, res, next) {
    try {
      const data = await signingService.getOneDocumentRoute(req?.query);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async signCurrentDocumentStep(req, res, next) {
    try {
      const data = await signingService.signCurrentDocumentStep({
        body: req.body,
        userId: req.user.id,
      });
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new SigningController();
