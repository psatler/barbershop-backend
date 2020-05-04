import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const userRepository = getRepository(User);

    // search user by email
    const userFound = await userRepository.findOne({ where: { email } });

    if (!userFound) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // userFound.password - encrypted password
    // password - non-encrypted password

    // if user is found, validate password by comparing with the encrypted one
    const isPasswordCorrect = await compare(password, userFound.password);

    if (!isPasswordCorrect) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: userFound.id,
      expiresIn,
    });

    return {
      user: userFound,
      token,
    };
  }
}

export default AuthenticateUserService;
