const nodemailer = require("nodemailer");
const certPathException = require("path").join(process.cwd(), "./SSL/cert.crt");
const certPath = require("path").join(process.cwd(), "./SSL/EXCHANGE.cer");

//Флаг, который отслеживает переключение на запасной транпортер только один раз
let isExceptionAlerted = false;

/**
 * Сервис работы с почтой
 */
class MailService {
  constructor(isException = false) {
    if (isException) {
      this.constructExceptionTransport();
    } else {
      this.constructTransport();
    }
  }

  constructTransport() {
    const certificateForMail = require("fs").readFileSync(certPath);
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secureConnection: true,
      tls: {
        rejectUnauthorized: false,
        maxVersion: "TLSv1.3",
        minVersion: "TLSv1",
        ca: [certificateForMail],
      },
    });
    this.sender = process.env.SMTP_USER;
    isExceptionAlerted = false;
  }

  constructExceptionTransport() {
    const certificateForMailException =
      require("fs").readFileSync(certPathException);
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST_EXCEPTION,
      port: process.env.SMTP_PORT_EXCEPTION,
      secure: true,
      tls: {
        rejectUnauthorized: false,
        ca: [certificateForMailException],
      },
      auth: {
        user: process.env.SMTP_USER_EXCEPTION,
        pass: process.env.SMTP_PASSWORD_EXCEPTION,
      },
    });

    this.sender = process.env.SMTP_USER_EXCEPTION;
    isExceptionAlerted = true;
  }

  /**
   * Отправка ссылки на активацию
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
    if (process.env.SMTP_IS_ENABLED !== "0") {
      console.log(
        `Отправлен email ${isExceptionAlerted ? "по запасному" : ""}`
      );
      console.log("Email: ", to);
      console.log("Заголовок:", title);
      console.log("Текст:", text);
      this.transporter.sendMail(
        {
          from: this.sender,
          to,
          subject: title,
          text: text,
        },
        function (err, info) {
          if (err) {
            //Если первый вызов по стандартному транспорту
            if (!isExceptionAlerted) {
              console.error("Ошибка при отправке email по стандартному:", err);
              let mail = new MailService(true);
              mail.sendMail(to, title, text);
            }
            //Если второй вызов по запасному транспорту
            else {
              console.error(
                "Ошибка при отправке email по запасному, письмо не будет доставлено:",
                err
              );
            }
            isExceptionAlerted = true;
          } else {
            console.log("Письмо доставлено на smtp");
            isExceptionAlerted = false;
          }
        }
      );
    } else {
      console.log("Отправка email запрещена");
    }
  }
}

module.exports = new MailService();
