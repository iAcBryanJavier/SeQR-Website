import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { map } from 'rxjs/operators';
import * as Chart from 'chart.js'
import { ChartConfiguration, ChartDataset, ChartOptions } from 'chart.js';


@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.css']
})

export class DataAnalysisComponent implements OnInit {
  
  public courses: any = [];
  public students: any = [];
  public totalStudents: number = 0;
  public totalMales: number = 0;
  public totalFemales: number = 0;
  

  public courseCounts: any = {};

  public BSEMC: number = 0;
  public BSIT: number = 0;
  public BSCS: number = 0;
  public BSANIMATION: number = 0;
  public BSMAD: number = 0;
  public BSFD: number = 0;
  public BSFILM: number = 0;
  public BAMUSIC: number = 0;
  public BSPSYCH: number = 0;
  public BSACCT: number = 0;
  public selectDropdown = document.getElementById('select-dropdown');
  public selectedCourse: string = '';
  public courseStudentNum: number = 0;

  public barChartLegend = true;
  public barChartPlugins = [];

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  
  public pieChartLabels = [ [ 'BSCEM' ], [ 'BSIT' ], ['BSCS'], ['BSANIMATION'] , ['BSMAD'], ['BSFD'], ['BSFILM'], ['BAMUSIC'], ['BSPSYCH'], ['BSACCT']];
  public pieChartDatasets: ChartDataset<'pie', number[]>[] = [];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  
  public barChartData: ChartConfiguration<'bar'>['data'];

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
  constructor(private db: DatabaseService) { 
    this.barChartData = {
      labels: ['Overall Students'],
      datasets: [
        { data: [0], label: 'Total Students' },
        { data: [0], label: 'Female' },
        { data: [0], label: 'Male' }
      ]
    };
  }

  ngOnInit(): void {
    this.db.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  
    this.db.getStudent().subscribe(students => {
      this.students = students;
      this.totalStudents = this.students.length;
  
      this.db.getStudentsByGender('Male').subscribe(count => {
        const genderCounts: {males: number, females: number} = count;
        this.totalMales = genderCounts.males;
  
        this.db.getStudentsByGender('Female').subscribe(count => {
          const genderCounts: {males: number, females: number} = count;
          this.totalFemales = genderCounts.females;
  
          this.pieChartDatasets = [{
            data: [this.totalStudents, this.totalMales, this.totalFemales]
          }];

          this.barChartData = {
            labels: ['Overall Students'],
            datasets: [
              { data: [this.totalStudents], label: 'Total Students' },
              { data: [this.totalFemales], label: 'Female' },
              { data: [this.totalMales], label: 'Male' }
            ]
          };
  
          console.log(this.pieChartDatasets);
        });
      });
    });
  }
           

  

 onCourseSelected(selectedCourse: string) {
  
  this.db.getStudentsByCourse(this.selectedCourse).subscribe((count: { [key: string]: number }) => {
    const courseCounts: { [key: string]: number } = count;

    if (this.selectedCourse === 'Bachelor of Science in Entertainment and Multimedia Computing') {
      this.courseCounts = courseCounts['BSEMC'];
      console.log(this.courseCounts);
      return courseCounts;
    } else if (this.selectedCourse === 'Bachelor of Science in Information Technology') {
      console.log(selectedCourse)
      this.courseCounts = courseCounts['BSIT'];
      console.log(this.courseCounts);
      return courseCounts;
    } else if (this.selectedCourse === 'Bachelor of Science in Computer Science') {
      console.log(selectedCourse)
      this.courseCounts = courseCounts['BSCS'];
      console.log(this.courseCounts);
      return courseCounts;
    } else if (this.selectedCourse === 'Bachelor of Science in Animation') {
      this.courseCounts = courseCounts['BSANIMATION'];
      console.log(this.courseCounts);
      return courseCounts;
    } else if (this.selectedCourse === 'Bachelor of Arts in Multimedia Arts and Design') {
      this.courseCounts = courseCounts['BSMAD'];
      console.log(this.courseCounts);
      return courseCounts;
    } else if (this.selectedCourse === 'Bachelor of Arts in Fashion Design and Technology') {
      this.courseCounts = courseCounts['BSFD'];
      console.log(this.courseCounts);
      return courseCounts;
    } else if (this.selectedCourse === 'Bachelor of Arts in Film and Visual Effects') {
      this.courseCounts = courseCounts['BSFILM'];
      console.log(this.courseCounts);
      return courseCounts;
    } else if (this.selectedCourse === 'Bachelor of Arts in Music Production and Sound Design') {
      this.courseCounts = courseCounts['BAMUSIC'];
      console.log(this.courseCounts);
      return courseCounts;
    } else if (this.selectedCourse === 'Bachelor of Arts in Psychology') {
      this.courseCounts = courseCounts['BSPSYCH'];
      console.log(this.courseCounts);
      return courseCounts;
    } else if (this.selectedCourse === 'Bachelor of Science in Accountancy') {
      this.courseCounts = courseCounts['BSACCT'];
      console.log(this.courseCounts);
      return courseCounts;
    }

    
    else {
      return 0;
    }
    
  });
}
  
  

  
}






