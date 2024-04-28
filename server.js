import express from "express";
import path from "path";

const app = express();
const usuarios = ["Juan","Jocelyn","Astrid","Maria",
"Ignacia", "Javier", "Brian"];

const __dirname = path.resolve();

const validar = (req, res, next) => {
    const { usuario } = req.params;
    const validar = usuarios.map((u) => u.toLowerCase()).includes(usuario.toLowerCase());
    if (validar) {
      next();
    } else {
      res.sendFile(__dirname + '/assets/who.jpeg');
    }
};

app.get('/', (req, res) => {
    res.send('Bienvenido al servidor de Abracadabra!');
});

app.get("/abrakadabra/usuarios", (req, res)=>{
    res.json(usuarios)
});

app.use(express.static("assets"));

app.get("/abrakadabra/juego/:usuario",validar, (req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.get('/abracadabra/conejo/:n', (req, res) => {
    const numero = Math.floor(Math.random() * (5 - 1)) + 1;
    const num = +req.params.n;
    if (num == numero) {
      res.sendFile(__dirname + '/assets/conejito.jpg');
    } else {
      res.sendFile(__dirname + '/assets/voldemort.jpg');
    }
});

app.get('*', (req, res) => {
    res.send(
      `<center><br><h1 style="color:red"> ERROR 404 NOT FOUND</h1></center>`
    );
});

app.listen(3000, ()=>{
    console.log("Server corriendo en puerto 3000")
})