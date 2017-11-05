import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
// {RadioButtonModule} from 'primeng/primeng';


import { AppComponent }  from './app.component';
import { HeroDetailComponent1 } from './hero-detail.component';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    //RadioButtonModule
   ],
  declarations: [ AppComponent, HeroDetailComponent1 ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
