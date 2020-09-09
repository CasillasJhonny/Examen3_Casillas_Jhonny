const sql = require('../util/database.js');



const Scategoria = function (scategoria) {

    this.COD_SUB_CATEGORIA=scategoria.COD_SUB_CATEGORIA;
    this.COD_CATEGORIA= scategoria.COD_CATEGORIA;
    this.NOMBRE= scategoria.NOMBRE;
    this.DESCRIPCION= scategoria.DESCRIPCION; 
    this.FECHA_CREACION=scategoria.FECHA_CREACION;

}

Scategoria.create = (newScategoria, result) => {
  sql.query("INSERT INTO SUBCATEGORIA SET ?", newScategoria, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }
    console.log(" Creado: ", { cod_sub_categoria: res.insertcod_sub_categoria, ...newScategoria });
    result(null, { cod_sub_categoria: res.insertcod_sub_categoria, ...newScategoria });
  });
};

Scategoria.getAll = result => {
  sql.query("SELECT * FROM SUBCATEGORIA", (err, res) => {
    if (err) {
      console.log("error:", err);
      result(null, err);
      return;
    }
    console.log("scategoria:", res);
    result(null, res);
  });
};

Scategoria.findById = (cod_sub_categoria, result) => {
  sql.query(`SELECT * FROM SUBCATEGORIA WHERE COD_SUB_CATEGORIA= '${cod_sub_categoria}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log(" encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Scategoria.remove = (id, result) => {
  sql.query("DELETE FROM SUBCATEGORIA WHERE COD_SUB_CATEGORIA = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted aspirante with id: ", id);
    result(null, res);
  });
};

/* Scategoria.updateById = (id, aspirante, result) => {
  sql.query(
    "UPDATE SUBCATEGORIA SET CEDULA = ?, APELLIDO = ?, NOMBRE = ?, DIRECCION = ?, TELEFONO=?, FECHA_NACIMIENTO=?, GENERO=?, CORREO_PERSONAL=? WHERE COD_ASPIRANTE = ?",
    [aspirante.CEDULA, aspirante.APELLIDO, aspirante.NOMBRE, aspirante.DIRECCION, aspirante.TELEFONO, aspirante.FECHA_NACIMIENTO, aspirante.GENERO, aspirante.CORREO_PERSONAL, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Aspirante: ", { ...aspirante });
      result(null, { ...aspirante });
    }
  );
}; */
module.exports = Scategoria;