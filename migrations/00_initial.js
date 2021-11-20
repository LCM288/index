/* eslint-disable */

const { DataTypes } = require("sequelize");

async function up(queryInterface) {
  await queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.createTable(
      "series",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        author: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        location: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        language: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        transaction,
      }
    );
    await queryInterface.createTable(
      "books",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        volumn: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isbn: {
          type: DataTypes.STRING(13),
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        author: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        location: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        language: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        seriesId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "series", key: "id" },
          onDelete: "RESTRICT",
        },
        status: {
          type: DataType.ENUM,
          values: [
            "on-load",
            "on-shelf",
            "hold",
            "lost",
            "archieved",
            "deleted",
          ],
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        transaction,
      }
    );
    await queryInterface.createTable(
      "borrowings",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        sid: {
          type: DataTypes.STRING(12),
          allowNull: false,
        },
        bookId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "books", key: "id" },
          onDelete: "RESTRICT",
        },
        borrowedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        dueOn: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        returnedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        renewalCounts: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        transaction,
      }
    );
    await queryInterface.createTable(
      "miscSettings",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        key: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        value: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        transaction,
      }
    );
  });
}

async function down(queryInterface) {
  await queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.dropTable("miscSettings", { transaction });
    await queryInterface.dropTable("borrowings", { transaction });
    await queryInterface.dropTable("books", { transaction });
    await queryInterface.dropTable("series", { transaction });
  });
}

module.exports = { up, down };
