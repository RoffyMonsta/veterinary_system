import { Table, Model, Column, ForeignKey, BelongsTo, HasMany, DataType } from "sequelize-typescript";
import Sequelize from "sequelize/types/sequelize";
import { v4 as uuidv4 } from 'uuid';
import { Doctor } from "./doctor.model";

@Table
export class Clinic extends Model {

  @Column({primaryKey: true, defaultValue: uuidv4()})
  id!: string;
  
  @Column
  name!: string;

  @Column({type: DataType.DOUBLE})
  longitude!: number;

  @Column({type: DataType.DOUBLE})
  latitude!: number;

  @Column
  address!: string;

  @Column
  imgUrl!: string;

  @Column
  phoneNumber!: string;

  @Column({defaultValue: false})
  onlyVaccinated!: boolean;

  @Column({defaultValue: false})
  onlyPassport!: boolean;

  @HasMany(() => Doctor)
  doctors!: Doctor[]
}
