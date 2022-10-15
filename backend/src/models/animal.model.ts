import { Table, Model, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid';
import { User } from "./user.model";

@Table
export class Animal extends Model {

  @Column({primaryKey: true, defaultValue: uuidv4()})
  id!: string;

  @ForeignKey(() => User)
  @Column
  userId!: string;

  @BelongsTo(() => User)
  user!: User;
  
  @Column
  name!: string;

  @Column
  imgUrl?: string;

  @Column
  age?: number;

  @Column
  vaccinated?: boolean;

  @Column
  passport?: boolean;

  @Column
  kind?: string;

  @Column
  breed?: string;
}
