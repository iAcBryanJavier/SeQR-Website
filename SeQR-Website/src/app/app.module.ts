import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



import { NavbarComponent } from './navbar/navbar.component';
import { ScanQrComponent } from './scan-qr/scan-qr.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { ChangeLogsComponent } from './change-logs/change-logs.component';
import { ReportLogsComponent } from './report-logs/report-logs.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    EditStudentComponent,
    ChangeLogsComponent,
    ReportLogsComponent,
    DashboardComponent,
    ScanQrComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    ZXingScannerModule,

    NgbModule,
    NavbarComponent,
    RouterModule.forRoot([
      {path: '',  component: DashboardComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'add-student', component: AddStudentComponent},
      {path: 'change-logs', component: ChangeLogsComponent},
      {path: 'edit-student', component: EditStudentComponent},
      {path: 'report-logs', component: ReportLogsComponent},
      {path: 'scan-qr', component: ScanQrComponent}
      
    ]),
  ],


 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
