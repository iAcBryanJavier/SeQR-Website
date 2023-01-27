import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// QR CODE SCANNING
import { ZXingScannerModule } from '@zxing/ngx-scanner';
// QR CODE READER

//

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
import { AuthGuard } from './router-guard/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ReadQrComponentComponent } from "./read-qr-component/read-qr-component.component";
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { LandingComponent } from './components/landing/landing.component';
import { ScanLandingComponent } from './components/scan-landing/scan-landing.component';
import { ImportCsvButtonComponent } from './import-csv-button/import-csv-button.component';

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
    NavbarComponent,
    ReadQrComponentComponent,
    LandingComponent,
    ScanLandingComponent,
    ImportCsvButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ZXingScannerModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],

  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
