var Sequelize = require('sequelize')
var moment = require('moment')

module.exports = function (connection, dataTypes) {

    let columns = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: dataTypes.DATE,
        },
        updated_at: {
            type: dataTypes.DATE,
        },
        activated_at: {
            type: dataTypes.DATE,
        }
    }

    let User = connection.define('user', columns, {
        timestamps: true,
        underscored: true,
        scopes: {
            registeredYesterday: {
                where: {
                    created_at: {
                        [Sequelize.Op.between] : [
                            moment().startOf('day').subtract('1', 'days'),
                            moment().endOf('day').subtract('1', 'days'),
                        ]
                    }
                }
            },
            isGmail: {
                where: {
                    email: {
                        [Sequelize.Op.like] : '%gmail%'
                    }
                }
            }
        }
    })

    User.associate = function (models) {
        User.hasMany(models.post)
    }

    return User
}
