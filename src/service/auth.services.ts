import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import "dotenv/config";
import userRepositories from "../repositories/user.repositories";

function generationJWT(id: number) {
  return jwt.sign({ id }, process.env.SECRET_JWT as string, {
    expiresIn: "1d",
  });
}

async function loginService(email: string, password: string):Promise<string> {
  const user = await userRepositories.findUserByEmailRepository(email);
  if (!user) throw new Error("Invalid user");

  const isValidPass = await bcrypt.compare(password, user.password)
  if(!isValidPass) throw new Error("Invalid user");

  const token = generationJWT(user.id)

  return token
}

export { generationJWT, loginService};
