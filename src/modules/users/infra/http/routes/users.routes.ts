import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const uploadMiddlware = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const usersRepository = new UsersRepository();
    const createUser = new CreateUserService(usersRepository);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password; // so we don't list the password

    return res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  uploadMiddlware.single('avatar'),
  async (request, response) => {
    // console.log(request.file);

    const usersRepository = new UsersRepository();
    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
