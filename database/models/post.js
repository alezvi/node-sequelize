var Sequelize = require('sequelize')

module.exports = function (connection, dataTypes) {

    let columns = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        content: {
            type: dataTypes.TEXT,
            allowNull: false,
        },
        rating: {
            type: dataTypes.INTEGER,
            allowNull: true,
        },
        created_at: {
            type: dataTypes.DATE,
        },
        updated_at: {
            type: dataTypes.DATE,
        }
    }

    let Post = connection.define('post', columns, {
        timestamps: true,
        underscored: true,
        scopes: {
            rated: function (min = 0, max = 10) {
                return {
                    where: {
                        rating: {
                            [Sequelize.Op.between] : [min, max]
                        }
                    }
                }
            }
        }
    })

    Post.associate = function (models) {
        Post.belongsTo(models.user, {
            as: 'author',
            foreignKey: 'user_id'
        })

        Post.belongsToMany(models.tag, {
            through: 'post_tag',
            as: 'tag'
        })
    }

    return Post
}
