import { ConflictException } from "../common/execptions/domain.execptions.js";
import { encrypt } from "../common/security/encrypt.js";
import { hashOperation } from "../common/security/hash.js";
import type { IHUser } from "../DB/Models/User.model.js";
import UserRepo from "../DB/Repo/user.repo.js";
import type { SignupDTO, LoginDTO } from "./auth.dto.js";

class AuthService {
  private _userRepo = new UserRepo();
  constructor() {}
  public async signup(bodyData: SignupDTO): Promise<IHUser> {
    const { email } = bodyData;
    const isEmail = await this._userRepo.findOne({ filter: { email } });

    if (isEmail) {
      throw new ConflictException("Email already exists");
    }

    bodyData.password = await hashOperation({ plainText: bodyData.password });

    if (bodyData.phone) {
      const phoneEncrypted = encrypt({ value: bodyData.phone });
      bodyData.phone = phoneEncrypted;
    }

    const [user] = await this._userRepo.create({ data: [bodyData] });

    return user!;
  }

  public login(body: LoginDTO): LoginDTO {
    return body;
  }
}

export default new AuthService();
