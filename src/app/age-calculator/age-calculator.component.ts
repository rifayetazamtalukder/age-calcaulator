//#region Imports
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, ErrorStateMatcher } from '@angular/material/core';

import * as _moment from 'moment';

const moment = _moment;
//#endregion Imports

//#region Instant Errors Using ErrorStateMatcher
export class AgeCalculatorErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;

    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
//#endregion Instant Errors Using ErrorStateMatcher


export const MY_FORMATS = {
  parse: {
    dateInput: ['LL'],
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


// 
@Component({
  selector: 'app-age-calculator',
  templateUrl: './age-calculator.component.html',
  styleUrls: ['./age-calculator.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  // Need to remove view encapsulation so that the custom tooltip style defined in
  // `tooltip-custom-class-example.css` will not be scoped to this component's view.
  encapsulation: ViewEncapsulation.None,
})
export class AgeCalculatorComponent implements OnInit, OnDestroy {
  // 
  // |`````````````````````````````````````````````````````````````````|
  // |                          Variables                              |
  // |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
  //  
  //#region Variables
  // Error State Matcher
  ageCalculator_errorStateMatcher = new AgeCalculatorErrorStateMatcher();
  private formValueChange: Subscription;
  public _show_from_timeField: boolean = false;
  public _show_to_timeField: boolean = false;
  public _showResults: boolean = false;

  private age = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,

    inOnly_months: { months: 0, weeks: 0, days: 0 },
    inOnly_weeks: { weeks: 0, days: 0, hours: 0 },
    inOnly_days: { days: 0, hours: 0, minutes: 0 },
    inOnly_hours: { hours: 0, minutes: 0, seconds: 0 },

    inOnly_minutes: { minutes: 0, seconds: 0 },
    inOnly_seconds: { seconds: 0, milliseconds: 0 },

    inOnly_milliseconds: 0
  }

  private age_str_values = {
    years: '',
    months: '',
    days: '',
    hours: '',
    minutes: '',

    inOnly_months: { months: '', weeks: '', days: '' },
    inOnly_weeks: { weeks: '', days: '', hours: '' },
    inOnly_days: { days: '', hours: '', minutes: '' },
    inOnly_hours: { hours: '', minutes: '', seconds: '' },

    inOnly_minutes: { minutes: '', seconds: '' },
    inOnly_seconds: { seconds: '', milliseconds: '' },

    inOnly_milliseconds: ''
  }

  public age_in_text = {
    age: '',

    inOnly_months: '',
    inOnly_weeks: '',
    inOnly_days: '',
    inOnly_hours: '',

    inOnly_minutes: '',
    inOnly_seconds: '',

    inOnly_milliseconds: ''
  }

  // 
  // |`````````````````````````````````````````````````````````````````|
  // | The below values are taken from various source of internet      |
  // | These are not accurate numbers, rather these are average values |
  // | Among a large group of people                                   |
  // |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
  // 
  // |`````````````````````````````````````````````````````````````````|
  // | To get the actual value is to allow user to give their values   |
  // |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
  // 
  private defaultValues = {
    breath_perMinute_inNumber: 16, // 16 times per minute

    sleep_perDay_inHour: 8, // 8 hours per day

    eatAndDrinkTime_perDay_inHour: 1.11667, // 1.11667 hours per day

    heartBeat_perMinute_inNumber: 70, // 70 times per minute

    foodEaten_perDay_inKg: 1.81437, // 1.81437 kg per day 

    loughs_perDay_inNumber: 17 // 17 times per day
  }

  // 
  public facts = {
    breath: 0,
    sleep: {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,

      // Only In months, days, years
      inOnly_months: { months: 0, weeks: 0, days: 0 },
      inOnly_weeks: { weeks: 0, days: 0, hours: 0 },
      inOnly_days: { days: 0, hours: 0, minutes: 0 },
      inOnly_hours: { hours: 0, minutes: 0, seconds: 0 },

      inOnly_minutes: { minutes: 0, seconds: 0 },
      inOnly_seconds: { seconds: 0, milliseconds: 0 },
      inOnly_milliseconds: 0

      // 
      // TODO: In Future Here I will add sleep in only hours, months, weeks, days.... all
    },
    heart_beat: 0,
    food_eaten: { // kg, ton e dekhabo
      kg: 0,
      pound: 0,
      ton: 0
    },
    loughed: 0, // same as sleep

    eat_and_drink: {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,

      // Only In months, days, years
      inOnly_months: { months: 0, weeks: 0, days: 0 },
      inOnly_weeks: { weeks: 0, days: 0, hours: 0 },
      inOnly_days: { days: 0, hours: 0, minutes: 0 },
      inOnly_hours: { hours: 0, minutes: 0, seconds: 0 },

      inOnly_minutes: { minutes: 0, seconds: 0 },
      inOnly_seconds: { seconds: 0, milliseconds: 0 },
      inOnly_milliseconds: 0

      // 
      // TODO: In Future Here I will add sleep in only hours, months, weeks, days.... all
    },

    smartphone_used: 0, // same as sleep
    tv_watched: 0, // same as sleep
  }
  // 
  public facts_str_values = {
    breath: '',
    sleep: {
      years: '',
      months: '',
      days: '',
      hours: '',
      minutes: '',

      // Only In months, days, years
      inOnly_months: { months: '', weeks: '', days: '' },
      inOnly_weeks: { weeks: '', days: '', hours: '' },
      inOnly_days: { days: '', hours: '', minutes: '' },
      inOnly_hours: { hours: '', minutes: '', seconds: '' },

      inOnly_minutes: { minutes: '', seconds: '' },
      inOnly_seconds: { seconds: '', milliseconds: '' },

      // 
      // TODO: In Future Here I will add sleep in only hours, months, weeks, days.... all
    },
    heart_beat: '',
    food_eaten: {
      kg_short: '',
      kg_long: '',
      pound: '',
      ton: ''
    },
    loughed: '',

    eat_and_drink: {
      years: '',
      months: '',
      days: '',
      hours: '',
      minutes: '',

      // Only In months, days, years
      inOnly_months: { months: '', weeks: '', days: '' },
      inOnly_weeks: { weeks: '', days: '', hours: '' },
      inOnly_days: { days: '', hours: '', minutes: '' },
      inOnly_hours: { hours: '', minutes: '', seconds: '' },

      inOnly_minutes: { minutes: '', seconds: '' },
      inOnly_seconds: { seconds: '', milliseconds: '' },

      // 
      // TODO: In Future Here I will add sleep in only hours, months, weeks, days.... all
    },

    smartphone_used: '',
    tv_watched: '',
  }
  // 
  public facts_in_text = {
    breath: '',
    sleep: {
      age: '', // year, month, days, hour, minute

      // Only In months, days, years
      inOnly_months: '',
      inOnly_weeks: '',
      inOnly_days: '',
      inOnly_hours: '',

      inOnly_minutes: '',
      inOnly_seconds: '',
      inOnly_milliseconds: ''

      // 
      // TODO: In Future Here I will add sleep in only hours, months, weeks, days.... all
    },
    heart_beat: '',

    food_eaten: {
      in_kg: '',
      in_pound: '',
      in_ton: ''
    },

    loughed: '',

    eat_and_drink: {
      age: '',

      // Only In months, days, years
      inOnly_months: '',
      inOnly_weeks: '',
      inOnly_days: '',
      inOnly_hours: '',

      inOnly_minutes: '',
      inOnly_seconds: '',
      inOnly_milliseconds: ''

      // 
      // TODO: In Future Here I will add sleep in only hours, months, weeks, days.... all
    },
    smartphone_used: '',
    tv_watched: '',
  }
  // 
  private orbit_periods = {
    earth: 365.26, // 365.26 days = 1 year
    mercury: 87.97, // 87.97 days = 1 year
    venus: 224.70, // 224.70 days = 1 year
    mars: 686.509374, // 686.509374 days = 1 year
    jupitar: 4329.854475, // 4329.854475 days = 1 year
    saturn: 10748.33677, // 10748.33677 days = 1 year
    uranus: 30666.14879, // 30666.14879 days = 1 year
    neptune: 60148.8318, // 60148.8318 days = 1 year
    pluto: 90491.03725, // 90491.03725 days = 1 year

  }
  private age_on_other_planet = {
    // earth: 365.26, // 365.26 days = 1 year
    mercury: 0, // 87.97 days = 1 year
    venus: 0, // 224.70 days = 1 year
    mars: 0, // 686.509374 days = 1 year
    jupitar: 0, // 4329.854475 days = 1 year
    saturn: 0, // 10748.33677 days = 1 year
    uranus: 0, // 30666.14879 days = 1 year
    neptune: 0, // 60148.8318 days = 1 year
    pluto: 0, // 90491.03725 days = 1 year
  }
  public age_on_other_planet_in_text = {
    // earth: 365.26, // 365.26 days = 1 year
    mercury: '', // 87.97 days = 1 year
    venus: '', // 224.70 days = 1 year
    mars: '', // 686.509374 days = 1 year
    jupitar: '', // 4329.854475 days = 1 year
    saturn: '', // 10748.33677 days = 1 year
    uranus: '', // 30666.14879 days = 1 year
    neptune: '', // 60148.8318 days = 1 year
    pluto: '', // 90491.03725 days = 1 year
  }

  // 
  //#endregion Variables

  // 
  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }
  // 
  ngOnInit() {
    this.formValueChange = this.age_form.valueChanges.subscribe(() => {
      this._showResults = false;
    });

    this._show_from_timeField = false;
    this._show_to_timeField = false;
    this._showResults = false;
  }
  // 
  ngOnDestroy() {
    this.formValueChange.unsubscribe();

  }

  // Age Form
  public age_form = this.formBuilder.group({
    from_date: ['', Validators.required],
    from_hour: [''],
    from_minute: [''],
    from_amPm: ['am'],

    to_date: [moment(new Date())],
    to_hour: [''],
    to_minute: [''],
    to_amPm: ['am'],

  });

  // 
  // All the getters for age_form
  //#region getters for age_form
  get from_date() {
    return this.age_form.get('from_date');
  }
  get from_hour() {
    return this.age_form.get('from_hour');
  }
  get from_minute() {
    return this.age_form.get('from_minute');
  }
  get from_amPm() {
    return this.age_form.get('from_amPm')
  }
  // 
  get to_date() {
    return this.age_form.get('to_date');
  }
  get to_hour() {
    return this.age_form.get('to_hour');
  }
  get to_minute() {
    return this.age_form.get('to_minute');
  }
  get to_amPm() {
    return this.age_form.get('to_amPm')
  }
  // 
  //#endregion getters for age_form
  // 

  // 
  // Shows from_time fields
  Show_from_timeField() {
    if (this._show_from_timeField === false) {
      // Set _show_from_timeField to true and add validators
      this._show_from_timeField = true;

      this.from_hour.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(12),
        Validators.pattern('[0-9]|2')
      ]);

      this.from_minute.setValidators([
        Validators.required,
        Validators.min(0),
        Validators.max(59),
        Validators.pattern('[0-9]|2')
      ]);

      this.from_amPm.setValidators([Validators.required]);

    }//IF
    else {
      // Set _show_from_timeField to false and clear validators
      this._show_from_timeField = false;

      this.from_hour.clearValidators();
      this.from_minute.clearValidators();
      this.from_amPm.clearValidators();

    }//ELSE

    // Update Validators
    this.from_hour.updateValueAndValidity();
    this.from_minute.updateValueAndValidity();
    this.from_amPm.updateValueAndValidity();
  }
  // 

  // 
  // Shows to_time fields
  Show_to_timeField() {
    if (this._show_to_timeField === false) {
      // Set _show_to_timeField to true and add validators
      this._show_to_timeField = true;

      this.to_hour.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(12),
        Validators.pattern('[0-9]|2')
      ]);

      this.to_minute.setValidators([
        Validators.required,
        Validators.min(0),
        Validators.max(59),
        Validators.pattern('[0-9]|2')
      ]);

      this.to_amPm.setValidators([Validators.required]);

    }//IF
    else {
      // Set _show_to_timeField to false and clear validators
      this._show_to_timeField = false;

      this.to_hour.clearValidators();
      this.to_minute.clearValidators();
      this.to_amPm.clearValidators();

    }//ELSE

    // Update Validators
    this.to_hour.updateValueAndValidity();
    this.to_minute.updateValueAndValidity();
    this.to_amPm.updateValueAndValidity();
  }
  // 

  // 
  // from_field er time value set kore automatically
  Set_from_timeFieldValue() {

    let [_hour, _minute, _amPm] = this.CurrentTime()

    this.age_form.patchValue({
      from_hour: _hour,
      from_minute: _minute,
      from_amPm: _amPm
    });

    // console.log(`Current Time 12: Hour: ${this.from_hour.value} ${this.from_minute.value} minutes ${this.from_amPm.value}`);

  }
  // 

  // 
  // to_field er time value set kore automatically
  Set_to_timeFieldValue() {

    let [_hour, _minute, _amPm] = this.CurrentTime()

    this.age_form.patchValue({
      to_hour: _hour,
      to_minute: _minute,
      to_amPm: _amPm
    });

    // console.log(`Current Time 12: Hour: ${this.to_hour.value} ${this.to_minute.value} minutes ${this.to_amPm.value}`);

  }
  // 

  // 
  // Gets current time and returns hour min in 12 hour time format
  CurrentTime() {
    let _now = moment(new Date());
    let _hour = _now.hours();
    let _amPm: string;

    // Convert 24 Hour time to 12 hour time
    if (_hour == 0) {
      _amPm = 'am';
      _hour = 12;
    }
    else if (_hour < 12) {
      _amPm = 'am';
      _hour = _hour;
    }
    else if (_hour == 12) {
      _amPm = 'pm';
      _hour = 12;
    }
    else if (_hour > 12) {
      _amPm = 'pm';
      _hour = _hour - 12;
    }

    //#region debug using console log
    // console.log(`
    // Current Time 24: Hour: ${_now.hours()} ${_now.minutes()} minutes
    // Full Date: ${_now}

    // Current Time 12: Hour: ${_hour} ${_now.minutes()} minutes
    // Full Date: ${_now.format('LLLL')}
    // `);
    //#endregion debug using console log

    // Return current hour, minute and am/pm value
    return [_hour, _now.minutes(), _amPm];
  }
  // 


  // 
  // When form is submitted calculate age, facts, age in other planets
  onSubmit() {
    // 
    // Calculate age if the age_form is valid else show error in matSnackbar
    if (this.age_form.valid) {
      console.log('Form Submitted');
      console.log(`
      From Date value: ${this.from_date.value} 
      HH:MM AM/PM:     ${this.from_hour.value}:${this.from_minute?.value} ${this.from_amPm?.value}

      To Date value:   ${this.to_date.value}
      HH:MM AM/PM:     ${this.to_hour.value}:${this.to_minute?.value} ${this.to_amPm?.value}`);

      // 
      // Variables
      //#region Variables
      let _from_date, _to_date;
      let _age_values;
      //#endregion Variables
      // 

      // 
      //#region From Date
      // 
      // Get the from_date value and pass into moment()
      _from_date = moment(this.from_date.value);
      //
      // When Time is given 
      if (this._show_from_timeField === true) {
        // 
        // Set the user given hour, min, amPm value
        // 
        _from_date.set({
          hour: this.ConvertTo24HourFormat(this.from_hour.value, this.from_amPm.value),
          minute: this.from_minute.value,
          second: 0,
          milisecond: 0
        });
      }
      else {
        // 
        // When time is not given set hour, min, sec, milisec to 0
        //
        _from_date.set({
          hour: 0,
          minute: 0,
          second: 0,
          milisecond: 0
        });
      }
      // 
      //#endregion From Date

      // 
      //#region To Date
      // 
      // Check if To Date value is given or not
      if (this.to_date.value === null) {
        // 
        _to_date = moment(new Date());
        // 
        // This will take current time automatically
        // No need to set hour, min, sec, milisec value

        console.log(`
        To Date: when It's null: ${_to_date}`);
      }
      else {
        _to_date = moment(this.to_date.value);
      }

      // 
      // Now check if the the time field for to date is given or not
      if (this._show_to_timeField === true) {
        // 
        // Set the user given hour, min, amPm value
        // 
        _to_date.set({
          hour: this.ConvertTo24HourFormat(this.to_hour.value, this.to_amPm.value),
          minute: this.to_minute.value,
          second: 0,
          milisecond: 0,
        });
      }
      else {
        // 
        // Set current local hour, min, sec to to_date
        // 
        let _current_time = new Date();
        _to_date.set({
          hour: _current_time.getHours(),
          minute: _current_time.getMinutes(),
          second: 0,
          milisecond: 0,
        });
      }

      console.log(`
      Final From Date: ${_from_date}
      Final To Date:   ${_to_date}`);
      // 
      //#endregion To Date

      // 
      //#region Calculate Age, facts, age on other planets

      // Get Age Values
      // 
      _age_values = moment.duration(moment(_to_date, "DD MMM YYYY HH:MM:ss").diff(moment(_from_date, "DD MMM YYYY HH:MM:ss")));
      // Get all the age and facts values
      this.age = this.Calculate_Time_values(_age_values);

      this.age_in_text = this.Format_inText(this.age);

      // Facts: Breath, Eat and Drink time etc.
      this.GetAll_theFacts(_age_values);

      this.AgeOnOtherPlanets(_age_values);

      //#endregion Calculate Age, facts, age on other planets

      // 
      // Set the showResults value true to render results in html
      this._showResults = true;

      // 
      // Results in Console
      // 
      console.log(`

      Your Age is:     ${this.age.years} ${this.age_str_values.years} ${this.age.months} ${this.age_str_values.months} ${this.age.days} ${this.age_str_values.days}

      IN MONTHS:       ${this.age.inOnly_months.months} ${this.age_str_values.inOnly_months.months} ${this.age.inOnly_months.weeks} ${this.age_str_values.inOnly_months.weeks} ${this.age.inOnly_months.days} ${this.age_str_values.inOnly_months.days}

      IN WEEKS:        ${this.age.inOnly_weeks.weeks} ${this.age_str_values.inOnly_weeks.weeks} ${this.age.inOnly_weeks.days} ${this.age_str_values.inOnly_weeks.days} ${this.age.inOnly_weeks.hours} ${this.age_str_values.inOnly_weeks.hours}

      IN DAYS:         ${this.age.inOnly_days.days} ${this.age_str_values.inOnly_days.days} ${this.age.inOnly_days.hours} ${this.age_str_values.inOnly_days.hours} ${this.age.inOnly_days.minutes} ${this.age_str_values.inOnly_days.minutes}

      IN HOURS:        ${this.age.inOnly_hours.hours} ${this.age_str_values.inOnly_hours.hours} ${this.age.inOnly_hours.minutes} ${this.age_str_values.inOnly_hours.minutes} ${this.age.inOnly_hours.seconds} ${this.age_str_values.inOnly_hours.seconds}

      IN MINUTES:      ${this.age.inOnly_minutes.minutes} ${this.age_str_values.inOnly_minutes.minutes}  ${this.age.inOnly_minutes.seconds} ${this.age_str_values.inOnly_minutes.seconds}

      IN SECONDS:      ${this.age.inOnly_seconds.seconds} ${this.age_str_values.inOnly_seconds.seconds} ${this.age.inOnly_seconds.milliseconds} ${this.age_str_values.inOnly_seconds.milliseconds}

      IN MILLISECONDS: ${this.age.inOnly_milliseconds} ${this.age_str_values.inOnly_milliseconds}`);

    }//if
    else {
      // 
      // Show error in matSnackbar
      // snackBar.open(message, action, {other optons});
      // 
      this.snackBar.open("Please Fill All The Required Fields", "Dissmiss", {
        duration: 2500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }//else

  }//onSubmit
  // 

  // 
  // Converts 12 hour time to 24 hour time format
  ConvertTo24HourFormat(_hour, _amPm) {
    // 
    if (_amPm === 'pm') {
      // 
      if (_hour === 12) {
        return _hour; // dupur 12:00 ta theke dupur 12:59 porjonto
      }
      else {
        return _hour + 12; // dupur 1:00 ta theke rat 11:59 porjonto
      }
      // 
    }// first if(_amPm==='pm')
    else if (_amPm === 'am') {
      // 
      if (_hour === 12) {
        return 0; // rat 12:00 ta theke dupur 12:59 porjonto
      }
      else {
        return _hour; // rat 1 ta theke dupur 11:59 ta porjonto
      }
      // 
    }


  }
  //


  // 
  // Checks if a value is singular or plural and returns corresponding text
  SingularOrPlural(_value, _singular: string, _plural: string) {
    if (_value > 1) {
      return _plural;
    }
    else {
      return _singular;
    }
  }
  // 

  // 
  // Resets all the form fields values
  ResetAllFormFields() {
    // 
    // Reset from_date fields
    // 
    this.age_form.patchValue({
      from_date: ''
    });
    if (this._show_from_timeField === true) {
      this.age_form.patchValue({
        from_hour: '',
        from_minute: '',
        from_amPm: 'am'
      });
    }

    // 
    // Reset to_date fields
    // 
    this.age_form.patchValue({
      to_date: moment(new Date())
    });
    if (this._show_to_timeField === true) {
      this.age_form.patchValue({
        to_hour: '',
        to_minute: '',
        to_amPm: 'am'
      });
    }
  }
  //


  // 
  // Get All the Facts
  GetAll_theFacts(_age_values) {
    // 
    this.facts.breath = Math.round(_age_values.asMinutes() * this.defaultValues.breath_perMinute_inNumber);
    // 
    let _hours_slept = _age_values.asDays() * this.defaultValues.sleep_perDay_inHour;

    // 
    // Calculate Sleep Values
    this.GetSleepValues(_hours_slept);
    // 

    // 
    // Get Heart Beat
    this.facts.heart_beat = Math.round(_age_values.asMinutes() * this.defaultValues.heartBeat_perMinute_inNumber);
    // 


    // Food Eaten
    this.GetFoodEatenValues(_age_values);


    // 
    // Get Loughs
    this.facts.loughed = Math.round(_age_values.asDays() * this.defaultValues.loughs_perDay_inNumber);

    // 
    // Get Eat and Drink
    let _eat_and_drink_in_hour = _age_values.asDays() * this.defaultValues.eatAndDrinkTime_perDay_inHour;
    this.GetEatAndDrinkValues(_eat_and_drink_in_hour);


    // 
    // Now Format the text for facts_in_text
    // 
    // This function must be after FormatString_forSleep(this.facts)
    this.FormatFacts_inText();
    //


    console.log(`
    Breath: ${this.facts.breath.toLocaleString()} times
    
    |-------------------------------------------|
    | Sleep:                                    |
    |-------------------------------------------|
    Slept: ${this.facts_in_text.sleep.age}
    Only Months: ${this.facts_in_text.sleep.inOnly_months}
    Only Weeks: ${this.facts_in_text.sleep.inOnly_weeks}
    Only Days: ${this.facts_in_text.sleep.inOnly_days}
    Only Hours: ${this.facts_in_text.sleep.inOnly_hours}
    Only Hours: ${this.facts_in_text.sleep.inOnly_minutes}
    `);

  }
  // 

  // 
  // get All the Sleep values
  GetSleepValues(_hours_slept: number) {
    let _start_date = moment(new Date(), 'YYYY-MM-DD HH:MM:ss');
    let _end_date = moment(_start_date).add(_hours_slept, 'hours');
    let _sleep_time = moment.duration(_end_date.diff(_start_date));

    this.facts.sleep = this.Calculate_Time_values(_sleep_time);

  }
  // 

  // 
  // Get All the values for Eat and drink values
  GetEatAndDrinkValues(_eat_and_drink_in_hour: number) {
    let _start_date = moment(new Date(), 'YYYY-MM-DD HH:MM:ss');
    let _end_date = moment(_start_date).add(_eat_and_drink_in_hour, 'hours');
    let _time_spent_in_eat_drink_time = moment.duration(_end_date.diff(_start_date));

    // 
    // in years, months, days, hours and minutes

    this.facts.eat_and_drink = this.Calculate_Time_values(_time_spent_in_eat_drink_time)

  }
  // 


  // 
  // Get All the values for food eat and drink 
  GetFoodEatenValues(_age_values) {
    // 
    this.facts.food_eaten.kg = _age_values.asDays() * this.defaultValues.foodEaten_perDay_inKg;

    // 1 kg = 2.204623 pounds
    this.facts.food_eaten.pound = this.facts.food_eaten.kg * 2.204623;

    // 1 kg = 0.00110231 metric ton
    this.facts.food_eaten.ton = this.facts.food_eaten.kg * 0.00110231;
  }



  // 
  // Foramt All the facts into time values
  FormatFacts_inText() {
    // 
    this.facts_in_text.breath = `${this.facts.breath.toLocaleString()} ${this.SingularOrPlural(this.facts.breath, 'time', 'times')}`;
    // 
    // 
    this.facts_in_text.sleep = this.Format_inText(this.facts.sleep);
    // 
    // 
    this.facts_in_text.heart_beat = `${this.facts.heart_beat.toLocaleString()} ${this.SingularOrPlural(this.facts.heart_beat, 'time', 'times')}`;
    // 
    // 
    this.facts_in_text.food_eaten.in_kg = `${this.facts.food_eaten.kg.toLocaleString()} ${this.SingularOrPlural(this.facts.food_eaten.kg, 'kilogram', 'kilograms')}`;
    // 
    this.facts_in_text.food_eaten.in_pound = `${this.facts.food_eaten.pound.toLocaleString()} ${this.SingularOrPlural(this.facts.food_eaten.pound, 'pound', 'pounds')}`;
    // 
    this.facts_in_text.food_eaten.in_ton = `${this.facts.food_eaten.ton.toLocaleString()} ${this.SingularOrPlural(this.facts.food_eaten.ton, 'Metric ton', 'Metric tons')}`;
    // 
    // 
    this.facts_in_text.loughed = `${this.facts.loughed.toLocaleString()} ${this.SingularOrPlural(this.facts.loughed, 'time', 'times')}`;
    // 
    // 
    this.facts_in_text.eat_and_drink = this.Format_inText(this.facts.eat_and_drink);
  }
  //  


  // 
  // Get time values: year, month, days etc
  Calculate_Time_values(_age_values) {
    let values = {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,

      inOnly_months: { months: 0, weeks: 0, days: 0 },
      inOnly_weeks: { weeks: 0, days: 0, hours: 0 },
      inOnly_days: { days: 0, hours: 0, minutes: 0 },
      inOnly_hours: { hours: 0, minutes: 0, seconds: 0 },

      inOnly_minutes: { minutes: 0, seconds: 0 },
      inOnly_seconds: { seconds: 0, milliseconds: 0 },

      inOnly_milliseconds: 0
    }
    values.years = _age_values.years();
    values.months = _age_values.months();
    values.days = _age_values.days();
    values.hours = _age_values.hours();
    values.minutes = _age_values.minutes();
    // 

    // 
    // _age_values.asMonths() % 1 will return the value after decimal point 
    // EX. 8.23045 = .23045
    // 
    values.inOnly_months.months = Math.floor(_age_values.asMonths());
    values.inOnly_months.weeks = (_age_values.asMonths() % 1) * 4.34524;
    // console.log(`in months [week]: ${values.inOnly_months.weeks}`);
    values.inOnly_months.days = Math.floor((values.inOnly_months.weeks % 1) * 7);
    values.inOnly_months.weeks = Math.floor(values.inOnly_months.weeks);


    // 
    values.inOnly_weeks.weeks = Math.floor(_age_values.asWeeks());
    values.inOnly_weeks.days = (_age_values.asWeeks() % 1) * 7;
    values.inOnly_weeks.hours = Math.floor((values.inOnly_weeks.days % 1) * 24);
    values.inOnly_weeks.days = Math.floor(values.inOnly_weeks.days);

    // 
    values.inOnly_days.days = Math.floor(_age_values.asDays());
    values.inOnly_days.hours = (_age_values.asDays() % 1) * 24;
    values.inOnly_days.minutes = Math.floor((values.inOnly_days.hours % 1) * 60);
    values.inOnly_days.hours = Math.floor(values.inOnly_days.hours);
    // 
    values.inOnly_hours.hours = Math.floor(_age_values.asHours());
    values.inOnly_hours.minutes = (_age_values.asHours() % 1) * 60;
    values.inOnly_hours.seconds = Math.floor((values.inOnly_hours.minutes % 1) * 60);
    values.inOnly_hours.minutes = Math.floor(values.inOnly_hours.minutes);
    // 

    values.inOnly_minutes.minutes = Math.floor(_age_values.asMinutes());
    values.inOnly_minutes.seconds = Math.floor((_age_values.asMinutes() % 1) * 60);
    //  
    values.inOnly_seconds.seconds = Math.floor(_age_values.asSeconds());
    values.inOnly_seconds.milliseconds = Math.floor((_age_values.asSeconds() % 1) * 1000);
    // 
    values.inOnly_milliseconds = Math.floor(_age_values.asMilliseconds());

    return values;
  }

  // 
  // Format time values into text
  Format_inText(_age_values) {
    // 
    let _in_text = {
      age: '',

      inOnly_months: '',
      inOnly_weeks: '',
      inOnly_days: '',
      inOnly_hours: '',

      inOnly_minutes: '',
      inOnly_seconds: '',

      inOnly_milliseconds: ''
    }

    _in_text.age = `${_age_values.years.toLocaleString()} ${this.SingularOrPlural(_age_values.years, 'year', 'years')} ${this.age.months.toLocaleString()} ${this.SingularOrPlural(_age_values.months, 'month', 'months')} ${this.age.days.toLocaleString()} ${this.SingularOrPlural(_age_values.days, 'day', 'days')} ${this.age.hours} ${this.SingularOrPlural(_age_values.hours, 'hour', 'hours')} ${this.age.minutes} ${this.SingularOrPlural(_age_values.minutes, 'minute', 'minutes')}`;




    _in_text.inOnly_months = `${this.age.inOnly_months.months.toLocaleString()} ${this.SingularOrPlural(_age_values.inOnly_months.months, 'month', 'months')} ${this.age.inOnly_months.weeks.toLocaleString()} ${this.SingularOrPlural(_age_values.inOnly_months.weeks, 'week', 'weeks')} ${this.age.inOnly_months.days.toLocaleString()} ${this.SingularOrPlural(_age_values.inOnly_months.days, 'day', 'days')}`;



    _in_text.inOnly_weeks = `${this.age.inOnly_weeks.weeks.toLocaleString()} ${this.SingularOrPlural(_age_values.inOnly_weeks.weeks, 'week', 'weeks')} ${this.age.inOnly_weeks.days.toLocaleString()} ${this.SingularOrPlural(_age_values.inOnly_weeks.days, 'day', 'days')} ${this.age.inOnly_weeks.hours.toLocaleString()} ${this.SingularOrPlural(_age_values.inOnly_weeks.hours, 'hour', 'hours')}`;




    _in_text.inOnly_days = `${this.age.inOnly_days.days.toLocaleString()} ${this.SingularOrPlural(_age_values.inOnly_days.days, 'day', 'days')} ${this.age.inOnly_days.hours.toLocaleString()} ${this.SingularOrPlural(_age_values.inOnly_days.hours, 'hour', 'hours')} ${this.age.inOnly_days.minutes.toLocaleString()} ${this.SingularOrPlural(_age_values.inOnly_days.minutes, 'minute', 'minutes')}`;




    _in_text.inOnly_hours = `${this.age.inOnly_hours.hours.toLocaleString()} ${this.SingularOrPlural(_age_values.inOnly_hours.hours, 'hour', 'hours')} ${this.age.inOnly_hours.minutes.toLocaleString()} ${this.SingularOrPlural(_age_values.inOnly_hours.minutes, 'minute', 'minutes')} ${this.age.inOnly_hours.seconds.toLocaleString()} ${this.SingularOrPlural(_age_values.inOnly_hours.seconds, 'second', 'seconds')}`;




    _in_text.inOnly_minutes = `${this.age.inOnly_minutes.minutes.toLocaleString()} ${this.SingularOrPlural(_age_values.inOnly_minutes.minutes, 'minute', 'minutes')} 
    ${this.age.inOnly_minutes.seconds.toLocaleString()} ${this.SingularOrPlural(_age_values.inOnly_minutes.seconds, 'second', 'seconds')}`;




    _in_text.inOnly_seconds = `${this.age.inOnly_seconds.seconds.toLocaleString()} ${this.SingularOrPlural(_age_values.inOnly_seconds.seconds, 'second', 'seconds')} 
    ${this.age.inOnly_seconds.milliseconds.toLocaleString()} ${this.SingularOrPlural(_age_values.inOnly_seconds.milliseconds, 'millisecond', 'milliseconds')}`;



    _in_text.inOnly_milliseconds = `${this.age.inOnly_milliseconds.toLocaleString()} ${this.SingularOrPlural(_age_values.inOnly_milliseconds, 'millisecond', 'milliseconds')}`;
    // 

    return _in_text;
  }


  // 
  // Age on other planets
  AgeOnOtherPlanets(_age_values) {

    this.age_on_other_planet.mercury = _age_values.asDays() / this.orbit_periods.mercury;

    this.age_on_other_planet.venus = _age_values.asDays() / this.orbit_periods.venus;

    this.age_on_other_planet.mars = _age_values.asDays() / this.orbit_periods.mars;

    this.age_on_other_planet.jupitar = _age_values.asDays() / this.orbit_periods.jupitar;

    this.age_on_other_planet.saturn = _age_values.asDays() / this.orbit_periods.saturn;

    this.age_on_other_planet.uranus = _age_values.asDays() / this.orbit_periods.uranus;

    this.age_on_other_planet.neptune = _age_values.asDays() / this.orbit_periods.neptune;

    this.age_on_other_planet.pluto = _age_values.asDays() / this.orbit_periods.pluto;



    this.FormatAgeOnOtherPlanets_intText(this.age_on_other_planet);


  }


  // 
  // Formats text for age on other planets
  FormatAgeOnOtherPlanets_intText(_age_on_other_planet) {
    // 
    this.age_on_other_planet_in_text.mercury = `${_age_on_other_planet.mercury.toLocaleString()} ${this.SingularOrPlural(_age_on_other_planet.mercury, 'year', 'years')}`;

    this.age_on_other_planet_in_text.venus = `${_age_on_other_planet.venus.toLocaleString()} ${this.SingularOrPlural(_age_on_other_planet.venus, 'year', 'years')}`;

    this.age_on_other_planet_in_text.mars = `${_age_on_other_planet.mars.toLocaleString()} ${this.SingularOrPlural(_age_on_other_planet.mars, 'year', 'years')}`;

    this.age_on_other_planet_in_text.jupitar = `${_age_on_other_planet.jupitar.toLocaleString()} ${this.SingularOrPlural(_age_on_other_planet.jupitar, 'year', 'years')}`;

    this.age_on_other_planet_in_text.saturn = `${_age_on_other_planet.saturn.toLocaleString()} ${this.SingularOrPlural(_age_on_other_planet.saturn, 'year', 'years')}`;

    this.age_on_other_planet_in_text.uranus = `${_age_on_other_planet.uranus.toLocaleString()} ${this.SingularOrPlural(_age_on_other_planet.uranus, 'year', 'years')}`;

    this.age_on_other_planet_in_text.neptune = `${_age_on_other_planet.neptune.toLocaleString()} ${this.SingularOrPlural(_age_on_other_planet.neptune, 'year', 'years')}`;

    this.age_on_other_planet_in_text.pluto = `${_age_on_other_planet.pluto.toLocaleString()} ${this.SingularOrPlural(_age_on_other_planet.pluto, 'year', 'years')}`;
    // 
  }


  // 
}// End of class
