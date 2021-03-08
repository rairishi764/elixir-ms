import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import Appointment from './appointment';
import { AppointmentService } from './appointment.service';
import {Router} from '@angular/router';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import Specialization  from '../specialization/specialization';
import Consultants from '../consultants/consultants'
import Patients from '../patients/patients';
//Calendar
import { ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
}

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})

export class AppointmentComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  activeDayIsOpen: boolean = true;


  public location = '' ;
  appointment: Appointment[];
  objedit: {[k: string]: any} = {};
  objadd:{[k: string]: any} = {};
  dtOptions: DataTables.Settings = {};
  dept: Specialization[];
  consultants: Consultants[];
  patients: Patients[];
  registerForm: FormGroup;
  submitted = false;
  consultant: Consultants=null;
   // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<Appointment> = new Subject();

  constructor(private modal: NgbModal, public router: Router,private fb: FormBuilder, private service: AppointmentService, public _router : Router)
  {
    this.location = router.url;
    this.createForm();

  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }








  get f() { return this.registerForm.controls; }

  createForm() {
    this.registerForm = this.fb.group({
      patient:['', Validators.required ],
      specialization: ['', Validators.required ],
      consultant: ['', Validators.required ],
      date: ['', Validators.required ],
      time: ['', Validators.required ],
      info: ['', Validators.required ],
     });
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.service.listSpecialization().subscribe((data: Specialization[]) => {
      this.dept = data;
    });

    this.service.listConsultants().subscribe((data: Consultants[]) => {
      this.consultants = data;
      this.consultant = this.consultants[0]
    });

    this.service.listPatients().subscribe((data: Patients[]) => {
      this.patients = data;
    });

    this.service.listAll().subscribe((data: Appointment[]) => {
        this.appointment = data;
        var index=0;
        for(let obj of this.appointment){

          for(let dep of this.dept){
            if(dep.id==obj.specialization_id)
            this.appointment[index].department_name = dep.name;
          }

          for(let consultant of this.consultants){
            if(obj.consultant_id==consultant.id)
            this.appointment[index].consultant = consultant.name;
          }

          for(let patient of this.patients){
            if(obj.patient_id==patient.id)
            this.appointment[index].patient=patient.name;
          }
          index++;
        }
          // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
    });
  }

  consultantFilter(){
    if(this.registerForm.value.specialization==""){
      this.service.listConsultants().subscribe((data: Consultants[]) => {
        this.consultants = data;
      });
    }

    for(let item of this.consultants){
      if(item.name==this.registerForm.value.consultant){
        for(let obj1 of this.dept){
          if(item.department_id==obj1.id){
            this.registerForm.get("specialization").setValue(obj1.name);
            this.consultant=item;
            this.consultant.workhrsJson = JSON.parse(this.consultant.workhrs);
            //alert(this.consultant.workhrs)
          }
        }
      }
    }
  }

  specializationFilter(){
     var filteredConsultant=[];
      for(let item of this.dept){
        if(this.registerForm.value.specialization == item.name){
          for(let obj of this.consultants){
              if(obj.department_id==item.id){
                filteredConsultant.push(obj)
              }
          }
        }
      }
      this.consultants = filteredConsultant
  }


  add() {
    for(let obj of this.consultants){
      if(this.registerForm.value.consultant==obj.name)
      this.registerForm.value.consultant_id = obj.id
    }

    for(let obj of this.patients){
      if(this.registerForm.value.patient==obj.name)
      this.registerForm.value.patient_id = obj.id

    }

    for(let obj of this.dept){
      if(this.registerForm.value.specialization==obj.name)
      this.registerForm.value.specialization_id = obj.id
    }

    alert(JSON.stringify(this.registerForm.value));
    this.service.add(this.registerForm.value);
  }

  updateview(obj){
    this.objedit=obj;
  }

  update(obj){
  //  this.service.update(obj)
  alert(obj);

  }

  remove(id){
    if (confirm("Are you sure you want to delete") == true) {
    this.service.remove(id)
    this.dtTrigger.unsubscribe();
    this.ngOnInit()
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
}

}

