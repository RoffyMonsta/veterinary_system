import { Table, Model, Column, HasMany } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid';
import { Animal } from "./animal.model";

@Table
export class User extends Model {

  @Column({primaryKey: true, defaultValue: uuidv4() })
  id!: string;

  @Column
  username!: string;

  @Column
  email!: string;

  @Column
  passwordHash!: string;

  @Column({defaultValue: 'Pending'})
  status!: string;

  @Column({defaultValue: uuidv4() })
  confirmationCode!: string;

  @Column
  firstName?: string;

  @Column
  lastName?: string;

  @Column({defaultValue: '//ssl.gstatic.com/accounts/ui/avatar_2x.png'})
  imgurl!: string;

  @HasMany(() => Animal)
  animals!: Animal[]
}