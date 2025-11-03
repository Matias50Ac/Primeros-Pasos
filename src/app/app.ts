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
    
    // CORRECCIÓN 1: No se puede asignar con '='. Se usa .update() o .set().
    // También se debe leer el valor con 'this.mensaje()' en la comparación.
    this.mensaje.update(valorActual => 
      valorActual === 'Mi primera aplicación Angular' 
        ? '¡Angular 20 es genial!' 
        : 'Mi primera aplicación Angular'
    );

    // CORRECCIÓN 2: No se puede usar '++' en una signal. Se usa .update().
    this.contador.update(valor => valor + 1);
  }

  // Computed signal para estadísticas (Esta parte ya estaba correcta)
  estadisticas = computed(() => {
    const clicks = this.totalClicks(); // <-- Esto (leer con '()') está perfecto.
    if (clicks === 0) return 'Sin interacciones';
    if (clicks < 10) return 'Explorando...';
    if (clicks < 25) return 'Aprendiendo...';
    if (clicks < 50) return 'Progresando...';
    return '¡Dominando Angular!';
  });
  
  onContadorCambio(nuevoValor: number) {
    // CORRECCIÓN 3: Igual que antes, no se puede usar '++'.
    this.totalClicks.update(valor => valor + 1);
    
    console.log('Contador cambió a:', nuevoValor);
  }
}