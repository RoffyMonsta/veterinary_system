import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Clinic } from '../symptom.model';

@Component({
  selector: 'app-clinic-card',
  templateUrl: './clinic-card.component.html',
  styleUrls: ['./clinic-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicCardComponent implements OnInit {
  @Input() clinic: Clinic;
  constructor() { }

  ngOnInit() {}

}
