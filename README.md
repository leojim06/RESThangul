# RESThangul
## API REST para el sistema de escritura del idioma coreano

Servidor del proyecto de aprendizaje de Coreano.

Obtiene información acerca de los caracteres del sistemas de escritura coreano o hangul a través de la RESTful API

Versión actual 1.0.0

## API ENDPOINTS
A continuación se presentas las rutas de acceso para obtener los recursos de la API

### TODO LA INFORMACIÓN EN LOS RECURSOS

- [Jamo](https://resthangul.herokuapp.com/api/v1/jamo)
- [Vocales](https://resthangul.herokuapp.com/api/v1/jamo/vocales)
- [Consonantes](https://resthangul.herokuapp.com/api/v1/jamo/consonantes)
- [Grupos consonanticos](https://resthangul.herokuapp.com/api/v1/grupos_consonanticos)

### BÚSQUEDAS
Se pueden hacer búsquedas con las siguientes referencias. Tenga en cuenta que se pueden hacer convinatorias de los parametros de búsqueda
```
count: Conteo de elementos
Ejm: ?count=4
```
```
type: Tipo de jamo por la cual se busca un recurso. 
Pueden ser: [Vocal, Vocal Doble, Consonante, Consonante Derivada, Consonante Doble, Grupo Consonantico]
Ejm: ?type=vocal
```
```
limit Limitar cantidad de recursos a recibir
Ejm: ?limit=4
```
```
skip: Saltar los primeros n recursos
Ejm: ?skip=4
```
```
page: Paginación, recupera por defecto 10 elementos por página
Ejm: ?page=1
```
```
Búsqueda:  Ejemplo de varios parametros de búsqueda
Ejm: ?page=1&limit=5&skip=5
```
Para ver un ejemplo del resultado de busqueda acceder al siguiente link: https://resthangul.herokuapp.com/api/v1/jamo/?page=1&limit=5&skip=5

Además los parametros de busqueda son aplicables a la lista completa de jamos por tipo: [vocales - consonantes - grupos consonanticos].

Jamo https://resthangul.herokuapp.com/api/v1/jamo?page=1&limit=5&skip=5

Vocales https://resthangul.herokuapp.com/api/v1/jamo/vocales?page=1&limit=5&skip=5

Consonantes https://resthangul.herokuapp.com/api/v1/jamo/consonantes?page=1&limit=5&skip=5

Grupos consonanticos https://resthangul.herokuapp.com/api/v1/jamo/grupos_consonanticos?page=1&limit=1

### ID - Identificador único
Cáda recurso tiene un identificador único para su recuperación

ID del recurso https://resthangul.herokuapp.com/api/v1/jamo/:id


### Imagenes
Cáda recurso posee una imagen que lo representa

Imagen del Jamo https://resthangul.herokuapp.com/api/v1/jamo/:id/img

![jamo](./data/imagenes/아.svg "Jamo 아")

### Audios
Cáda recurso posee uno o varios audios que representan la pronunciación del caracter en coreano

Audios del Jamo https://resthangul.herokuapp.com/api/v1/jamo/:id/audio/:filename

### Ejemplos de respuesta de los recursos
Las respuestas a las peticiones del usuario se presentan en formato JSON modificado para una mejor comprensión para las personas
```JSON
Jamo
 {
  "_id": "59580d0e40542013e0452bfc",
  "jamo": "ㅓ",
  "tipo": "Vocal",
  "nombre": "어",
  "pron": "/o'/",
  "esc_rom_nombre": "eo",
  "esc_rom": "eo",
  "__v": 1,
  "img": "595840c7a95f7d1d78a11ab7",
  "audios": [
    "어♀.mp3",
    "어♂.mp3"
  ]
}
```
