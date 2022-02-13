# Startup

## Sever
Server side setup:

Once you have the repo cloned, open the server directory.

Run `python3 -m venv venv`

Now activate the virtual environment `source venv/bin/python`

Then install the requirements `pip install -r requirements.txt`

Create a `.env` file and set the following enviorment variables:
```bash
ENVIRONMENT="development"
PORT=8000
```
### Docker
Build the image with `docker build -t startup/dev`

Now run the container `docker run -p 8000:8000 id-del-contenedor`

Open `localhost:8000`

## Servidor

Configuration del servidor:

Una vez hayas clonado el repositorio, abre el directorio server.

Ahora ejecuta `python3 -m venv venv`

Activa el entorno virtual `source venv/bin/python`

Instala los requerimientos `pip install -r requirements.txt`

Crea un archivo `.env` y asigna las siguientes varibles de entorno:
```bash
ENVIRONMENT="development"
PORT=8000
```
### Docker
Contruye la imagen con `docker build -t startup/dev`

Corre el contenedor con docker `docker run -p 8000:8000 id-del-contenedor`

Ahora abre `localhost:8000`
## Client
Client side setup:

Once you have the repo cloned, open the client directory.

Now run `npm install`

Create a `.env` file and set the following enviorment variables:
```bash
API_URL="https://..."
```
## Cliente
Client side setup:

Una vez hayas clonado el repositorio, abre el directorio client.

Ahora ejecuta `npm install`

Crea un archivo `.env` y asigna las siguientes varibles de entorno:
```bash
API_URL="https://..."
```
