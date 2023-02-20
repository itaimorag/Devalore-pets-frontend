import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/services/pet-service.service';
import { UserMsgService } from 'src/app/services/user-msg.service';

@Component({
    selector: 'pet-app',
    templateUrl: './pet-app.component.html',
    styleUrls: ['./pet-app.component.scss']
})
export class PetAppComponent implements OnInit, OnDestroy {

    constructor(private petService: PetService, private userMsgServices: UserMsgService) { }
    pets!: Pet[]
    pets$!: Observable<Pet[]>
    subscription!: Subscription
    prm = Promise.resolve('Resolved!!!!')

    ngOnInit(): void {

        this.petService.query()
        this.pets$ = this.petService.pets$
        // this.subscription = this.petService.pets$.subscribe(pets => {
        //     this.pets = pets
        // })

        // setInterval(() => {
        //     this.petService.save({ name: 'Gertrude', age: 1, birthDate: new Date('2021-11-1') } as Pet)
        // }, 1000)

    }

    onRemovePet(petId: string) {
        this.petService.remove(petId)
        this.userMsgServices.setUserMsg(`Pet removed (${petId})`)
    }

 

    ngOnDestroy(): void {
        // this.subscription.unsubscribe()
    }

}
