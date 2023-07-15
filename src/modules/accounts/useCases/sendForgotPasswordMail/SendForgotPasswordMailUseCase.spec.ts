import { jest } from "@jest/globals";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/MailProviderInMemory";
import { AppError } from "../../../../errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "121212",
      email: "hugo@com.co",
      name: "Hugo Boss",
      password: "1111",
    });

    await sendForgotPasswordMailUseCase.execute("hugo@com.co");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("hugo@com.co")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

    usersRepositoryInMemory.create({
      driver_license: "212121",
      email: "boss@com.co",
      name: "Boss Hugo",
      password: "2222",
    });

    await sendForgotPasswordMailUseCase.execute("abome@regrog.ee");

    expect(generateTokenMail).toBeCalled();
  });
});