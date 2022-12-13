module.exports = {
  // Aqui fica a validação se está em produção ou desenvolvimento, e dependendo do que for ficar
  // com o caminho diferente
  publicPath: process.env.NODE_ENV === "production" ? "/to-do-list/" : "/",
};
