import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Pet } from '../models/pet.model';
import { PetService } from './pet-service.service';

@Injectable({
    providedIn: 'root'
})
export class PetResolver implements Resolve<Observable<Pet | void>> {

    constructor(private petService: PetService) { }

    resolve(route: ActivatedRouteSnapshot) {
        const id = route.params['id']
        return this.petService.getById(id)
    }
}
