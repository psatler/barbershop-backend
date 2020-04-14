import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
  id: string;
  provider: string;
  parsedDate: Date;
}

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(appointment.parsedDate, parsedDate),
  );

  if (findAppointmentInSameDate) {
    return res.status(400).json({
      error: 'This appointment date is already booked',
    });
  }

  const appointment = {
    id: uuid(),
    provider,
    parsedDate,
  };

  appointments.push(appointment);

  return res.json(appointment);
});

export default appointmentsRouter;
