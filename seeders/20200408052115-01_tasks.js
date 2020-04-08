"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "tasks",
            [
                {
                    id: 1,
                    description: "Grabar el curso backend",
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 2,
                    description: "Editar los videos de curso backend",
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 3,
                    description: "Subir los videos",
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("tasks", null, {});
    }
};
