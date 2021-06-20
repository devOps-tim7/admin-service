import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('nistagram_user')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  banned: boolean;

  @Column({ default: '' })
  fullName: string;

  constructor(user?: { id: string; banned: boolean; fullName: string }) {
    super();
    this.id = user?.id;
    this.banned = user?.banned;
    this.fullName = user?.fullName;
  }
}
