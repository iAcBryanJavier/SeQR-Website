import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ScanQrComponent } from './components/scan-qr/scan-qr.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { ChangeLogsComponent } from './components/change-logs/change-logs.component';
import { ReportLogsComponent } from './components/report-logs/report-logs.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { ManongGuard } from './router-guard/manong.guard';
import { HttpClientModule } from '@angular/common/http';
import { ManongService } from './services/manong.service';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    EditStudentComponent,
    ChangeLogsComponent,
    ReportLogsComponent,
    DashboardComponent,
    LoginComponent,
    ManageAccountComponent,
    ForgetPasswordComponent,
    ScanQrComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ZXingScannerModule,
    NgbModule,
    NavbarComponent,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],


 
  providers: [ManongGuard, ManongService],
  bootstrap: [AppComponent]
})
export class AppModule { }
