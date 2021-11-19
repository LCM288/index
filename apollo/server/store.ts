import { Sequelize, Transaction } from "sequelize";

/**
 * The url to the database
 * @internal
 */
const acsocIndexnDB =
  process.env.DATABASE_URL ||
  `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDB}`;

/**
 * A database connection
 */
export const sequelize = new Sequelize(acsocIndexnDB, {
  native: true,
  timezone: "Asia/Hong_Kong",
  isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
});
