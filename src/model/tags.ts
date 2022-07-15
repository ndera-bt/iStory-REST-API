import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Story } from "./story";

@Entity("tags")
export class Tag extends BaseEntity {
  @PrimaryColumn({
    type: "uuid",
  })
  @Generated("uuid")
  id: string;

  @Column({
    nullable: false,
  })
  tag: string;

  @ManyToMany(() => Story, (story) => story.tags, { cascade: true })
  @JoinTable({
    name: "story_tags",
    joinColumn: { name: "tag_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "story_id", referencedColumnName: "id" },
  })
  stories: Story[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
