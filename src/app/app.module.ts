import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app-root/app.component';
import { PetAppComponent } from './pages/pet-app/pet-app.component';
import { PetListComponent } from './cmps/pet-list/pet-list.component';
import { PetPreviewComponent } from './cmps/pet-preview/pet-preview.component';
import { PetFilterComponent } from './cmps/pet-filter/pet-filter.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { UserMsgComponent } from './cmps/user-msg/user-msg.component';
import { PetEditComponent } from './pages/pet-edit/pet-edit.component';
import { DateDescPipe } from './pipes/date-desc.pipe';
import { FilterArrPipe } from './pipes/filter-arr.pipe';
import { FetchDataPipe } from './pipes/fetch-data.pipe';
import { NaturalTypePipe } from './pipes/natural-type.pipe';
import { InputColorDirective } from './directives/input-color.directive';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    PetAppComponent,
    PetListComponent,
    PetPreviewComponent,
    PetFilterComponent,
    AppHeaderComponent,
    UserMsgComponent,
    PetEditComponent,
    DateDescPipe,
    FilterArrPipe,
    FetchDataPipe,
    NaturalTypePipe,
    InputColorDirective,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
