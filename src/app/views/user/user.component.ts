import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    isUserRegister: boolean = false;

    constructor(public route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.isUserRegister = this.route.snapshot.data.isUserRegister === undefined ? false : this.route.snapshot.data.isUserRegister;
        console.log(this.route.snapshot);

        console.log(this.isUserRegister);

    }

}
