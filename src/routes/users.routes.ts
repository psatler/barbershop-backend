import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const uploadMiddlware = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

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
    console.log(request.file);

    return response.json({
      ok: true,
    });
  },
);

export default usersRouter;
