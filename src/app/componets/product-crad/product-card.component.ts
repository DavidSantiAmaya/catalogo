import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() name = '';
  @Input() price = 0;
  @Input() image = '';
  @Output() viewDetail = new EventEmitter<void>();
}
