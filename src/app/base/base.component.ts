import { Component } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent {

    start() {
        console.log('Start');
    }

    stop() {
        console.log('Stop');
    }

    onPortChange(evt: Event) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        console.log('port', evt.target['value'])
    }

    onControllerNameChange(evt: Event) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        console.log('Controller', evt.target['value'])
    }

    onJSONChange(evt: Event) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        console.log('JSON', evt.target['value'])
    }
}
