const FaqModel = require("../../models/catalogModels/faq-model");
const DevTools = require("../DevTools");

class FAQService {
  async getAllFAQs() {
    const func = FaqModel.find({});
    return await DevTools.addDelay(func);
  }
}

module.exports = new FAQService();
