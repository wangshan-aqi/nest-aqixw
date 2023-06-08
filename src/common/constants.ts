/**
 * Jwt密钥
 */

export const jwtConstants = {
  secret: '123456',
  signOptions: {
    expiresIn: 3600 * 24 * 7 + 's' // 签名有效时间
  }
};
