import { BaseEntity, Entity, JoinColumn, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';

@Entity()
export default class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ default: false })
  removed: boolean;

  constructor(post?: { id: string; user: User; removed: boolean }) {
    super();
    this.id = post?.id;
    this.user = post?.user;
    this.removed = post?.removed;
  }
}
