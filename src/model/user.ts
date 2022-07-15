import {
  Generated,
  BaseEntity,
  Column,
  PrimaryColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  AfterInsert,
  AfterUpdate,
  BeforeUpdate,
} from "typeorm";
import { Story } from "./story";
import { PasswordManager } from "../util/password";

@Entity("user")
export class User extends BaseEntity {
  @PrimaryColumn({
    type: "uuid",
  })
  @Generated("uuid")
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Story, (story) => story.user, { onDelete: "CASCADE" })
  stories: Story[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  async hashPassword() {
    const hashPass = await PasswordManager.hash(this.password);
    this.password = hashPass;
  }

  @AfterInsert()
  returnOptions() {
    (this.password = ""), (this.id = "");
  }

  @BeforeUpdate()
  async hashUpdate() {
    const hashPass = await PasswordManager.hash(this.password);
    this.password = hashPass;
  }
}
