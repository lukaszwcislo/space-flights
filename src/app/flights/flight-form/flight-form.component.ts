import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Crew, Flight } from 'src/app/models/flight.model';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss']
})
export class FlightFormComponent implements OnInit {

  @Input() editMode = false;

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
      departureTime: ['', { validators: Validators.required }],
      returnTime: ['', { validators: Validators.required }],
      code: ['RF', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(7)] }],
      additionalInformatin: '',
      withRocketDiscount: false,
      crew: this.formBuilder.array(this.editMode ? [] : [this.buildCrewMember()])
    })
  }

  public buildCrewMember(crewMember: Crew = {} as Crew) {
    return this.formBuilder.group({
      name: crewMember.name || '',
      job: crewMember.job || ''
    })
  }

  public addCrewMember(crewMember?: Crew) {
    this.crew.push(this.buildCrewMember(crewMember))
  }

  get crew() {
    return this.form.get('crew') as FormArray;
  }

  public removeCrewMember(index: number) {
    this.crew.removeAt(index);
  }

  public setFlight(flight: Flight) {
    const {key, ...formData} = flight;
    console.log('...formData',{...formData});
    
    this.form.patchValue(formData);
    formData.crew.forEach(crewMember => this.addCrewMember(crewMember))
  }

  ngOnInit(): void {
    this.buildForm()
  }

}
