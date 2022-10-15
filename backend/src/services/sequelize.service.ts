import path from 'path'
import { Sequelize } from 'sequelize-typescript'

export const sequelize: Sequelize = new Sequelize({
  database: process.env.DB_DATABASE || "vetsystem",
  dialect: "postgres",
  username:  process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "password",
  models: [path.join(__dirname, '../') + '/**/*.model.ts'],
  host:  process.env.DB_HOST || "localhost",
  modelMatch: (filename, member) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  },
})