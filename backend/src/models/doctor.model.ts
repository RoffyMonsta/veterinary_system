import { Table, Model, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid';
import { Clinic } from "./clinic.model";
@Table
export class Doctor extends Model {

  @Column({primaryKey: true, defaultValue: uuidv4()})
  id!: string;

  @ForeignKey(() => Clinic)
  @Column
  clinicId!: string;

  @BelongsTo(() => Clinic)
  clinic!: Clinic;
  
  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @Column
  middleName?: string;

  @Column
  imgUrl?: string;

  @Column
  specialization!: string;
}
