
import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Directive({
  selector: '[appBrmasker]',
  providers: [IonInput],
})
export class BrmaskerDirective {

  private onDestroy$ = new Subject<void>();
  constructor(public ionInput: IonInput) {

  }
  @Input('appInputMask') mask: any;

  public ngOnInit() {
    this.configure();

  }
  public ngOnDestroy() {
    this.onDestroy$.next();
  }

  public async configure() {
    const input = await this.ionInput.getInputElement();
    this.ionInput.ionChange
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((event: CustomEvent) => {
        const { value } = event.detail;
       
        this.ionInput.value = input.value;
      });
  }
}