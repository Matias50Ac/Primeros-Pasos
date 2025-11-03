import { Component, signal } from '@angular/core';
import { ContadorComponent } from './contador/contador';

@Component({
  selector: 'app-root',
  imports: [ContadorComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = '¡Hola Mundo con Angular 20!';
  mensaje = 'Mi primera aplicación Angular';
  contador = 0;
  totalClicks = 0;

  cambiarMensaje() {
    this.mensaje = this.mensaje === 'Mi primera aplicación Angular' 
      ? '¡Angular 20 es genial!' 
      : 'Mi primera aplicación Angular';
    this.contador++;
  }
  onContadorCambio(nuevoValor: number) {
    this.totalClicks++;
    console.log('Contador cambió a:', nuevoValor);
  }
}