import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { MatIconModule } from '@angular/material/icon'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { HeaderComponent } from './header/header.component';
import { TablesComponent } from './tables/tables.component';
import { environment } from 'src/environments/environment';
import { GameComponent } from './games/game/game.component';
import { TitleComponent } from './games/game/title/title.component';
import { DetailsComponent } from './games/game/details/details.component';
import { StatsComponent } from './games/game/stats/stats.component';
import { LineupsComponent } from './games/game/lineups/lineups.component';
import { SocialComponent } from './games/game/social/social.component';
import { StandingsComponent } from './games/game/standings/standings.component';
import { DetailComponent } from './games/game/details/detail/detail.component';
import { AdminComponent } from './admin/admin.component';
import { AddGameComponent } from './admin/add-game/add-game.component';
import { MaterialModule } from './material/material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';
import { UpdateGameComponent } from './admin/update-game/update-game.component';
import { UpdatePanelComponent } from './admin/update-game/update-panel/update-panel.component';
import { TdInfoComponent } from './admin/update-game/update-panel/td-info/td-info.component';
import { FgInfoComponent } from './admin/update-game/update-panel/fg-info/fg-info.component';
import { SInfoComponent } from './admin/update-game/update-panel/s-info/s-info.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    HeaderComponent,
    TablesComponent,
    GameComponent,
    TitleComponent,
    DetailsComponent,
    StatsComponent,
    LineupsComponent,
    SocialComponent,
    StandingsComponent,
    DetailComponent,
    AdminComponent,
    AddGameComponent,
    UpdateGameComponent,
    UpdatePanelComponent,
    TdInfoComponent,
    FgInfoComponent,
    SInfoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MaterialModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
