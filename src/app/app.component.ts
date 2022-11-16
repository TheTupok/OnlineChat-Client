import {Component, OnInit} from '@angular/core';
import {JwtTokenService} from "./core/services/jwt.service";
import {Router} from "@angular/router";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Client';

    constructor(private jwtService: JwtTokenService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.jwtService.getValidToken().subscribe((valid: boolean) => {
            if (!valid) {
                this.router.navigate(['/login']).then();
            }
        })
    }
}
