const DocumentService = require("../../service/document/document-service");

class DocumentController {
  async getDocuments(req, res, next) {
    try {
      const data = req?.query?.id
        ? await DocumentService.getOneDocument(req?.query)
        : await DocumentService.getAllDocuments({
            query: req?.query,
            userId: req.user.id,
          });

      const ip = req.socket.remoteAddress.replace(/^.*:/, "");
      const { spawn } = require("child_process");

      const scriptPath =
        "G:/projects/agreementV2/srv/powershell/getHostNameByIp.ps1";
      const ipAddress = ip;

      const powershell = spawn("powershell.exe", [scriptPath, ipAddress]);

      powershell.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
      });

      powershell.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
      });

      powershell.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
      });
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async getDocumentArchives(req, res, next) {
    try {
      const data = await DocumentService.getAllDocumentArchives({
        query: req?.query,
      });
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async createNewDocument(req, res, next) {
    try {
      const data = await DocumentService.createNewDocument(
        req.body,
        req.user.id
      );
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async updateDocument(req, res, next) {
    try {
      const data = await DocumentService.updateDocument(req.query, req.body);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async updateDocumentMitvorgAndChangeStatus(req, res, next) {
    try {
      const data = await DocumentService.updateDocumentMitvorgAndChangeStatus(
        req.body
      );
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async setArchiveType(req, res, next) {
    try {
      const data = await DocumentService.setArchiveType(req.body);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async deleteDocument(req, res, next) {
    try {
      const data = await DocumentService.deleteDocument(req.query);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new DocumentController();
