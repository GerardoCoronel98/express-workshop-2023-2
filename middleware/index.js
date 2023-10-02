module.exports = (req, res, next) => {
    //res es simplemnte la respuesta del servidor ligado a los códigos
    //de http, en caso 200 es que todo salio bien, en caso 404 respuesta de error
    return res.status(200).json({ code: 1, message: "Bienvenido a la Pokedex" });
}