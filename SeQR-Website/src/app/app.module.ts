import { NgModule } from '@angular/core';
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
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ManongGuard } from './manong.guard';
import { HttpClientModule } from '@angular/common/http';
import { ManongService } from './manong.service';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { provideStorage,getStorage } from '@angular/fire/storage';
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
