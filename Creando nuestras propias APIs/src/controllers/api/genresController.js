const db = require('../../database/models');
const sequelize = db.sequelize;


const genresController = {
    'list': (req, res) => {
        db.Genre.findAll()
            .then(genres => {
                res.status(200).json({
                    meta:{
                        status: 200,
                        total : genres.length,
                        url: 'api/genres'
                    },
                    data : genres
                })
            })
            .catch(errors => res.status(401).json({
                meta:{
                    status: 401,
                    url: 'api/genres'
                },
                errors
            }))
    },
    'detail': (req, res) => {
        db.Genre.findByPk(req.params.id)
        .then(genre => {
            res.status(200).json({
                meta:{
                    status: 200,
                    url: `api/genres/detail/${genre.id}`
                },
                data : genre
            })
        })
        .catch(errors => res.status(401).json({
            meta:{
                status: 401,
                url: `api/genres/detail/${req.params.id}`
            },
            errors
        }))
    }

}

module.exports = genresController;