import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable()
export class ProductosService {

  productos:Producto[] = [];
  cargando = true;
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();
   }


  private cargarProductos(){

    return new Promise((resolve, reject)=>{
      this.http.get('https://angular-html-ce793.firebaseio.com/productos_idx.json')
      .subscribe((resp:Producto[])=>{

        this.productos = resp;
        this.cargando = false;
        resolve();

      });

    });


  }

  getProducto( id:string ){

   return this.http.get(`https://angular-html-ce793.firebaseio.com/productos/${ id }.json`);
       
  }

  buscarProducto( termino:string ){

    if(this.productos.length === 0){
      //cargar prodcutos
      this.cargarProductos().then(()=>{
        this.filtrarProductos( termino );
      });
    }else{
      //hacer el filtro
      this.filtrarProductos( termino );
    }



  }

  private filtrarProductos( termino:string ){
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod =>{

      let tituloLower = prod.titulo.toLocaleLowerCase();

      if( prod.categoria.indexOf( termino ) >=0  || tituloLower.indexOf( termino ) >= 0 ){
        this.productosFiltrado.push( prod )
      }
    });

  }


}
