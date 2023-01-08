import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Crew } from 'src/app/models/flight.model';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss']
})
export class FlightFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {}

  public form!: FormGroup;
  public jobs = [
    { label: 'Stwaredess', value: 'stweradess'},
    { label: 'Senior Cabin Crew', value: 'senior_cabin_crew'},
    { label: 'Pilot', value:'pilot'},
    { label: 'Co-Pilot', value: 'co_pilot'},
    { label: 'Mechanic', value: 'mechanic'},
    { label: 'Developer', value: 'developer'}
  ]

  private buildForm() {
    this.form = this.formBuilder.group({
      origin: ['', { validators: Validators.required }],
      destination: ['', { validators: Validators.required }],
      departerTime: ['', { validators: Validators.required }],
      returnTime: ['', { validators: Validators.required }],
      code: ['RF', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(7)] }],
      additionalInformatin: '',
      withRocketDiscount: false,
      crew: this.formBuilder.array([this.buildCrewMember()])
    })
  }

  public buildCrewMember() {
    return this.formBuilder.group({
      name: '',
      job: ''
    })
  }

  public addCrewMember() {
    this.crew.push(this.buildCrewMember())
  }

  get crew() {
    return this.form.get('crew') as FormArray;
  }

  public removeCrewMember(index: number) {
    this.crew.removeAt(index);
  }

  ngOnInit(): void {
    this.buildForm()
  }

}
