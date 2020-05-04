import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: {
        date,
      },
    });

    return findAppointment || null; // if appointment is not found, returns null
  }
}

export default AppointmentsRepository;
