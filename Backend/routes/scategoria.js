module.exports=app=>{
    const scategoria = require("../controllers/scategoriaControler.js");
      app.get("/scategoria",scategoria.findAll);  
      app.get("/categoria",scategoria.findCatego); 
      app.get("/scategoria/:cod_sub_categoria", scategoria.findOne);
      app.post("/scategoria", scategoria.create);
      app.delete("/scategoria/:cod_sub_categoria",scategoria.delete);
      
    }