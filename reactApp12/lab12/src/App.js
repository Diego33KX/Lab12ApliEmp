import axios from 'axios';
import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = ({
      prestamos: [],
      pos : null,
      titulo2:'Registrar',
      id:0,
      idLibro:'',
      idUsuario:'',
      fecPrestamo:'',
      fecDevolucion:'',
      
      model_b:({
        titulo:'',
      }),
      model_u:({
      
        nombre:'',
      })
    })
    this.cambioLibro = this.cambioLibro.bind(this);
    this.cambioUsuario = this.cambioUsuario.bind(this);
    this.cambioFecPrestamo = this.cambioFecPrestamo.bind(this);
    this.cambioFecDevolucion = this.cambioFecDevolucion.bind(this);
    this.mostrar = this.mostrar.bind(this)
    this.guardar = this.guardar.bind(this)
    this.eliminar = this.eliminar.bind(this)
  }
  componentWillMount(){
    axios.get('http://127.0.0.1:8000/prestamos/')
    .then(res=>{
      this.setState({ prestamos: res.data })
    })
    
  }
  cambioLibro(e){
    this.setState({
      idLibro: e.target.value
    })
  }
  cambioUsuario(e){
    this.setState({
      idUsuario: e.target.value
    })
  }
  cambioFecPrestamo(e){
    this.setState({
      fecPrestamo: e.target.value
    })
  }
  cambioFecDevolucion(e){
    this.setState({
      fecDevolucion: e.target.value
    })
  }
  mostrar(cod,index){
    axios.get('http://127.0.0.1:8000/prestamos/'+cod+'/')
    .then(res=>{
      this.setState({
        pos:index,
        titulo2:'Editar',
        id:res.data.id,
        idLibro: res.data.idLibro,
        idUsuario: res.data.idUsuario,
        fecPrestamo: res.data.fecPrestamo,
        fecDevolucion: res.data.fecDevolucion
      })
    })
  }
  guardar(e){
    e.preventDefault();
    let cod = this.state.id;
    let datos = {
      idLibro: this.state.idLibro,
      idUsuario: this.state.idUsuario,
      fecPrestamo: this.state.fecPrestamo,
      fecDevolucion:this.state.fecDevolucion
    }
    if(cod>0){
      axios.put('http://127.0.0.1:8000/prestamos/'+cod+'/',datos)
      .then(res =>{
        let indx = this.state.pos;
        this.state.prestamos[indx] = res.data;
        var temp = this.state.prestamos;
        this.setState({
          pos:null,
          titulo2:'Nuevo',
          id:0,
          idLibro:'',
          idUsuario:'',
          fecPrestamo:'',
          fecDevolucion:'',
          
          prestamos : temp
        });
      }).catch((error)=>{
        console.log(error.toString());
      })
    }else{
      axios.post('http://127.0.0.1:8000/prestamos/',datos)
      .then(res=>{
        this.state.prestamos.push(res.data);
        var temp = this.state.prestamos;
        this.setState({
          id:0,
          idLibro:'',
          idUsuario:'',
          fecPrestamo:'',
          fecDevolucion:'',
          prestamos: temp
        });
      }).catch((error)=>{
        console.log(error.toString());
      });
    }
  }
  eliminar(cod){
    let rpta = window.confirm("Desea eliminar?")
    if(rpta){
      axios.delete('http://127.0.0.1:8000/prestamos/'+cod+'/')
      .then(res => {
        var temp = this.state.prestamos.filter((producto)=>producto.id != cod);
        this.setState({
          prestamos:temp
        })
      })
    }
  }
  render() {
    return (<div className='container py-3'>
      <table className='table'>
        <thead className='table-success text-center'>
            <tr>
              <th>Ejemplar</th>
              <th>Libro</th>
              <th>Cliente</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
          {this.state.prestamos.map((prestamo,index)=>{
            return(
              <tr key={prestamo.id}>
                  <td>{prestamo.id}</td>
                  <td>{prestamo.model_b.titulo}</td>
                  <td>{prestamo.model_u.nombre}</td>
                  <td>{prestamo.fecPrestamo}</td>
                  <td>{prestamo.fecDevolucion}</td>
                  <td className='text-center'>
                    <button onClick={()=>this.mostrar(prestamo.id,index)} className="btn btn-warning">editar</button>{"     "}
                    <button onClick={()=>this.eliminar(prestamo.id)} className="btn btn-danger">eliminar</button>
                  </td>
              </tr>
            )
          })}
          <tr>

          </tr>
        </tbody>
      </table>
      <hr/>
      <div className='container col-6 py-2 border border-success rounded-start rounded-end'>
      <h1 className='text-center'>{this.state.titulo2}</h1>
        <form onSubmit={this.guardar}>
            <input type="hidden" value={this.state.id}></input>
            <p>
              Ingresa el id del libro:
              <input type="text" value={this.state.idLibro} onChange={this.cambioLibro} className="form-control"></input>
            </p>
            <p>
              Igresa el id del usuario:
              <input type="text" value={this.state.idUsuario} onChange={this.cambioUsuario} className="form-control"></input>
            </p>
            <p>
              Ingresa la fecha de prestamo:
              <input type="text" value={this.state.fecPrestamo} onChange={this.cambioFecPrestamo} className="form-control"></input>
            </p>
            <p>
              Ingresa la fecha de devolucion:
              <input type="text" value={this.state.fecDevolucion} onChange={this.cambioFecDevolucion} className="form-control"></input>
            </p>
            <p>
              <input type="submit" className='btn btn-success'></input>
            </p>
        </form>
      </div>
      </div>)
  };
};
export default App;

