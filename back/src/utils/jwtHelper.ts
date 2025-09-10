import jwt from "jsonwebtoken";

// 登录成功时调用
function getToken(email:string) {
  return jwt.sign(
    email,
    process.env.JWT_SECRET || "Hello World", // 从环境变量读取密钥
  );
}

export { getToken };
