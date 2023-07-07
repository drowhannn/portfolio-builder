// @ts-ignore
import jwt from 'jsonwebtoken'

const config = useRuntimeConfig()

const generateAccessToken = (id: Number) => {
  return jwt.sign({ userId: id }, config.jwtSecret, {
    expiresIn: '1w',
  })
}

const generateRefreshToken = (id: Number) => {
  return jwt.sign({ userId: id }, config.jwtSecret, {
    expiresIn: '4w',
  })
}

export const generateTokens = (id: Number) => {
  const accessToken = generateAccessToken(id)
  const refreshToken = generateRefreshToken(id)

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  }
}
