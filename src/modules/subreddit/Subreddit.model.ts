import { BelongsToMany, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import UserSubreddit from "../users/UserSubreddit.model";
import User from "../users/User.model";

@Table({
  tableName: "subreddits",
  updatedAt: false,
  createdAt: false
})
export default class Subreddit extends Model<Subreddit> {
  @PrimaryKey
  @Column({type: DataType.STRING})
  name: string;

  @BelongsToMany(() => User, () => UserSubreddit)
  users: User[]
}