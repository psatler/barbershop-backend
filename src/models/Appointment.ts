import { uuid } from 'uuidv4';

/**
 * Appointment entity
 */
class Appointment {
  id: string;

  provider: string;

  date: Date;

  // using the Omit to indicate all attributes but id will come from the constructor
  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
