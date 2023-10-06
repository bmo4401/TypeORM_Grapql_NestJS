import { Field, ObjectType } from '@nestjs/graphql';
import { Profile } from 'src/auth/entities/profile.entity';
import { Event } from 'src/event/entities/event.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field({ nullable: true })
  id: number;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Column({ unique: true })
  @Field({ nullable: true })
  email: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;

  @OneToOne(() => Profile, { nullable: true })
  @JoinColumn()
  profile?: Profile;

  @ManyToMany(() => Event, (event) => event.users, {
    nullable: true,
  })
  @JoinColumn()
  events?: Event[];
}
