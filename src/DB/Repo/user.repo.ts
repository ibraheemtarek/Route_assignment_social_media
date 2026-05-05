import type { ObjectId } from "mongoose";
import type { IUser } from "../Models/User.model.js";
import UserModel from "../Models/User.model.js";
import DBRepo from "./db.repo.js";

class UserRepo extends DBRepo<IUser> {
  constructor() {
    super(UserModel);
  }
  async checkUserExists(id: ObjectId): Promise<boolean> {
    return (await this.findOne({ filter: { _id: id } })) != null;
  }
}

export default UserRepo;
