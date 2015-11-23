/**
 * Pokemons.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        nombre: {
            type: "string",
            required: true
        },
        numero: {
            type: "integer"
            //unique: true
        },
        tipo: {
            type: "string",
            enum: ['agua', 'fuego', 'bicho', 'planta', 'roca', 'tierra']
        },
        avatarUrl: {
            type: "string",
            unique: true
        },
        avatarFd: {
            type: "string",
            unique: true
        },
        url: {
            type: "string",
            unique: true
        },
        entrenador: {
            model: 'Usuarios'
        }
    }
};

