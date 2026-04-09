import jwt from "jsonwebtoken";

import { TOKEN_KEY } from "../../config/keys.js";

type JwtUser = {
  _id: string;
  type?: string;
  name?: string;
};

export function createSecretToken(user: JwtUser): string {
  if (!TOKEN_KEY) throw new Error("TOKEN_KEY required");
  return jwt.sign(
    {
      id: user._id,
      type: user.type,
      name: user.name,
    },
    TOKEN_KEY,
    { algorithm: "HS256", expiresIn: 3 * 24 * 60 * 60 }
  );
}

