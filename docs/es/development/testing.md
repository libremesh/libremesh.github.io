---
title: "Guía de testing"
---
# Guía de testing

LibreMesh cuenta con pruebas unitarias que nos ayudan a agregar nuevas funcionalidades manteniendo el esfuerzo de mantenimiento contenido.

Alentamos a los colaboradores a escribir pruebas al agregar nuevas funcionalidades y también al corregir regresiones.

Las pruebas unitarias de LibreMesh se basan en la poderosa biblioteca [busted](https://lunarmodules.github.io/busted/) que tiene una muy buena documentación.

Las pruebas se ejecutan dentro de una imagen Docker x86_64 con algunas bibliotecas lua y openwrt disponibles.

También tenemos una máquina virtual qemu para desarrollo, es una imagen completa de libremesh que se puede usar en desarrollo.

## Cómo ejecutar las pruebas

Simplemente ejecuta `./run_tests`:
![run_tests](https://i.imgur.com/TBIE7Gp.png)


Esto construirá automáticamente la imagen de prueba de Docker en la primera ejecución y luego ejecutará las pruebas y creará el reporte de cobertura.    
Nota: debes tener Docker instalado y en ejecución.   
Nota: debes ejecutar las pruebas como `usuario no root`: para ejecutar docker sin root agrega tu usuario en el grupo docker, luego reinicia el docker.service, y vuelve a ingresar como tu propio usuario.
```
su root
/sbin/groupadd docker
/sbin/usermod -aG docker $USER
systemctl restart docker
su - $USER
```
Verifica que docker esté funcionando, debería devolver sin errores y una salida como la siguiente:
```
user@machine: docker ps -a
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

Usa `LUA_ENABLE_LOGGING=1 ./run_tests` si quieres enviar los logs a stdout.

## Estructura del directorio de testing

El código lua del paquete `foo` debe estar en la forma de *estructura de árbol de archivos expandida*:
`package/foo/files/usr/lib/lua/foo.lua`

Los archivos de prueba viven dentro de un directorio `tests` con sus nombres comenzando con `test_`: