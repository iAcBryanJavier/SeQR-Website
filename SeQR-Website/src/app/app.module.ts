import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
// import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { ScanQrComponent } from './scan-qr/scan-qr.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { ChangeLogsComponent } from './change-logs/change-logs.component';
import { ReportLogsComponent } from './report-logs/report-logs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ManongGuard } from './manong.guard';
import { HttpClientModule } from '@angular/common/http';
import { ManongService } from './manong.service';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

@NgModule({
  declarations: [
    AppComponent,
    ScanQrComponent,
    AddStudentComponent,
    EditStudentComponent,
    ChangeLogsComponent,
    ReportLogsComponent,
    DashboardComponent,
    LoginComponent,
    ManageAccountComponent,
    ForgetPasswordComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NavbarComponent,
    FormsModule,
    HttpClientModule,
    
  ],


 
  providers: [ManongGuard, ManongService],
  bootstrap: [AppComponent]
})
export class AppModule { }
