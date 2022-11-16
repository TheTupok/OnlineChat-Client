import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatComponent} from "./pages/chat/chat.component";
import {LogInComponent} from "./pages/log-in/log-in.component";
import {AdminPanelComponent} from "./pages/admin-panel/admin-panel.component";

const routes: Routes = [
    {path: '', component: ChatComponent},
    {path: 'login', component: LogInComponent},
    {path: 'admin', component: AdminPanelComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
