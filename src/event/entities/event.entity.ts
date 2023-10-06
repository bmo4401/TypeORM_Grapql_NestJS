import { User } from 'src/auth/entities/user.entity';
import { Attendee } from 'src/event/entities/attendee.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ name: 'event' })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;
  @Column()
  description: string;
  @Column({ name: 'when' })
  when: Date;
  @Column()
  address: string;

  @OneToMany(() => Attendee, (attendee) => attendee.event, {
    nullable: false,
    cascade: true,
  })
  attendees: Attendee[];
  attendeeCount?: number;

  attendeeRejected?: number;
  attendeeMaybe?: number;
  attendeeAccepted?: number;

  @ManyToMany(() => User, (user) => user.events, {
    nullable: false,
    cascade: true,
  })
  @JoinColumn({ name: 'userIds' })
  users: User[];
}
