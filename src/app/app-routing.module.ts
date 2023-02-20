import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetAppComponent } from './pages/pet-app/pet-app.component';
import { PetEditComponent } from './pages/pet-edit/pet-edit.component';
import { PetResolver } from './services/pet.resolver';

const routes: Routes = [
    {
        path: '', component: PetAppComponent, children: [
            { path: 'edit/:id', component: PetEditComponent, resolve: { pet: PetResolver } },
            { path: 'edit', component: PetEditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
