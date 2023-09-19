const { Router } = require("express");
const { check } = require("express-validator");

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const { isValidRole, emailExists, idExists } = require("../helpers/db-validators");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id", [
  check("id","No es un ID válido").isMongoId(),
  check("id").custom(idExists),
  validarCampos
],usuariosPut);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser más de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido").isEmail(),
    check("rol").custom(isValidRole),
    check("correo").custom(emailExists),
    validarCampos,
  ],
  usuariosPost
);

router.delete("/", usuariosDelete);

router.patch("/", usuariosPatch);

module.exports = router;
