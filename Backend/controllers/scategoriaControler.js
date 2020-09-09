const Scategoria = require('../models/scategoria.js');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "contenido no puede estar vacio!"
        });
    }
    const scategoria = new Scategoria({
        COD_SUB_CATEGORIA: req.body.COD_SUB_CATEGORIA,
        COD_CATEGORIA: req.body.COD_CATEGORIA,
        NOMBRE: req.body.NOMBRE,
        DESCRIPCION: req.body.DESCRIPCION, 
        FECHA_CREACION: req.body.FECHA_CREACION

        
    });
    Scategoria.create(scategoria, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "han ocurrido algunos errores creando ."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Scategoria.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving aspirantes."
            });
        else res.send(data);
    });
};

exports.findCatego = (req, res) => {
    Scategoria.getCategoria((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving aspirantes."
            });
        else res.send(data);
    });
};



exports.findOne = (req, res) => {
    Scategoria.findById(req.params.cod_sub_categoria, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: `not found cate with id ${req.params.cod_sub_categoria}.`
                });
            } else {
                res.status(500).send({
                    message: "Error al recuperar " + req.params.cod_sub_categoria
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    Scategoria.remove(req.params.cod_sub_categoria, (err, data) => {
        if (err) {
            if (err.kind == "no encontrado") {
                res.status(404).send({
                    message: `Not found scategoria WITH codigo ${REQ.PARAMS.cod_sub_categoria}`
                });
            } else {
                res.status(509).send({
                    message: "No se pudo eliminar el codigo: " + req.params.cod_sub_categoria
                });
            }
        } else res.send({ message: ` elimnado satisfactoriamente!` });
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);
    Scategoria.updateById(
        req.params.cod_sub_categoria,
        new Scategoria(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Aspirante with codaspirante ${req.params.cod_sub_categoria}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Aspirante with id " + req.params.cod_subcategoria
                    });
                }
            } else res.send(data);
        }
    );
};


