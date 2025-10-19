import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatCardModule} from '@angular/material/card';

@Component({
    selector: 'app-placeholder',
    standalone: true,
    imports: [MatCardModule],
    template: `
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
            <mat-card style="padding: 2rem; text-align: center;">
                <h1>{{ title }}</h1>
                <p>Esta es una página temporal para {{ role }}.</p>
            </mat-card>
        </div>
    `
})
export class PlaceholderComponent implements OnInit {
    title: string = 'Dashboard';
    role: string = 'usuario';

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.title = this.route.snapshot.data['title'] || 'Dashboard';
        this.role = this.route.snapshot.data['role'] || 'usuario';
    }
}
