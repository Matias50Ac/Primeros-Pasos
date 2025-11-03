import { Component, signal, computed } from '@angular/core';
import { ContadorComponent } from './contador/contador';
import { ContadorSignalsComponent } from './contador-signals/contador-signals';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContadorComponent, ContadorSignalsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = signal('¡Angular 20 con Signals!');
  mensaje = signal('Mi primera aplicación Angular');
  contador = signal(0);
  totalClicks = signal(0);
  
    cambiarMensaje() {
    this.mensaje = this.mensaje === 'Mi primera aplicación Angular' 
      ? '¡Angular 20 es genial!' 
      : 'Mi primera aplicación Angular';
    this.contador++;
  }
  // Computed signal para estadísticas
  estadisticas = computed(() => {
    const clicks = this.totalClicks();
    if (clicks === 0) return 'Sin interacciones';
    if (clicks < 10) return 'Explorando...';
    if (clicks < 25) return 'Aprendiendo...';
    if (clicks < 50) return 'Progresando...';
    return '¡Dominando Angular!';
  });
  
  onContadorCambio(nuevoValor: number) {
    this.totalClicks++;
    console.log('Contador cambió a:', nuevoValor);
  }
}