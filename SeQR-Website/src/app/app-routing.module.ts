import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { ChangeLogsComponent } from './components/change-logs/change-logs.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { ReportLogsComponent } from './components/report-logs/report-logs.component';
import { ScanQrComponent } from './components/scan-qr/scan-qr.component';
import { LoginComponent } from './components/login/login.component';
import { ManongGuard } from './router-guard/manong.guard';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [ManongGuard]},
  { path: 'add-student', component: AddStudentComponent, canActivate: [ManongGuard] },
  { path: 'change-logs', component: ChangeLogsComponent, canActivate: [ManongGuard] },
  { path: 'edit-student', component: EditStudentComponent, canActivate: [ManongGuard] },
  { path: 'report-logs', component: ReportLogsComponent, canActivate: [ManongGuard] },
  { path: 'scan-qr', component: ScanQrComponent, canActivate: [ManongGuard] },
  { path: 'manage-account', component: ManageAccountComponent, canActivate: [ManongGuard] },
  { path: 'forget-password', component: ForgetPasswordComponent, canActivate: [ManongGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
