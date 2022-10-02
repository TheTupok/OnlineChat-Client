import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DialogBoxComponent} from './components/dialog-box/dialog-box.component';
import {GroupListComponent} from './components/group-list/group-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from "@angular/forms";
import {ApiModule, BASE_PATH} from "./core/services/swagger-gen";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    DialogBoxComponent,
    GroupListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ApiModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: BASE_PATH,
      useValue: 'http://localhost:5000'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
