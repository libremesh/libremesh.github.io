# Contribuyendo

Al contribuir a este repositorio, por favor discute primero el cambio que deseas hacer mediante un issue,
correo electrónico o cualquier otro método antes de realizar un cambio. 

Por favor, ten en cuenta que tenemos un código de conducta, por favor síguelo en todas tus interacciones con el proyecto.

## Forks y Pull Requests

El desarrollo en lime-packages sigue el método Fork y Pull Request popularizado por GitHub:

- Cada colaborador tiene su propia copia completa, llamada *Fork*
- Los colaboradores implementan funcionalidades o corrigen errores en su propio fork en una rama de funcionalidad.
- Cuando el colaborador desea integrar sus cambios de vuelta en el repositorio principal,
  creará un *Pull Request*.

Cada uno de estos pasos se discutirá a continuación:

#### Forking

Lo primero que necesitarás para desarrollar es crear una nueva copia del repositorio para
trabajar. Esto se conoce como "Forking" y es una característica definitoria de los sistemas
SCM distribuidos: cada persona trabaja en su propia copia completa del repositorio. Git está diseñado para
hacer que mantener estos repositorios sincronizados sea trivialmente fácil pasando revisiones firmadas entre las
copias individuales.

Para crear un fork:

1. Inicia sesión en GitHub y ve al [repositorio GitHub de lime-packages](https://github.com/libremesh/lime-packages).

2. Haz clic en "Fork". Deberías ser redirigido a una copia completa del repositorio que ahora reside en tu cuenta.

3. En tu estación de trabajo, crea un clon del repositorio Git:
    ```git clone git@github.com:<tu-nombre-de-usuario>/lime-packages.git```
    Esto creará otra copia completa del repositorio: una que residirá
    en tu estación de trabajo.

4. Haz checkout del branch `master`.
   ```git checkout master```

### Branching

Cualquier cambio que se realice en la base de código de lime-packages debe hacerse en su propio branch. El branch
debe crearse a partir de la punta de `master`, que es el branch de desarrollo. Antes de comenzar
cualquier trabajo, asegúrate de obtener los últimos cambios upstream del repositorio.
Hacer esto asegurará que tienes una copia actualizada de `master`, que los cambios realizados por otros
no se perderán, y también reducirá las posibilidades de conflictos cuando llegue el momento de fusionar los
cambios de vuelta a lime-packages.

#### Nombres de Branch

Solo existe un branch principal:

- `master`: este branch es la versión de trabajo que está actualmente en desarrollo. Todos
    los nuevos branches de funcionalidad deben crearse a partir de la punta de `master` y todos los PR deben tener `master`
    establecido como destino.

Para cualquier nuevo branch de funcionalidad, se recomienda la siguiente convención de nomenclatura:

### `<tipo>/<nombre>`

#### `<tipo>`
```
issue     - Cambios de código vinculados a un problema conocido.
feature   - Nueva funcionalidad.
hotfix    - Correcciones rápidas a la base de código.
sandbox   - Experimentos (nunca serán fusionados).
```

#### `<nombre>`
Siempre usa guiones para separar palabras, y mantenlo corto.

##### Ejemplos
```
issue/133
feature/smonit
hotfix/driver-xxx
sandbox/new-crazy-thing
```

#### Flujo de trabajo general

El flujo de trabajo general para branching es el siguiente:

1. Obtén los últimos cambios de `upstream` (es decir, del repositorio principal):

   ```git fetch upstream master```

2. Haz checkout de tu copia de `master` y fusiona los cambios upstream:

     ```git checkout master```
     
     ```git merge upstream/master```

     Ahora tienes una copia actualizada del branch `master`.

3. Crea un nuevo branch para tus cambios:

     ```git checkout -b <nombre del branch>```

4. Ejecuta las pruebas: lee la [[documentación de pruebas](testing)].

5. Realiza tus cambios, te recomendamos intentar agregar una prueba.

6. Asegúrate de que las pruebas sigan ejecutándose correctamente.

7. Envía los cambios a `origin` (es decir, tu fork)

     ```git push origin <nombre del branch>```

8. Crea un nuevo Pull Request (ver más abajo).

#### Creando un Pull Request

Para integrar tus cambios en el repositorio principal de lime-packages, necesitarás
crear un *Pull Request* en GitHub.

1. Inicia sesión en GitHub y ve a tu fork de lime-packages.

2. Haz clic en "New Pull Request"

3. Asegúrate de que se establezcan las siguientes propiedades:

    - Fork base = `libremesh/lime-packages`
    - Base = `master`
    - Fork de origen = tu fork de lime-packages
    - Comparar = el branch que deseas fusionar

4. Agrega una descripción de lo que es el cambio y haz clic en "Create Pull Request".

En este punto, se recomienda notificar a uno de los otros desarrolladores del 
pull request y pedirle que realice una revisión rápida. Harán cualquier comentario
en el pull request en sí, que deberías recibir como notificaciones de GitHub o como
correos electrónicos.

Una vez que el revisor haya aprobado el pull request, y GitHub haya indicado que se puede
fusionar automáticamente, eres libre de fusionar el pull request.

#### Manejo de conflictos

A veces GitHub informará que el Pull Request no se puede fusionar automáticamente,
lo que generalmente significa que hay conflictos de fusión.

Por lo general, es una buena idea resolver los conflictos en el branch en el que estás trabajando,
en lugar de hacerlo en `master`.

Para hacerlo:

1. Obtén los últimos cambios del branch upstream `master`

    ```git fetch upstream master```

2. Asegúrate de estar en tu rama de funcionalidad.

3. Fusiona los cambios upstream en master. Verás "mensajes de conflicto"

    ```git merge upstream/master```
     
4. Usa una herramienta de fusión para resolver los conflictos. Si tienes una configurada con Git,
    ejecutar `git mergetool` debería abrirla. Algunas herramientas GUI como 
    [esta](https://git-scm.com/download/gui/linux) tienen una integrada.

5. Asegúrate de que la fusión fue exitosa construyendo y probando los cambios.

6. Confirma los cambios y envía a origin.

     ```git commit```

     ```git push origin <branch>```

Si ya tienes un Pull Request pendiente, GitHub debería detectar los cambios
recientes e indicar que el PR está listo para ser fusionado.

### Más información

Para más información, consulta [Collaborating on projects using issues and pull requests](https://help.github.com/categories/collaborating-on-projects-using-issues-and-pull-requests/) en la guía de ayuda de GitHub.
