import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';

@Entity()
export default class AgentRequest extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  website: string;

  @Column()
  email: string;

  constructor(agentRequest?: { user: User; website: string; email: string }) {
    super();
    this.user = agentRequest?.user;
    this.website = agentRequest?.website;
    this.email = agentRequest?.email;
  }
}
