/**
 * PokemonsController
 *
 * @description :: Server-side logic for managing Pokemons
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    subirFoto: function (req, res) {
        var params = req.allParams();
        var deleteFd = '/home/xavier/Documentos/Universidad/Octavo/JS/TecWebJav_2015_B/ArchivosSesion/assets/images/';
        //var deleteFd = '/home/ubuntu/workspace/assets/images/';
        sails.log.info('Perfil: ', params.perfil);

        req.file('perfil').upload({
            // don't allow the total upload size to exceed ~10MB
            dirname: '../../assets/images',
            maxBytes: 10000000
        }, function whenDone(err, uploadedFiles) {
            if (err) {
                return res.negotiate(err);
            }

            // If no files were uploaded, respond with an error.
            if (uploadedFiles.length === 0) {
                return res.badRequest('No file was uploaded');
            }

            console.log(uploadedFiles[0]);
            var urlImagen = uploadedFiles[0].fd.replace(deleteFd, "");
            // Save the "fd" and the url where the avatar for a user can be accessed
            Usuarios.update(req.session.pokemon, {

                // Generate a unique URL where the avatar can be downloaded.
                avatarUrl: require('util').format('%s/pokemon/avatar/%s', sails.getBaseUrl(), req.session.pokemon),

                // Grab the first file and use it's `fd` (file descriptor)
                avatarFd: uploadedFiles[0].fd,

                url: urlImagen
            })
                .exec(function (err) {
                    if (err) return res.negotiate(err);
                    req.session.pokemon.url = urlImagen;
                    return res.redirect('http://localhost:1337/perfilPokemon');
                    return res.redirect('https://pokemon-xavierxc14.c9users.io/usuario');
                });
        });
    },
    home: function (req, res) {

        var pokemon;

        Pokemons.find()
            .exec(function (err, results) {
                if (err) return res.negotiate();

                pokemon = results;

                return res.view('pokemons', {
                    pokemons: pokemon
                });
            });

    },
    perfil: function (req, res) {

        var pokemon;

        Pokemons.find()
            .exec(function (err, results) {
                if (err) return res.negotiate();

                pokemon = results;

                return res.view('perfilPokemon', {
                    pokemons: pokemon
                });
            });

    },
    crear: function (req, res) {
        var params = req.allParams();

        var values = {
            nombre: params.nombre,
            numero: params.numero,
            tipo: params.tipo,
            entrenador: req.session.user
        };

        Pokemons.create(values)
            .exec(function (err, created) {
                req.session.pokemon = created;
                console.log(req.session.pokemon);
                //return res.view('perfilPokemon', {
                //    pokemon: created
                //});
                //TODO: Agregar carga de imagen, preguntar como
            });
        return res.redirect('http://localhost:1337/perfilPokemon');

    }

};

