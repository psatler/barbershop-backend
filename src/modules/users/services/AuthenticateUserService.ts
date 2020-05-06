import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/hashProvider/models/IHashProvider';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponseDTO {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  // dependency inversion
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: IRequestDTO): Promise<IResponseDTO> {
    // search user by email
    const userFound = await this.usersRepository.findByEmail(email);

    if (!userFound) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // userFound.password - encrypted password
    // password - non-encrypted password

    // if user is found, validate password by comparing with the encrypted one
    const isPasswordCorrect = await this.hashProvider.compareHash(
      password,
      userFound.password,
    );

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
