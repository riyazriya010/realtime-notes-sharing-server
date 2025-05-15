// utils/responseHelpers.ts
import { Response } from 'express';

export const sendAuthResponse = (
  res: Response,
  accessToken: string,
  refreshToken: string,
  message: string,
  statusCode: number,
  data?: any
) => {
  return res
    .status(statusCode)
    .cookie('accessToken', accessToken, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      // domain:'realtime-notes-sharing-client.vercel.app'
    })
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      // domain: 'realtime-notes-sharing-client.vercel.app'
    })
    .json({
      success: true,
      message,
      accessToken,
      refreshToken,
      result: data
    });
};

export const sendDataResponse = (
  res: Response,
  message: string,
  data: any,
  statusCode: number
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    result: data
  });
};

export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  error?: any
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: error?.message || error
  });
};