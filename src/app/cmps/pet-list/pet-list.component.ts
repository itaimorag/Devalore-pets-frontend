import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';

@Component({
  selector: 'pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetListComponent  {

  constructor() { }
  @Input() pets!: Pet[] | null
  @Output() onRemove = new EventEmitter<string>()



 

}
