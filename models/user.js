"use strict";

const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password_hash: DataTypes.STRING,
            password: DataTypes.VIRTUAL,
        },
        {}
    );

    User.login = async function (email, password) {
        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            return null;
        } else {
            const match = await user.authenticatePassword(password);
            return match ? user : null;
        }
    };

    User.prototype.authenticatePassword = async function (password) {
        return await bcrypt.compare(password, this.password_hash);
    };

    User.associate = function (models) {
        User.hasMany(models.Task, { as: "tasks" });
    };

    User.beforeCreate(async function (user, options) {
        try {
            const hash = await bcrypt.hash(user.password, 10);
            user.password_hash = hash;
        } catch (err) {
            console.log(err);
            return err;
        }
    });

    return User;
};
