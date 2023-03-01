import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'
import { DatabaseService } from 'src/app/services/database.service';


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

  public BSEMC: number = 0;
  public BSIT: number = 0;
  public BSCS: number = 0;
  public BSANIMATION: number = 0;
  public BSMAD: number = 0;
  public BSFD: number = 0;
  public BSFILM: number = 0;
  public BAMUSIC: number = 0;

  
  constructor(private db: DatabaseService) { }

  ngOnInit(): void {
    this.db.getCourses().subscribe(courses => {
      this.courses = courses;
      console.log(this.courses);
    });

    this.db.getStudent().subscribe(students => {
      this.students = students;
      this.totalStudents = this.students.length;
      console.log(`Total Students: ${this.totalStudents}`);

      this.db.getStudentsByGender('Male').subscribe(count => {
        const genderCounts: {males: number, females: number} = count;
        this.totalMales = genderCounts.males;
        console.log(`Total Males: ${this.totalMales}`);
      });

      this.db.getStudentsByGender('Female').subscribe(count => {
        const genderCounts: {males: number, females: number} = count;
        this.totalFemales = genderCounts.females;
        console.log(`Total Females: ${this.totalFemales}`);
      });

      this.db.getStudentsByCourse('BSEMC').subscribe(count => {
        const courseCounts: {
          BSEMC: number, BSIT: number, BSCS: number, BSANIMATION: number, 
          BSMAD: number, BSFD: number,  BSFILM: number, BAMUSIC: number} = count;
          this.BSEMC = courseCounts.BSEMC;
          console.log(`Total BSEMC students: ${this.BSEMC}`);
      });

      this.db.getStudentsByCourse('BSIT').subscribe(count => {
        const courseCounts: {
          BSEMC: number, BSIT: number, BSCS: number, BSANIMATION: number, 
          BSMAD: number, BSFD: number,  BSFILM: number, BAMUSIC: number} = count;
          this.BSIT = courseCounts.BSIT;
          console.log(`Total BSIT students: ${this.BSIT}`);
      });

      this.db.getStudentsByCourse('BSCS').subscribe(count => {
        const courseCounts: {
          BSEMC: number, BSIT: number, BSCS: number, BSANIMATION: number, 
          BSMAD: number, BSFD: number,  BSFILM: number, BAMUSIC: number} = count;
          this.BSCS = courseCounts.BSCS;
          console.log(`Total BSCS students: ${this.BSCS}`);
      });

      this.db.getStudentsByCourse('BSANIMATION').subscribe(count => {
        const courseCounts: {
          BSEMC: number, BSIT: number, BSCS: number, BSANIMATION: number, 
          BSMAD: number, BSFD: number,  BSFILM: number, BAMUSIC: number} = count;
          this.BSANIMATION = courseCounts.BSANIMATION;
          console.log(`Total BSANIMATION students: ${this.BSANIMATION}`);
      });

      this.db.getStudentsByCourse('BSMAD').subscribe(count => {
        const courseCounts: {
          BSEMC: number, BSIT: number, BSCS: number, BSANIMATION: number, 
          BSMAD: number, BSFD: number,  BSFILM: number, BAMUSIC: number} = count;
          this.BSMAD = courseCounts.BSMAD;
          console.log(`Total BSMAD students: ${this.BSMAD}`);
      });

      this.db.getStudentsByCourse('BSFD').subscribe(count => {
        const courseCounts: {
          BSEMC: number, BSIT: number, BSCS: number, BSANIMATION: number, 
          BSMAD: number, BSFD: number,  BSFILM: number, BAMUSIC: number} = count;
          this.BSFD = courseCounts.BSFD;
          console.log(`Total BSFD students: ${this.BSFD}`);
      });

      this.db.getStudentsByCourse('BSFILM').subscribe(count => {
        const courseCounts: {
          BSEMC: number, BSIT: number, BSCS: number, BSANIMATION: number, 
          BSMAD: number, BSFD: number,  BSFILM: number, BAMUSIC: number} = count;
          this.BSFILM = courseCounts.BSFILM;
          console.log(`Total BSFILM students: ${this.BSFILM}`);
      });

      this.db.getStudentsByCourse('BAMUSIC').subscribe(count => {
        const courseCounts: {
          BSEMC: number, BSIT: number, BSCS: number, BSANIMATION: number, 
          BSMAD: number, BSFD: number,  BSFILM: number, BAMUSIC: number} = count;
          this.BAMUSIC = courseCounts.BAMUSIC;
          console.log(`Total BAMUSIC students: ${this.BAMUSIC}`);
      });

    });




  }
}






