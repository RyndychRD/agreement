const FaqService = require("../../service/catalogServices/faq-service");

class FAQController {
  async getFAQs(req, res, next) {
    try {
      const data = await FaqService.getAllFAQs();
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new FAQController();
