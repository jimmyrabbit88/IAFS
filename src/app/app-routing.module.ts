import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { TablesComponent } from './tables/tables.component';
import { GameComponent } from './games/game/game.component';
import { AdminComponent } from './admin/admin.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';


const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "log"},
  {path: "register", component: SignUpComponent},
  {path: "log", component: SignInComponent},
  {path: "home", component: GamesComponent},
  {path: "game/:id", component: GameComponent},
  {path: "tables", component: TablesComponent},
  {path: "admin", component: AdminComponent, canActivate: [AuthGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
