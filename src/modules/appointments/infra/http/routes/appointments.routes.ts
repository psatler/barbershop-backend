import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentsRepository.find(); // to fetch all data from db

//   return res.json(appointments);
// });

appointmentsRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;

  const parsedDate = parseISO(date); // this is not a business logic (it's only a date transformation), so it stayed here, not going to the service

  // instatiating the repository so we pass it to the service
  const appointmentsRepository = new AppointmentsRepository();
  const createAppointment = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return res.json(appointment);
});

export default appointmentsRouter;
