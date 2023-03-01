import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//CUSTOM ERROR HANDLING
import {CustomErrorHandlerService} from './services/custom-error-handler.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// QR CODE SCANNING
import { ZXingScannerModule } from '@zxing/ngx-scanner';
// QR CODE READER
import { ReadQrComponentComponent } from "./read-qr-component/read-qr-component.component";
//QR CODE GENERATION
import { QRCodeModule } from 'angularx-qrcode';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ScanQrComponent } from './components/scan-qr/scan-qr.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { ChangeLogsComponent } from './components/change-logs/change-logs.component';
import { ReportLogsComponent } from './components/report-logs/report-logs.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './router-guard/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FilterPipe } from './filter.pipe';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './components/landing/landing.component';
import { ScanLandingComponent } from './components/scan-landing/scan-landing.component';
import { ImportCsvButtonComponent } from './import-csv-button/import-csv-button.component';
import { ExportButtonComponent } from './components/export-button/export-button.component';
import { DataAnalysisComponent } from './data-analysis/data-analysis.component';
import { LoggingService } from './services/logging.service';
import { ExportButtonChangeLogsComponent } from './export-button-change-logs/export-button-change-logs.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

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
    FilterPipe,
    RegisterComponent,
    ReadQrComponentComponent,
    LandingComponent,
    ScanLandingComponent,
    ImportCsvButtonComponent,
    ExportButtonComponent,
    DataAnalysisComponent,
    ExportButtonChangeLogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ZXingScannerModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    QRCodeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule
  ],

  providers: [AuthGuard, FilterPipe, LoggingService,
    {provide:ErrorHandler, useClass:CustomErrorHandlerService},
  ],
  bootstrap: [AppComponent, NgbNavModule]
})
export class AppModule { }
