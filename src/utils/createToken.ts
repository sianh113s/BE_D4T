// createToken.ts

import jwt from "jsonwebtoken";
import { ForbiddenError } from "../responses/error.response";
const { sign, verify } = jwt;

const createTokenPair = async (payload: any) => {
  try {
    const key: any = process.env.JWT_KEY;

    const accessToken = sign(payload, key, {
      expiresIn: "1 days",
    });

    const refreshToken = sign(payload, key, {
      expiresIn: "15 days",
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("ERROR: Token creation failed! :: ", error);
    throw error;
  }
};

const verifyJWT = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const keySecret: string | undefined = process.env.JWT_KEY;

    if (!keySecret) {
      reject(new ForbiddenError("Không tìm thấy JWT_KEY!"));
      return;
    }

    verify(token, keySecret, (error: any, decoded: any) => {
      if (error) {
        reject(new ForbiddenError(`Token không hợp lệ - (${error.message})!`));
      } else {
        resolve(decoded);
      }
    });
  });
};

export { createTokenPair, verifyJWT };
