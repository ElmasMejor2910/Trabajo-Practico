import express from 'express';
import fs from 'fs';

const db = {
	file: './data.json',
	load(){
		return JSON.parse(fs.readFileSync(this.file)) //Leer el archivo data.json
	},
	save(data){
		fs.writeFileSync(this.file, JSON.stringify(data))  //Escribir datos en el archivo
	},
    displayById(id) {    //Mostrar por ID
        const data = this.load()
        const item = data.find((element) => element.id === id)
        if (item) {
          return item // return the item data explicitly
        } else {
          console.log(`Usuario con ID '${id}' no encontrado.`)
          return undefined // not necessary, but included for clarity
        }
    },displayByName(name){  //Mostrar por nombre
        const data = this.load() //const data con los datos de data.json
        const item = data.find((user) => user.nombre === name) // Busca coincidencia entre el nombre dado y los guardados
        if (item){
            return item  // si existe devuelve el usuario
        }else{
            console.log(`No se ha encontrado un usuario con el nombre '${name}'`) //si no existe
        }
    },
	delete(id){
		const data = this.load()
		data.forEach((element, index) => {
			if(element.id === id){
				data.splice(index, 1, )
			}
		})
		this.save(data)
	}
}
const users = db.load();

const app = express();

app.use(express.json());



app.post('/create', (req,res) =>{  //Post para guardar usuarios en la DB
    const user = req.body;
    user.id = users.length;
    users.push(user);
    db.save(users)

    res.json ({
        msg: 'user nuevo:'.user
    })
})
app.put("/users/:id",(req,res) =>{  //Modificar usuario usando la ID
    const id = req.params.id;
    const newData = req.body;
    const users = db.load()
    let userFound = null
    users.forEach((user, index) => {
        console.log('user: ', user)
        if(user.id == id){
            users[index] = {
                id,
                nombre: newData.nombre ? newData.nombre : user.nombre,   // operadores if  '?' = true    ':' else
                apellido: newData.apellido ? newData.apellido : user.apellido
            }
            userFound = users[index]
        }
    })

    db.save(users);

    return userFound ? res.status(200).json(userFound) : res.status(404).send('usuario no encontrado')
})
app.get("/users/:id" , (req, res) => {

    const id = req.params.id;

    const user = users.find(u => u.id == id);
    console.log(user)
    res.json({
        user
    });
})
app.get("/users",(req,res) =>{
    res.json({
        users
    })
})

app.listen(3000, () =>{
    console.log(`Server started on port 3000`);
})