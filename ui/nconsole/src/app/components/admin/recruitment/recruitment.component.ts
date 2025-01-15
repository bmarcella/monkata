import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DFormDirective } from '../../../lib/DformDirective';
import { DTableDirective } from '../../../lib/DtableDirective';
import { DynamicObjectMonkataModule } from '../../../lib/DynamicObjectMonkata.module';
import { ActionType, DTable, DTableHeaderType } from '../../../lib/components/Table/DTable';
import { City, FormModel } from './FormModel';
interface Professional {
  id: number;
  name: string;
  title: string;
  experience: string;
  skills: string[];
  location: string;
  availability: string;
  rating: number;
  status: string;
}

@Component({
  selector: 'app-recruitment',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    DynamicObjectMonkataModule
  ],
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent implements OnInit, AfterViewInit {


  activeTab = 'professionals';
  searchTerm = '';
  selectedSkill = '';
  selectedExperience = '';
  selectedStatus = '';

  @ViewChild(DTableDirective, { static: true }) DTable!: DTableDirective;
  @ViewChild(DFormDirective, { static: true }) DForm!: DFormDirective;


  ngOnInit(): void {
    const c: any  = new  City();
    c.name = "Paris";
    const resp = this.DForm.getDFormComponent<FormModel>("test", FormModel); 
    // i this we are sending data to a field in the form.
    resp.formTemplate.$form.next({
      name: "city",
      values: [c]
    });

    // receive data from the form 
    resp.formTemplate.$submit.subscribe((data: FormModel) => {
      console.log(data);
    });
  }
 
  ngAfterViewInit(): void {
    const  fm: any = new FormModel ();
    fm.id = 1;
    fm.name = "test";
    this.fm.push(fm);
    const t = new DTable<FormModel>("myTable").init([
      {
        key: 'id',
      },
      {
        key: 'name',
      },
      {
        key: 'actions',
        type: DTableHeaderType.ACTION,
        actions : [
          {
            type: ActionType.BUTTON,
            class:"btn btn-primary",
            label: 'Delete',
            icon: 'fa fa-close',
            callback: function (): void {
              throw new Error('Function not implemented.');
            }
          }
        ]
      }
    ], this.fm, {
      class: "table",
      container_class: "table-responsive"
    }, 
    {
      currentPage: 1,
      totalPages: 100
    });
    const component = this.DTable.getDTableComponent<FormModel>(t);
  }

  tabs = [
    { id: 'overview', name: 'Overview', icon: 'bi-grid-1x2' },
    { id: 'professionals', name: 'Professionals', icon: 'bi-person-badge' },
    { id: 'jobs', name: 'Jobs', icon: 'bi-briefcase' },
    { id: 'candidates', name: 'Candidates', icon: 'bi-people' },
    { id: 'interviews', name: 'Interviews', icon: 'bi-calendar-event' },
    { id: 'offers', name: 'Offers', icon: 'bi-file-earmark-text' },
    { id: 'settings', name: 'Settings', icon: 'bi-gear' }
  ];

  fm  : FormModel [] = [];

  professionals: Professional [] = [
    {
      id: 1,
      name: 'John Smith',
      title: 'Senior Software Engineer',
      experience: '8 years',
      skills: ['JavaScript', 'React', 'Node.js'],
      location: 'Paris',
      availability: 'Immediate',
      rating: 4.8,
      status: 'available'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      title: 'UX Designer',
      experience: '5 years',
      skills: ['Figma', 'UI/UX', 'Prototyping'],
      location: 'Lyon',
      availability: '1 month',
      rating: 4.5,
      status: 'interviewing'
    },
    {
      id: 3,
      name: 'Michael Brown',
      title: 'DevOps Engineer',
      experience: '6 years',
      skills: ['AWS', 'Docker', 'Kubernetes'],
      location: 'Marseille',
      availability: '2 weeks',
      rating: 4.2,
      status: 'available'
    }
  ];

  skills = ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'UI/UX', 'DevOps'];
  experienceLevels = ['1-3 years', '3-5 years', '5-8 years', '8+ years'];
  statuses = ['available', 'interviewing', 'hired'];

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  getFilteredProfessionals() {
    return this.professionals.filter(prof => {
      const matchesSearch = prof.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        prof.title.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesSkill = !this.selectedSkill || prof.skills.includes(this.selectedSkill);
      const matchesExperience = !this.selectedExperience || prof.experience.includes(this.selectedExperience);
      const matchesStatus = !this.selectedStatus || prof.status === this.selectedStatus;

      return matchesSearch && matchesSkill && matchesExperience && matchesStatus;
    });
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedSkill = '';
    this.selectedExperience = '';
    this.selectedStatus = '';
  }
}