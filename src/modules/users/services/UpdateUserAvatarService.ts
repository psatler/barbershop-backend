import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  // dependency inversion
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    user_id,
    avatarFilename,
  }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar!', 401);
    }

    if (user.avatar) {
      // check if user already have an avatar saved. If so, we deleted it first
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath); // we delete the file
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user); // saving the user with the updated avatar

    return user;
  }
}

export default UpdateUserAvatarService;
