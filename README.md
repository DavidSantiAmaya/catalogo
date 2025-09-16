David Santiago Amaya Reyes Codigo 55823026
Temas de Angular necesarios para el taller
Componentes básicos


Qué es un componente y su estructura (decorador @Component, selector, template, style).
Un componente es la unidad básica de la UI en Angular: una clase TypeScript marcada con el decorador @Component que asocia una plantilla (template), selector y estilos para renderizar una parte de la aplicación. El decorador @Component provee la metainformación (selector, templateUrl/template, styleUrls/styles, etc.) que Angular usa para crear e instanciar el componente en tiempo de ejecución. Ejemplo:
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  title = 'Producto X';
}
(Angular, s/f).


Diferencia entre un componente de página (vista completa) y uno reutilizable (ej. ProductCard).
Componente de página (vista completa): representa una pantalla o ruta completa (p. ej. HomeComponent, ProductListPage). Su alcance es mayor y normalmente está ligado al router.


Componente reutilizable: pieza pequeña y autónoma que se inserta muchas veces en distintas vistas (p. ej. ProductCard, Navbar); se diseña con entrada (@Input) y salidas (@Output) claras para maximizar su reutilización.


Esta distinción es práctica y arquitectónica: las páginas orquestan múltiples componentes reutilizables y estado; los componentes reutilizables encapsulan presentación y API mínima. (Ver guía de arquitectura de componentes).(Angular, s/f-b).

Standalone Components (Angular 15+)


Qué significa que no hay módulos (NgModule).
Desde Angular 14/15 se introdujo el modelo standalone: las clases marcadas con standalone: true no necesitan ser declaradas en un NgModule. Esto permite declarar un componente como independiente y importar directamente los recursos que requiere (CommonModule, otros componentes, pipes, etc.) en su propio metadato imports. Ejemplo:

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `<app-product-card [name]="p.name"></app-product-card>`
})
export class AppComponent {}


El objetivo es reducir el boilerplate y permitir adopción incremental; las aplicaciones pueden mezclar componentes standalone y NgModules.(Angular, s/f)


Uso de la propiedad standalone: true.
Colocar standalone: true en el @Component({...}) indica que el componente es autónomo y puede ser usado directamente (por ejemplo en el router o importado en otros componentes) sin estar declarado en un NgModule. Cuando es standalone, debes listar en imports todo lo que necesites (directivas, pipes, módulos comunes).(Angular, s/f)


Importación de otros componentes/módulos dentro de imports.
En un componente standalone el campo imports funciona como el lugar para declarar dependencias que antes se ponían en NgModule. Allí se pueden incluir CommonModule, FormsModule, otros componentes standalone, pipes o directivas que el template necesita. Esto hace explícitas las dependencias al nivel del componente. Ejemplo: imports: [CommonModule, FormsModule, ProductCardComponent].(Angular, s/f)


Data Binding

Angular conecta la clase (modelo) con la vista por bindings:
Interpolación ({{ }}): renderiza expresiones como texto en la plantilla. 
Ej.: <h1>{{ title }}</h1>
Property binding ([prop]="value"): enlaza propiedades DOM/inputs a valores del componente (tipos no sólo string).
 Ej.: <img [src]="product.imageUrl">.
Event binding ((event)="handler()"): escucha eventos del DOM y ejecuta métodos TS. 
Ej.: <button (click)="addToCart(p)">Añadir</button>.


Estos mecanismos están descritos y especificados en la guía de sintaxis de binding y en la guía de plantillas.(Angular, s/f-c)


Directivas estructurales


*ngFor: itera colecciones y replica un template por cada elemento. 
Sintaxis típica: 
<li *ngFor="let item of items; let i = index">{{ i+1 }} - {{ item.name }}</li>. Es la forma abreviada del NgForOf. Angular


*ngIf: incluye o excluye elementos del DOM según una expresión booleana. 
Ej.: <p *ngIf="isAvailable">Disponible</p>;
 también existe la forma *ngIf; else para manejar el bloque alterno. (Ver guía de directivas estructurales)..(Angular, s/f-d)
Decoradores @Input y @Output
@Input(): marca propiedades del componente hijo que pueden recibir datos desde el padre. Ej.: @Input() name!: string; y en el padre: 
<app-product-card [name]="product.name"></app-product-card>.

@Output(): marca propiedades que son EventEmitter para emitir eventos al padre. Ej.:
@Output() selected = new EventEmitter<number>();
select() { this.selected.emit(this.product.id); }
En el padre se captura con (selected)="onSelected($event)".
@Output() debe asociarse a EventEmitter (clase provista por @angular/core) para disparar eventos personalizados.(Angular, s/f-e)

________________________________________________________________________________________________________________________________
Bibliografía
Angular. (s/f). Angular.Io. Recuperado el 16 de septiembre de 2025, de https://v17.angular.io/guide/standalone-components
Angular. (s/f-b). Angular.dev. Recuperado el 16 de septiembre de 2025, de https://angular.dev/guide/components
Angular. (s/f-c). Angular.Io. Recuperado el 16 de septiembre de 2025, de https://v17.angular.io/guide/binding-syntax
Angular. (s/f-d). Angular.Io. Recuperado el 16 de septiembre de 2025, de https://v17.angular.io/guide/structural-directives
Angular. (s/f-e). Angular.Io. Recuperado el 16 de septiembre de 2025, de https://v17.angular.io/guide/inputs-outputs
