// Importa las funciones de Angular Core, incluidas las de Signals
import { Component, signal, input, output, computed, effect } from '@angular/core';

@Component({ // Decorador estándar del componente
  selector: 'app-contador-signals', // Nombre de la etiqueta HTML para usarlo
  standalone: true, // Indica que es un componente "standalone" (no usa NgModules)
  imports: [], // Dependencias que necesita este componente (ninguna)
  templateUrl: './contador-signals.html', // Ruta al archivo HTML (la vista)
  styleUrl: './contador-signals.css' // Ruta al archivo CSS (los estilos)
})
export class ContadorSignalsComponent {
  
  // --- Inputs (Entradas) ---
  // Esta es la nueva sintaxis de "Inputs" basada en signals (reemplaza a @Input())
  readonly titulo = input('Contador con Signals'); // Input Signal para el título (opcional, con valor por defecto)
  readonly valorInicial = input(0); // Input Signal para el valor inicial (requerido, con valor por defecto 0)
  readonly maximo = input(10); // Input Signal para el valor máximo (requerido, con valor por defecto 10)
  
  // --- Output (Salida) ---
  // Esta es la nueva sintaxis de "Outputs" basada en signals (reemplaza a @Output())
  readonly cambioValor = output<number>(); // Output Signal para emitir un evento de tipo 'number'
  
  // --- Estado Interno (State) ---
  // Esta es la signal principal que almacena el estado (el valor)
  valor = signal(0); // Es una 'WritableSignal' (Signal de escritura)
  
  // --- Computed Signals (Signals Calculadas) ---
  // Las 'computed' signals derivan su valor de otras signals.
  // Se recalculan automáticamente solo cuando una de sus dependencias cambia.
  
  porcentaje = computed(() => { // 'porcentaje' depende de 'valor' y 'maximo'
    // Para leer una signal, se usa '()' -> this.valor()
    return Math.round((this.valor() / this.maximo()) * 100); 
  });
  
  estado = computed(() => { // 'estado' depende de 'porcentaje'
    const porcentaje = this.porcentaje(); // Lee el valor de la signal 'porcentaje'
    if (porcentaje === 0) return 'Inicial';
    if (porcentaje < 50) return 'Bajo';
    if (porcentaje < 80) return 'Medio';
    if (porcentaje < 100) return 'Alto';
    return 'Máximo';
  });
  
  colorEstado = computed(() => { // 'colorEstado' depende de 'estado'
    const estado = this.estado(); // Lee el valor de la signal 'estado'
    switch (estado) { // Asigna un color CSS basado en el estado
      case 'Inicial': return '#666';
      case 'Bajo': return '#4caf50';
      case 'Medio': return '#ff9800';
      case 'Alto': return '#f44336';
      case 'Máximo': return '#9c27b0';
      default: return '#666';
    }
  });
  
  constructor() {
    // --- Effects (Efectos Secundarios) ---
    // Un 'effect' se ejecuta una vez, y luego cada vez que CUALQUIER
    // signal leída dentro de él cambia su valor.
    
    // Este 'effect' es para logging. Se ejecutará si 'titulo', 'valor' o 'estado' cambian.
    effect(() => {
      console.log(`Contador ${this.titulo()}: ${this.valor()} (${this.estado()})`);
    });
    
    // Este 'effect' se usa para inicializar 'valor' cuando 'valorInicial' (Input) esté listo.
    effect(() => {
      // .set() se usa para asignar un valor nuevo a la signal
      this.valor.set(this.valorInicial()); 
    }, { allowSignalWrites: true }); // Se requiere permiso explícito para escribir en una signal dentro de un effect
  }
  
  /**
   * Método para incrementar el valor.
   */
  incrementar() {
    if (this.valor() < this.maximo()) { // Lee 'valor' y 'maximo' para comparar
      // .update() se usa para actualizar una signal basándose en su valor anterior
      this.valor.update(v => v + 1); 
      this.cambioValor.emit(this.valor()); // Emite el nuevo valor con el Output Signal
    }
  }
  
  /**
   * Método para decrementar el valor.
   */
  decrementar() {
    if (this.valor() > 0) { // Lee 'valor' para comparar
      this.valor.update(v => v - 1); // Actualiza 'valor' restando 1
      this.cambioValor.emit(this.valor()); // Emite el nuevo valor
    }
  }
  
  /**
   * Método para reiniciar el contador.
   */
  reiniciar() {
    this.valor.set(this.valorInicial()); // Asigna (con .set) el valor del Input 'valorInicial'
    this.cambioValor.emit(this.valor()); // Emite el valor reseteado
  }
}