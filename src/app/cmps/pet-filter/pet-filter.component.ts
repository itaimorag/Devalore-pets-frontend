import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PetFilter } from 'src/app/models/pet-filter.model';
import { PetService } from 'src/app/services/pet-service.service';

@Component({
    selector: 'pet-filter',
    templateUrl: './pet-filter.component.html',
    styleUrls: ['./pet-filter.component.scss']
})
export class PetFilterComponent implements OnInit, OnDestroy {

    constructor(private petService: PetService) { }
    filterBy!: PetFilter
    subscription!: Subscription

    ngOnInit(): void {
        this.subscription = this.petService.filterBy$.subscribe(filterBy => {
            this.filterBy = filterBy
        })
    }

    onChangeFilter() {
        this.petService.setFilterBy(this.filterBy)
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

}
