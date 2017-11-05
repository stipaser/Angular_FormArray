import { Component }   from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl }  from '@angular/forms';
import { states, Address, Hero, heroes } from './data-model';

@Component({
    selector: 'hero-detail',
    templateUrl: './hero-detail.component.html'
  })

  export class HeroDetailComponent1 {
      heroForm: FormGroup;
      states = states;
      hero1: Hero = heroes[0];
      newAddress: Address = new Address;
      
      chisesTypes = [
        {id: 1, value: 'input', label: 'Input'},
        {id: 2, value: 'singleChoice', label: 'Single Choice'},
        {id: 3, value: 'multipleChoice', label: 'Multiple Choice'},
      ];

      choises = [''];


      constructor (private fb: FormBuilder) {
          this.createForm();
          //this.setAddresses(this.hero1.addresses);
          this.setAddresses([this.newAddress]);

          this.setChoices(['']);
      }

      onClick() {
        console.log(this.heroForm);
        const arr = this.myArr.controls.filter(x => x.disabled == true).map(x => x.value);
        console.log(arr);
      }

      onChangeChoice(index: number) {
        if (this.myArr.controls[index].errors == null) { 
          this.myArr.controls[index].disable();
        }
      }

      EditChoice(index: number) {
        console.log('edit');
        this.myArr.controls[index].enable();
      }


      createForm() {
          this.heroForm = this.fb.group ({
            name: ['', Validators.required],
            power: '',
            sidekick: '',
            choisesTypes: ''
          });
      }

      choiceUnique(controlForm: FormControl) {
        if (this.myArr != null) { 
        const arr: string[] = this.myArr.controls.filter(x => x.disabled == true).map(x => x.value);
        return !arr.find(x => x == controlForm.value) ? null : {uniqueChoice: {value: false}}; 
      }
      }

      onCheckChoisesTypes() {
        if( this.heroForm.get('choisesTypes').value == 'singleChoice' || this.heroForm.get('choisesTypes').value == 'multipleChoice' ){
          return true;
        }
      }


      setAddresses(addresses: Address[]) {
        const addressFGs = addresses.map(address => this.fb.group(address));
        const addressFormArray = this.fb.array(addressFGs);
        this.heroForm.setControl('secretLairs', addressFormArray);
      }

      setChoices(choises: string[]) {
        const choisesArControl = choises.map(x => this.fb.control(x, [Validators.required, this.choiceUnique.bind(this)]));
        const choisesFormArray = this.fb.array(choisesArControl);
        this.heroForm.setControl('myArr', choisesFormArray);
      }

      get secretLairs(): FormArray {
        return this.heroForm.get('secretLairs') as FormArray;

      };
       
      get myArr(): FormArray {
        return this.heroForm.get('myArr') as FormArray;
      }

      addLair() {
        this.secretLairs.push(this.fb.group(new Address()));
        
      }

      addChoice() {
        // this.myArr.controls[this.myArr.length-1].disable();

        if (this.myArr.controls[this.myArr.length-1].value != '') {
          this.myArr.push(this.fb.control([''], [Validators.required, this.choiceUnique.bind(this)]));
        }

      }

      removeChoice(index: number ) {

        if (this.myArr.length > 1) {
          this.myArr.removeAt(index);
        } 

      }
  }
