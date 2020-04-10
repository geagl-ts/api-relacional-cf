"use strict";
module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define(
        "Task",
        {
            description: DataTypes.TEXT,
        },
        {}
    );

    Task.associate = function (models) {
        Task.belongsTo(models.User, { as: "user" });
    };

    return Task;
};
