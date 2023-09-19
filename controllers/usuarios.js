const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const usuariosGet = (req = request, res = response) => {
  const { q, nombre, apikey } = req.query;
  res.json({
    msg: "get API - controlador",
    q,
    nombre,
    apikey,
  });
};

const usuariosPut = (req = request, res = response) => {
  const { id } = req.params;

  res.status(500).json({
    msg: "put API - controlador",
    id,
  });
};

const usuariosPost = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encruptar password
  const salt = bcryptjs.genSaltSync(10);
  usuario.password = bcryptjs.hashSync(password, salt);
  //Guardar en BD
  await usuario.save();
  res.status(201).json({ usuario });
};
const usuariosDelete = (req = request, res = response) => {
  res.json({
    msg: "delete API - controlador",
  });
};

const usuariosPatch = (req = request, res = response) => {
  res.json({
    msg: "patch API - controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosDelete,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
};
