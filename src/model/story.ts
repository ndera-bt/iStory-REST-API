import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tag } from "./tags";
import { User } from "./user";

@Entity("story")
export class Story extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({
    type: "text",
  })
  body: string;

  @Column({
    nullable: true,
  })
  imageUrl: string;

  @Column({
    default: true,
  })
  isPublic: boolean;

  @ManyToMany(() => Tag, (tag) => tag.stories)
  tags: Tag[];

  @ManyToOne(() => User, (user) => user.stories, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
