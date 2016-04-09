var express = require('express');
var apirouter = express.Router();



function apiGeneral(db){
  var sesion="";
  var usuario = db.collection("usuario");
  var beneficiados = db.collection("beneficiados");

  apirouter.post("/obtenerUsuario",
          function(req, res){
            usuario.findOne({$and:[{"Usuario": req.body.user},{"Clave":req.body.passw}]}, function(err, doc){
               if(doc==null){
                 res.redirect("../mindex");

               }else{
                 req.session.usuarioId=doc._id;
                 req.session.usuarioNombre=doc.Usuario;
                 res.redirect("../mindex#pagPrincipal");
               }
           });

          }
      ) // obtenerUsuario


      apirouter.get("/obtenerBeneficiados",
          function(req, res){
              beneficiados.find({},{"Nombre":1,"_id":0,"Id":1,"Edad":1,"Encargada":1,"Escuela":1}).toArray(function(err, beneficiados){
                  if(err){
                      res.status(500).json({"error":err});
                  }else{
                      res.status(200).json({"beneficiados":beneficiados});
                  }
              }) // libros.find toarray
          }
      ) // obtenerBeneficiados


      apirouter.get("/selecBene",
              function(req, res){
                global.logger={"id":req.query.Id,"nom":req.query.Nombre};
                res.redirect("../mindex#donar");

              }
          ) // obtenerUsuario


        apirouter.post("/mandarCant",
      function(req, res){
        console.log({"Id": global.logger.id},{$set:{"monto":req.body.cantidad}});
          beneficiados.update({"Id":global.logger.id},{"$inc":{"monto":parseInt(req.body.cantidad)}},function(err, doc){
              if(err){
                  res.status(500).json({"error":err});
              }else{

                  res.redirect("../mindex#exitoso");
              }
          });
      }
  ) // insertarCarrito

  return apirouter;
}//apiUsuario
module.exports = apiGeneral;
