import {
  BeforeCreate,
  BelongsToMany,
  Column,
  DataType,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique
} from "sequelize-typescript";
import { v4 } from 'uuid'
import { UUID } from "../../types/UUID";
import Subreddit from "../subreddit/Subreddit.model";
import UserSubreddit from "./UserSubreddit.model";
import NewsletterSchedule from "../newsletter/NewsletterSchedule.model";

@Table({
  tableName: "users",
  updatedAt: false
})
export default class User extends Model<User> {
  @PrimaryKey
  @Column({type: DataType.UUID})
  id: UUID;

  @Unique({name: 'user.name', msg: 'User name has to be unique'})
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name: String;

  @Unique({name: 'user.email', msg: 'User email has to be unique'})
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  email: String;

  @BeforeCreate({name: 'generateUUID'})
  static generateUUID(user: User) {
    user.id = v4()
  }

  @BelongsToMany(() => Subreddit, () => UserSubreddit)
  subreddits: Subreddit[]

  @HasOne(() => NewsletterSchedule)
  newsletterSchedule: NewsletterSchedule

  async format() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      schedule: (await this.$get('newsletterSchedule'))?.format()
    }
  }
}