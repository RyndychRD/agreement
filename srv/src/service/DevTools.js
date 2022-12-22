class DevTools {
  async addDelay(func) {
    let result;
    if (process.env.IS_ADD_DELAY !== "0") {
      result = new Promise((resolve) => {
        setTimeout(() => {
          resolve(func);
        }, 3000);
      });
    } else {
      result = await func;
    }
    return result;
  }
}

module.exports = new DevTools();
