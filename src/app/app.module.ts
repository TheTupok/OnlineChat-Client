import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DialogBoxComponent} from './components/dialog-box/dialog-box.component';
import {GroupListComponent} from './components/group-list/group-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SocketioService} from "./core/services/socketio.service";

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
        HttpClientModule
    ],
    providers: [
        SocketioService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
