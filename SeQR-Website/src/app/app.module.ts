import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// QR CODE SCANNING
import { ZXingScannerModule } from '@zxing/ngx-scanner';
// QR CODE READER
//
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
import { ReadQrComponentComponent } from "./read-qr-component/read-qr-component.component";

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
        ReadQrComponentComponent,

    ],
    providers: [ManongGuard, ManongService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ZXingScannerModule,
        NgbModule,
        NavbarComponent,
        FormsModule,
        HttpClientModule,
    ]
})
export class AppModule { }
