import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Appointment entity
 */
@Entity('appointments') // refering to the appointments table in the database
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;

  // using the Omit to indicate all attributes but id will come from the constructor
  // constructor({ provider, date }: Omit<Appointment, 'id'>) {
  //   this.id = uuid();
  //   this.provider = provider;
  //   this.date = date;
  // }
}

export default Appointment;
