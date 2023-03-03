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

      this.db.getStudentsByCourse('BSEMC').subscribe(count => {
        const courseCounts: {
          BSEMC: number, BSIT: number, BSCS: number, BSANIMATION: number, 
          BSMAD: number, BSFD: number,  BSFILM: number, BAMUSIC: number, BSPSYCH: number, BSACCT:number} = count;
          this.BSEMC = courseCounts.BSEMC;
          console.log(`Total BSEMC students: ${this.BSEMC}`);
      });

      this.db.getStudentsByCourse('BSIT').subscribe(count => {
        const courseCounts: {
          BSEMC: number, BSIT: number, BSCS: number, BSANIMATION: number, 
          BSMAD: number, BSFD: number,  BSFILM: number, BAMUSIC: number, BSPSYCH: number, BSACCT:number} = count;
          this.BSIT = courseCounts.BSIT;
          console.log(`Total BSIT students: ${this.BSIT}`);
      });

      this.db.getStudentsByCourse('BSCS').subscribe(count => {
        const courseCounts: {
          BSEMC: number, BSIT: number, BSCS: number, BSANIMATION: number, 
          BSMAD: number, BSFD: number,  BSFILM: number, BAMUSIC: number, BSPSYCH: number, BSACCT:number} = count;
          this.BSCS = courseCounts.BSCS;
          console.log(`Total BSCS students: ${this.BSCS}`);
      });

      this.db.getStudentsByCourse('BSANIMATION').subscribe(count => {
        const courseCounts: {
          BSEMC: number, BSIT: number, BSCS: number, BSANIMATION: number, 
          BSMAD: number, BSFD: number,  BSFILM: number, BAMUSIC: number, BSPSYCH: number, BSACCT:number} = count;
          this.BSANIMATION = courseCounts.BSANIMATION;
          console.log(`Total BSANIMATION students: ${this.BSANIMATION}`);
      });

      this.db.getStudentsByCourse('BSMAD').subscribe(count => {
        const courseCounts: {
          BSEMC: number, BSIT: number, BSCS: number, BSANIMATION: number, 
          BSMAD: number, BSFD: number,  BSFILM: number, BAMUSIC: number, BSPSYCH: number, BSACCT:number} = count;
          this.BSMAD = courseCounts.BSMAD;
          console.log(`Total BSMAD students: ${this.BSMAD}`);
      });

      this.db.getStudentsByCourse('BSFD').subscribe(count => {
        const courseCounts: {
          BSEMC: number, BSIT: number, BSCS: number, BSANIMATION: number, 
          BSMAD: number, BSFD: number,  BSFILM: number, BAMUSIC: number, BSPSYCH: number, BSACCT:number} = count;
          this.BSFD = courseCounts.BSFD;
          console.log(`Total BSFD students: ${this.BSFD}`);
      });

      this.db.getStudentsByCourse('BSFILM').subscribe(count => {
        const courseCounts: {
          BSEMC: number, BSIT: number, BSCS: number, BSANIMATION: number, 
          BSMAD: number, BSFD: number,  BSFILM: number, BAMUSIC: number, BSPSYCH: number, BSACCT:number} = count;
          this.BSFILM = courseCounts.BSFILM;
          console.log(`Total BSFILM students: ${this.BSFILM}`);
      });

      this.db.getStudentsByCourse('BAMUSIC').subscribe(count => {
        const courseCounts: {
          BSEMC: number, BSIT: number, BSCS: number, BSANIMATION: number, 
          BSMAD: number, BSFD: number,  BSFILM: number, BAMUSIC: number, BSPSYCH: number, BSACCT:number} = count;
          this.BAMUSIC = courseCounts.BAMUSIC;
          console.log(`Total BAMUSIC students: ${this.BAMUSIC}`);
      });

      this.db.getStudentsByCourse('BSPSYCH').subscribe(count => {
        const courseCounts: {
          BSEMC: number, BSIT: number, BSCS: number, BSANIMATION: number, 
          BSMAD: number, BSFD: number,  BSFILM: number, BAMUSIC: number, BSPSYCH: number, BSACCT:number} = count;
          this.BSPSYCH = courseCounts.BSPSYCH ;
          console.log(`Total BSPSYCH students: ${this.BSPSYCH}`);
      });
  
      this.db.getStudentsByGender('Male').subscribe(count => {
        const genderCounts: {males: number, females: number} = count;
        this.totalMales = genderCounts.males;
  
        this.db.getStudentsByGender('Female').subscribe(count => {
          const genderCounts: {males: number, females: number} = count;
          this.totalFemales = genderCounts.females;
  
          this.pieChartDatasets = [{
            data: [this.BSEMC, this.BSIT, this.BSCS, this.BSCS, this.BSANIMATION, 
            this.BSMAD, this.BSFD, this.BSFILM, this.BAMUSIC, this.BSPSYCH, this.BSACCT]
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
           

  

 
  
  

  
}






