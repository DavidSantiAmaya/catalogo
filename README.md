David Santiago Amaya Reyes Codigo 55823026
Temas de Angular necesarios para el taller
Componentes básicos


Qué es un componente y su estructura (decorador @Component, selector, template, style).
En Angular, un componente es la unidad fundamental de la interfaz de usuario. Se trata de una clase en TypeScript marcada con el decorador @Component, el cual define metainformación como el selector, el template (o templateUrl) y los estilos (styles o styleUrls). Estos elementos permiten a Angular renderizar y manejar la lógica de una parte específica de la aplicación. 

Ejemplo:
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

Componente de página (vista completa): representa una pantalla entera o ruta específica (ejemplo: HomeComponent, ProductListPage). Su responsabilidad es mayor y suele estar asociada al enrutador.

Componente reutilizable: es más pequeño, independiente y puede integrarse en diferentes vistas (ejemplo: ProductCard, Navbar). Generalmente se diseña con entradas (@Input) y salidas (@Output) claras para que sea flexible y reutilizable.

En términos arquitectónicos, las páginas coordinan varios componentes reutilizables y manejan el estado; mientras que los componentes reutilizables encapsulan únicamente la presentación y una API mínima (Angular, s/f-b).

Standalone Components (Angular 15+)


Qué significa que no hay módulos (NgModule).
A partir de Angular 14/15 se introdujeron los standalone components. Estos permiten declarar componentes con standalone: true, lo que elimina la necesidad de definirlos dentro de un NgModule. Ahora, cada componente puede importar directamente sus dependencias (como CommonModule, otros componentes, directivas o pipes) en el propio campo imports del decorador.
Ejemplo:

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `<app-product-card [name]="p.name"></app-product-card>`
})
export class AppComponent {}

Este enfoque reduce el código repetitivo (boilerplate) y facilita la adopción progresiva, ya que es posible combinar componentes standalone con módulos tradicionales(Angular, s/f)


Uso de la propiedad standalone: true.

Cuando se incluye standalone: true en un componente, este pasa a ser autónomo y puede usarse directamente en rutas o en otros componentes, sin necesidad de declararlo en un módulo. La clave está en especificar en imports todo lo que el componente requiera (directivas, pipes o módulos básicos como CommonModule) (Angular, s/f).


Importación de otros componentes/módulos dentro de imports.
En un componente standalone el campo imports funciona como el lugar para declarar dependencias que antes se ponían en NgModule. Allí se pueden incluir CommonModule, FormsModule, otros componentes standalone, pipes o directivas que el template necesita. Esto hace explícitas las dependencias al nivel del componente. 

Ejemplo: imports: [CommonModule, FormsModule, ProductCardComponent].(Angular, s/f)

Data Binding

Angular conecta la clase (modelo) con la vista por bindings:
Interpolación ({{ }}): renderiza expresiones como texto en la plantilla. 
Ej.: ///"<h1>{{ title }}</h1>"
Property binding ([prop]="value"): enlaza propiedades DOM/inputs a valores del componente (tipos no sólo string).
 Ej.: ///"<img [src]="product.imageUrl">".
Event binding ((event)="handler()"): escucha eventos del DOM y ejecuta métodos TS. 
Ej.: ///"<button (click)="addToCart(p)">Añadir</button>".


Estos mecanismos están descritos y especificados en la guía de sintaxis de binding y en la guía de plantillas.(Angular, s/f-c)


Directivas estructurales


*ngFor: itera colecciones y replica un template por cada elemento. 
Sintaxis típica: 
///"<li *ngFor="let item of items; let i = index">{{ i+1 }} - {{ item.name }}</li>". Es la forma abreviada del NgForOf. Angular


*ngIf: incluye o excluye elementos del DOM según una expresión booleana. 
Ej.: ///"<p *ngIf="isAvailable">Disponible</p>";
 también existe la forma *ngIf; else para manejar el bloque alterno. (Ver guía de directivas estructurales)..(Angular, s/f-d)
Decoradores @Input y @Output
@Input(): marca propiedades del componente hijo que pueden recibir datos desde el padre. Ej.: @Input() name!: string; y en el padre: 
///"<app-product-card [name]="product.name"></app-product-card>".

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
