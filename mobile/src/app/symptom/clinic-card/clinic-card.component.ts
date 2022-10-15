import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Clinic } from '../symptom.model';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

@Component({
  selector: 'app-clinic-card',
  templateUrl: './clinic-card.component.html',
  styleUrls: ['./clinic-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicCardComponent implements OnInit {
  @Input() clinic: Clinic;
  constructor(private callNumber: CallNumber) { }

  ngOnInit() {}

  callClinic(number: string) {
    this.callNumber.callNumber("18001010101", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

}
