const nodemailer = require("nodemailer");
const certPathException = require("path").join(__dirname, "../../SSL/cert.crt");
const certificateForMailException =
  require("fs").readFileSync(certPathException);

/**
 * Сервис работы с почтой
 */
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      tls: {
        rejectUnauthorized: false,
        ca: [certificateForMailException],
      },
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  /**
   * Отправка почты
   * @param {*} to Кому отправляем
   * @param {*} link ссылка на активацию аккаунта
   */
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Активация аккаунта на " + process.env.API_URL,
      text: "",
      html: `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `,
    });
  }
  /**
   * Отправка почты
   * @param {*} to Кому отправляем
   * @param {*} text Текст сообщения
   * @param {*} title Заголовок сообщения
   */
  async sendMail(to, title, text) {
    if (process.env.SMTP_IS_ENABLED) {
      console.log("Отправлен email");
      console.log(to);
      console.log(title);
      console.log(text);
      this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: title,
        text: text,
      });
    } else {
      console.log("Отправка email запрещена");
    }
  }
}

module.exports = new MailService();
