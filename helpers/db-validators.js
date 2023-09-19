const Role = require("../models/role");
const Usuario = require("../models/usuario");

const isValidRole = async (rol = "") => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no existe`);
    }
};

const emailExists = async (correo = "") => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya está registrado`);
    }
};

const idExists = async (id = "") => {
    const existeUsuario = await Usuario.findById(id);
    console.log(existeUsuario);

    if (!existeUsuario) {
        throw new Error(`El usuario ${id} no existe`);
    }
};

module.exports = {
    isValidRole,
    emailExists,
    idExists
};
