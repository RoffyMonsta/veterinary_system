import { Table, Model, Column, BelongsTo, ForeignKey } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid';
import { AreaDisease } from "./areadisease.model";

@Table
export class Symptom extends Model {

  @Column({primaryKey: true, defaultValue: uuidv4()})
  id!: string;

  @ForeignKey(() => AreaDisease)
  @Column
  areaId!: string;

  @BelongsTo(() => AreaDisease)
  areaDisease!: AreaDisease;

  @Column
  name!: string;
}
