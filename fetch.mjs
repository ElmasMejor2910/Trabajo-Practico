import axios from 'axios';

axios.post('http://localhost:3000/create',{
    nombre:'Loise',
    apellido:'Xeneize',
    edad:18,
    id:0
}).then((respuesta) => {
    console.log('respuesta: ',  respuesta.data);
    
}).catch((error) => {
    console.error(error);
});

axios.get('http://localhost:3000/users').then((res) =>{
    console.log('Respuesta: ', res.data);
}).catch((error)=>{
    console.error(error);
})

axios.get('http://localhost:3000/users/1'
).then((respuesta) =>{
    console.log('respuesta: ', respuesta.data);
}).catch((error) =>{
    console.error(error);
})

axios.put('http://localhost:3000/users/1',{
    nombre:'Agustin',
    apellido:'Alterisio'
}).then((respuesta) =>{
    console.log('respuesta: ', respuesta.data);
}).catch((error) =>{
    console.error(error);
})