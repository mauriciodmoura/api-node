import nodemailer, {Transporter} from "nodemailer"
import { SendEmailCommand } from "@aws-sdk/client-ses";
import { injectable } from "tsyringe";
import handlebars from "handlebars";
import fs from "fs";
import { IMailProvider } from "../IMailProvider";

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      ses: new SendEmailCommand({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION,
      })
    })    
  }
  
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");
    const templateParse = handlebars.compile(templateFileContent);
    const templateHTML = templateParse(variables);
    await this.client.sendMail({
      to,
      from: "Blockcode <contato@blockcode.com.br>",
      subject,
      html: templateHTML,
    });
  }
}

export { SESMailProvider };