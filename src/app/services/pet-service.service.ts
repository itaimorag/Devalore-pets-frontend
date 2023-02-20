import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import  axios from 'axios';
import { Pet } from '../models/pet.model';
import { PetFilter } from '../models/pet-filter.model';


@Injectable({
    providedIn: 'root'
})
export class PetService {
    constructor(private http: HttpClient) { }

    // Mock the database
    private _petsDb: Pet[] = [{ _id:'sdf877654',
    name:'kitzi',
    age:7,
    type:'cat',
    color:'black'}]
    

    private _pets$ = new BehaviorSubject<Pet[]>([]);
    public pets$ = this._pets$.asObservable()

    private _filterBy$ = new BehaviorSubject<PetFilter>({ term: '' });
    public filterBy$ = this._filterBy$.asObservable()


    public async query() {

        try{
        let apiPets=await axios({
            url: 'http://localhost:3030/api/pets',
            method: 'GET',
            params: {}
          })
        const filterBy = this._filterBy$.getValue()
        this._petsDb=apiPets.data
        const pets = this._petsDb.filter(({ name }) => {
            return name.toLowerCase().includes(filterBy.term.toLowerCase());
        });
        this._pets$.next(pets);
    }
    catch(err){
        console.log(err)
      }
    }

    // public shouldAdoptPet() {
    //     return this.http.get<{ answer: string }>('https://yesno.wtf/api')
    //         .pipe(
    //             map(res => res.answer)
    //         )
    // }


    public getEmptyPet() {
        return { name: '', age: 0,  type:'', color:'' }
    }

    public remove(petId: string) {
        const pets = this._petsDb
        const petIdx = pets.findIndex(pet => pet._id === petId)
        pets.splice(petIdx, 1)
        this._pets$.next(pets);
        return of({})
    }

    public getById(petId: string): Observable<Pet | void> {
        const pet = this._petsDb.find(pet => pet._id === petId)
        if (pet) return of({ ...pet })
        return of()
    }


    public async save(pet: Pet): Promise<Observable<Pet | void>> {
        pet._id = this._makeId()
        try{

            let apiPet=await axios({
                url: 'http://localhost:3030/api/pets',
                method: 'POST',
                params: {pet}
            })
            this._petsDb.push(apiPet.data)
            this._pets$.next([...this._petsDb])
            return of(apiPet.data)
        }
        catch(err){
            console.log(err)
            return of()
          }
    }


    public setFilterBy(filterBy: PetFilter) {
        this._filterBy$.next(filterBy)
        this.query()
    }

    // private _add(pet: Pet) {
    //     pet._id = this._makeId()

    //     this._petsDb.push(pet)
    //     this._pets$.next([...this._petsDb])
    //     return of(pet)
    // }

    // private _edit(pet: Pet) {
    //     const pets = this._petsDb
    //     const petIdx = pets.findIndex(_pet => _pet._id === pet._id)
    //     pets.splice(petIdx, 1, pet)
    //     this._pets$.next([...pets])
    //     return of(pet)
    // }

    private _makeId(length = 5) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}
