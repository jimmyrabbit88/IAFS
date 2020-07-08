import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { TablesComponent } from './tables/tables.component';
import { GameComponent } from './games/game/game.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "home"},
  {path: "home", component: GamesComponent},
  {path: "game/:id", component: GameComponent},
  {path: "tables", component: TablesComponent},
  {path: "admin", component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
