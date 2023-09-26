const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const q = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(q),
    Usuario.find(q).skip(Number(from)).limit(Number(limit)),
  ]);
  res.json({
    total,
    usuarios,
  });
};

const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { password, google, correo, ...resto } = req.body;
  //TODO validar contraseña base de datos
  if (password) {
    //Encriptar password
    const salt = bcryptjs.genSaltSync(10);
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  res.status(500).json(usuario);
};

const usuariosPost = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encriptar password
  const salt = bcryptjs.genSaltSync(10);
  usuario.password = bcryptjs.hashSync(password, salt);
  //Guardar en BD
  await usuario.save();
  res.status(201).json({ usuario });
};
const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;

  //!Fiscamente se elimina
  // const usuario = await Usuario.findByIdAndDelete(id)

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  res.json({
    msg: "delete API - controlador",
    usuario,
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
