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


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'add-student', component: AddStudentComponent, canActivate: [AuthGuard] },
  { path: 'change-logs', component: ChangeLogsComponent, canActivate: [AuthGuard] },
  { path: 'edit-student', component: EditStudentComponent, canActivate: [AuthGuard] },
  { path: 'report-logs', component: ReportLogsComponent, canActivate: [AuthGuard] },
  { path: 'scan-qr', component: ScanQrComponent, canActivate: [AuthGuard] },
  { path: 'manage-account', component: ManageAccountComponent, canActivate: [AuthGuard] },
  { path: 'forget-password', component: ForgetPasswordComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
