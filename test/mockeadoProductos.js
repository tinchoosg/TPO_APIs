const usuarioAdmin ={
    id: 1,
    nombre: "usuario Administrador"

}

const usuarioNormal={
    id:2, 
    nombre: "usuario normal"
}

function verificarUsuario(usuario, usuarioid){
    if(usuario.id == usuarioid){
        return true;
    }else{
        return false;
    }
}