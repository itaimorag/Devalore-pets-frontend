import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';

@Component({
    selector: 'pet-preview',
    templateUrl: './pet-preview.component.html',
    styleUrls: ['./pet-preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class PetPreviewComponent implements OnInit {

    constructor() { }
    @Input() pet!: Pet
    @Output() onRemove = new EventEmitter<string>()

    ngOnInit(): void {
    }



    // onRemovePet() {
    //     this.onRemove.emit(this.pet._id)
    // }

}
