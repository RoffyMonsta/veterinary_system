import { Table, Model, Column, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid';
import { Symptom } from "./symptom.model";

@Table
export class AreaDisease extends Model {

  @Column({primaryKey: true, defaultValue: uuidv4()})
  id!: string;

  @Column
  doctorSpecialization!: string;

  @HasMany(() => Symptom)
  symptoms!: Symptom[]
}

