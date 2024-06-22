const fs = require("fs");
const path = require("path");
const appConfig = require("../appConfig");

class ImagingService {
  constructor() {
    this.imageStoragePath = path.join(__dirname, appConfig.STORAGE_DIR);
    if (!fs.existsSync(this.imageStoragePath)) {
      fs.mkdirSync(this.imageStoragePath);
    }
  }

  async saveImage(file) {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(this.imageStoragePath, fileName);
    await fs.promises.writeFile(filePath, file.data);
    return fileName;
  }
}

module.exports = ImagingService;
