import { Router } from 'express';
import { uuid } from 'uuidv4';

const appointmentsRouter = Router();

const appoitments = [];

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const appointment = {
    id: uuid(),
    provider,
    date,
  };

  appoitments.push(appointment);

  return res.json(appointment);
});

export default appointmentsRouter;
