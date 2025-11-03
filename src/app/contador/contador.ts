// Importa las dependencias necesarias de Angular
import { Component, Input, Output, EventEmitter } from '@angular/core'; 

@Component({ // Decorador que define los metadatos del componente
  selector: 'app-contador', // Nombre de la etiqueta HTML para usarlo (ej: <app-contador>)
  standalone: true,        // Define el componente como "standalone" (no requiere un NgModule)
  imports: [],               // Lista de dependencias que importa este componente
  templateUrl: './contador.html', // Ruta al archivo HTML que define la vista
  styleUrl: './contador.css'      // Ruta al archivo CSS para los estilos
})
export class ContadorComponent { // Define la clase principal del componente

  // --- Entradas (Inputs) ---
  @Input() titulo: string = 'Contador'; // Propiedad de entrada para el título, con valor por defecto
  @Input() valorInicial: number = 0; // Propiedad de entrada para el valor inicial, con valor por defecto
  @Input() maximo: number = 10; // Propiedad de entrada para el valor máximo, con valor por defecto
  
  // --- Salida (Output) ---
  @Output() cambioValor = new EventEmitter<number>(); // Evento que emite un número hacia el componente padre
  
  // --- Propiedad Interna ---
  valor: number = 0; // Variable interna para almacenar el estado actual del contador
  
  /**
   * Método del ciclo de vida de Angular.
   * Se ejecuta una vez cuando el componente se inicializa.
   */
  ngOnInit() {
    this.valor = this.valorInicial; // Establece el valor actual usando el valor inicial recibido
  }
  
  /**
   * Método para incrementar el contador.
   */
  incrementar() {
    if (this.valor < this.maximo) { // Solo incrementa si es menor que el máximo permitido
      this.valor++; // Aumenta el valor en 1
      this.cambioValor.emit(this.valor); // Emite el nuevo valor al padre
    }
  }
  
  /**
   * Método para decrementar el contador.
   */
  decrementar() {
    if (this.valor > 0) { // Solo decrementa si es mayor que 0 (evita negativos)
      this.valor--; // Disminuye el valor en 1
      this.cambioValor.emit(this.valor); // Emite el nuevo valor al padre
    }
  }
  
  /**
   * Método para reiniciar el contador a su valor inicial.
   */
  reiniciar() {
    this.valor = this.valorInicial; // Restablece el valor al 'valorInicial'
    this.cambioValor.emit(this.valor); // Emite el valor reseteado al padre
  }
}