import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserMsgService } from 'src/app/services/user-msg.service';

import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/services/pet-service.service';

@Component({
    selector: 'pet-edit',
    templateUrl: './pet-edit.component.html',
    styleUrls: ['./pet-edit.component.scss']
})
export class PetEditComponent implements OnInit, AfterViewInit {

    constructor(
        private petService: PetService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private userMsgServices: UserMsgService
    ) {this.form = this.fb.group({
        name: ['', [Validators.maxLength(25)], []], // [initialVal, validators, asyncValidators]
        age: [0,Validators.compose([
            Validators.required,
            Validators.min(1),
            Validators.max(Infinity),])],
        type: ['',[Validators.required]],
        color: ['',[Validators.required]],
       
    }) }

    @ViewChild('nameInput') elNameInput!: ElementRef<HTMLInputElement>

    pet!: Pet
    form!: FormGroup

    async onSubmit() {
        const pet: Pet = { ...this.form.value }
        let petName=pet.name.substring(0,1).toUpperCase()+pet.name.substring(1)
        pet.name=petName
       let newPet= await this.petService.save(pet)
        this.userMsgServices.setUserMsg(`(${pet.name}) has added`)
        this.router.navigateByUrl('/')
    }

    goBack(){
        this.router.navigateByUrl('/')
    }

    ngOnInit(): void {
        this.route.data.subscribe(({ pet }) => {
            this.pet = pet || this.petService.getEmptyPet() as Pet
        })
    }

    ngAfterViewInit(): void {
        this.elNameInput.nativeElement.focus()
    }
   

}
