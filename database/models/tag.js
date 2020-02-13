var Sequelize = require('sequelize')

module.exports = function (connection, dataTypes) {

    let columns = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false,
        }
    }

    let Tag = connection.define('tag', columns, {
        timestamps: false,
        underscored: true,
    })

    return Tag
}
