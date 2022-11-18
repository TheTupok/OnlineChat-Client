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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {LogInComponent} from './pages/log-in/log-in.component'
import {ChatComponent} from './pages/chat/chat.component';
import {AdminPanelComponent} from './pages/admin-panel/admin-panel.component';
import {WebsocketModule} from "./core/websocket";

import { environment } from '../environments/environment';


@NgModule({
    declarations: [
        AppComponent,
        DialogBoxComponent,
        GroupListComponent,
        LogInComponent,
        ChatComponent,
        AdminPanelComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        WebsocketModule.config({
            url: environment.ws
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
