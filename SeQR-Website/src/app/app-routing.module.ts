import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { ChangeLogsComponent } from './components/change-logs/change-logs.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { ReportLogsComponent } from './components/report-logs/report-logs.component';
import { ScanQrComponent } from './components/scan-qr/scan-qr.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './router-guard/auth.guard';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './components/landing/landing.component';
import { ReadQrComponentComponent } from './read-qr-component/read-qr-component.component';
import { DataAnalysisComponent } from './data-analysis/data-analysis.component';
import { CustomErrorHandlerService } from './services/custom-error-handler.service';
import { EditFormComponent } from './edit-form/edit-form.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ScanQrPageComponent } from './components/scan-qr-page/scan-qr-page.component';
import { ReadQrPageComponent } from './components/read-qr-page/read-qr-page.component';


ReadQrPageComponent
const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full'},
  { path: 'landing', component: LandingComponent}, 
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'add-student', component: AddStudentComponent, canActivate: [AuthGuard] },
  { path: 'change-logs', component: ChangeLogsComponent, canActivate: [AuthGuard] },
  { path: 'edit-student', component: EditStudentComponent, canActivate: [AuthGuard] },
  { path: 'report-logs', component: ReportLogsComponent, canActivate: [AuthGuard] },
  { path: 'scan-qr', component: ScanQrComponent },
  { path: 'scan-qr-page', component: ScanQrPageComponent, canActivate: [AuthGuard] },
  { path: 'manage-account', component: ManageAccountComponent, canActivate: [AuthGuard] },
  { path: 'forget-password', component: ForgetPasswordComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'read-qr', component: ReadQrComponentComponent },
  { path: 'read-qr-page', component: ReadQrPageComponent, canActivate: [AuthGuard] },
  { path: 'edit-form', component: EditFormComponent },
  { path: 'data-analysis', component:  DataAnalysisComponent },
  { path: '**', pathMatch: 'full', 
        component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {provide:CustomErrorHandlerService, useClass:CustomErrorHandlerService},
  ]
})
export class AppRoutingModule { }
