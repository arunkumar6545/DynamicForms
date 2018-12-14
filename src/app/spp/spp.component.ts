import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

@Component({
  selector: 'app-spp',
  templateUrl: './spp.component.html',
  styleUrls: ['./spp.component.css']
})
export class SppComponent implements OnInit {
  sppForm: FormGroup;
  initNoOfTickets = 3;

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.sppForm = this.fb.group(
      {
         optionType: [],
         tickets: this.fb.array([this.buildTicket()]),
      }
    );

    this.sppForm.get('optionType').valueChanges.subscribe(
        value =>{
          this.add(value);
        }
    );

    
  }


  buildTicket(): FormGroup {
    return this.fb.group({
      ticketNumber: '1',
      currency: ['', Validators.required],      
    });
  }

  ticketsArray(): FormArray {
    return this.sppForm.get('tickets') as FormArray;
  }

  addTickets(){
    this.ticketsArray().push(this.buildTicket());
  }

  add(optionType: string){    
    
    let noOfTickets = 0;
    const tiks = this.sppForm.get('tickets') as FormArray;
    let tikLength = tiks.length;
    console.log( 'ticket length ' + tiks.length);

   for(let l = 0; l <tikLength; l++){
      tiks.controls.splice(l);
    }

    console.log( 'ticket length after splice' + tiks.length);

    if(optionType === 'A')
    noOfTickets = 2;
    if(optionType === 'B')
    noOfTickets = 3;

    console.log('created ticks ' + noOfTickets);


    for(let l = 0; l < noOfTickets; l++){
      this.addTickets();
    }
  }

  

}
