import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  schoolName!: any;
  email!: any;

  constructor(private fireAuth: AngularFireAuth, private db: AngularFireDatabase) { }

  ngOnInit(): void {
    this.getSchoolName();
    this.getEmail();
  }

  getSchoolName(){
    this.fireAuth.user.subscribe(user => {
      if (user) {
        // User is signed in
        // Get the user's UID
        const uid = user.uid;
        // Reference the user's name in the Realtime Database
        const nameRef = this.db.object(`users/${uid}/name`);

        // Read the user's name from the Realtime Database
        nameRef.valueChanges().subscribe(name => {
          this.schoolName = name;
        });
      } else {
        // User is signed out
        console.log('user is not signed in');
      }
    })
  }

  getEmail(){
    this.fireAuth.user.subscribe(user => {
      if (user) {
        // User is signed in
        // Get the user's email
        this.email = user.email
      } else {
        // User is signed out
        console.log('user is not signed in');
      }
    })
  }
}
