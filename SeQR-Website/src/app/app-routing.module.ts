import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ChangeLogsComponent } from './change-logs/change-logs.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { ReportLogsComponent } from './report-logs/report-logs.component';
import { ScanQrComponent } from './scan-qr/scan-qr.component';
import { LoginComponent } from './login/login.component';
import { ManongGuard } from './manong.guard';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [ManongGuard]},
  { path: 'add-student', component: AddStudentComponent },
  { path: 'change-logs', component: ChangeLogsComponent },
  { path: 'edit-student', component: EditStudentComponent },
  { path: 'report-logs', component: ReportLogsComponent },
  { path: 'scan-qr', component: ScanQrComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
