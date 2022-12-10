const nodemailer = require("nodemailer");
const certPathException = require("path").join(__dirname, "../../SSL/cert.crt");
const certificateForMailException = require("fs").readFileSync(certPathException);

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
}

module.exports = new MailService();