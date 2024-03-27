const queryUser = {
    getAllUser: "SELECT *FROM USUARIOS",
    getActiveUsers: "SELECT *FROM USUARIOS WHERE ACTIVO = 1",
    addUsers: "INSERT INTO USUARIOS (apellidos,nombres,usuario,pass,rol,activo) VALUES (@apellidos,@nombres,@usuario,@pass,2,1)"
}
const queryToken={
    getAllToken: "SELECT * FROM TOKEN",
    addToke:"INSERT INTO TOKEN (access_token,refresh_token,fecha_creacion,activo,id_usuario) VALUES (@access_token,@refresh_token,@fecha_creacion,@activo,@id_usuario)",
    updateToken:"UPDATE TOKEN SET access_token = @access_token,refresh_token = @refresh_token,fecha_creacion = getdate() where id_token = @id_token"
}
const queryJournalist={
    getAllJournalist:"SELECT id_periodista id,nombre name FROM periodistas",
    addJournalist:"INSERT INTO periodistas (nombre) values (@nombre)",
    updateJournalist:"UPDATE periodistas SET nombre = @nombre where id_periodista = @id_periodista",    
}
const queryFile = {
    // getAllDateFile:"SELECT id_archivo,archivos.nombre,descripcion,tipos.nombre nom_tipo,periodistas.nombre nom_periodista, archivos.fecha_creacion,archivos.usuario_creacion FROM ARCHIVOS WHERE fecha_creacion = @fecha_creacion or ACTIVO = 1",
    addFile:"INSERT INTO ARCHIVOS (id_archivo,nombre,descripcion,id_tipo,id_periodista,respaldo,fecha_creacion,usuario_creacion,activo)VALUES(@id_archivo,@nombre,@descripcion,@id_tipo,@id_periodista,@respaldo,@usuario_creacion,1)",
    updateFile:"UPDATE ARCHIVOS SET nombre = @nombre,descripcion = @descripcion, id_tipo = @id_tipo,id_periodista = @id_periodista,respaldo=@respaldo,fecha_modificacion=@fecha_modificacion,usuario_modificacion=@usuario_modificacion",
    deleteFile:"UPDATE ARCHIVOS SET activo = 0 where id_archivo = @id_archivo"
}
module.exports = {
    queryUser,
    queryToken,
    queryJournalist,
    queryFile
}