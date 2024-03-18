const queryUser = {
    getAllUser: "SELECT *FROM USUARIOS",
    getActiveUsers: "SELECT *FROM USUARIOS WHERE ACTIVO = 1",
    addUsers: "INSERT INTO USUARIOS (apellidos,nombres,usuario,pass,rol,activo) VALUES (@apellidos,@nombres,@usuario,@pass,2,1)"
}
module.exports = {
    queryUser    
}