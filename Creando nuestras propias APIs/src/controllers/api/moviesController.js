const db = require('../../database/models');
const{ Op } = require('sequelize')

module.exports = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.status(200).json({
                    meta:{
                        status: 200,
                        total : movies.length,
                        url: 'api/movies'
                    },
                    data : movies
                })
            })
            .catch(errors => res.status(401).json({
                meta:{
                    status: 401,
                    url: 'api/movies'
                },
                errors
            }))
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
        .then(movie => {
            res.status(200).json({
                meta:{
                    status: 200,
                    url: `api/movies/detail/${movie.id}`
                },
                data : movie
            })
        })
        .catch(errors => res.status(401).json({
            meta:{
                status: 401,
                url: `api/movies/detail/${req.params.id}`
            },
            errors
        }))
    },
    store: (req, res) => {
        db.Movie.create(req.body)
        .then( movie => {
            return res.status(200).json({
                data: movie,
                status: 200,
                created: "ok"
            })
        })
        .catch(errors => res.status(401).json({
            meta:{
                status: 401,
                url: `api/movies/`,
                created: "false"
            },
            errors
        }))
    },
    destroy: (req, res) => {
        db.Movie.destroy({
            where : {
                id : req.params.id
            }
        })
        .then((movie) =>{
            res.status(200).json({
                meta : {
                    status : 200,
                    destroy : true,
                    url : `api/movies/destroy`
                },
                deleteMovie : movie
                
            })
        })
        .catch(errors => res.status(401).json({
            meta : {
                status : 401,
                create : false,
                url : `api/movies/destroy`
            },
            errors
        }))
    },

    search: (req,res) => {
        db.Movie.findAll({
            where: {
                title: { [Op.like]: '%' + req.query.keyword + '%'}
            }
        })
        .then(movies => {
            if(movies.length > 0) {
                return res.status(200).json(movies)
            } else {
                return res.json('No se encontraron peliculas')
            }
        })
    }
}