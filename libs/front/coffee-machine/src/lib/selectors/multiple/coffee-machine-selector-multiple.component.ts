import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CoffeeMachineFacadeService } from '../../+state/coffee-machine-state-facade';

@Component({
  selector: 'coffee-machine-selector-multiple',
  templateUrl: 'coffee-machine-selector-multiple.component.html',
  encapsulation:ViewEncapsulation.None
})
export class CoffeeMachineSelectorMultipleComponent<
  T extends { url: string; id: string; name: string; units: number }
> implements OnInit, OnDestroy
{
  selected = false;
  units = 0;
  @Input() prefix = 'body';
  @Input() data: T | undefined;
  @Output() clickEvent = new EventEmitter<{ id: string; increment: boolean }>();
  private _subscriptions = new Subscription();
  constructor(
    private readonly coffeeMachineFacadeService: CoffeeMachineFacadeService,
    private readonly cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._setupListeners();
  }

  private _setupListeners(){
    if (this.data) {
      this._subscriptions.add(
        this.coffeeMachineFacadeService
          .isEntryIdSelected(this.data?.id)
          .subscribe((selected) => {
            this.selected = selected;
            this.cdr.markForCheck();
          })
      );

      this._subscriptions.add(
        this.coffeeMachineFacadeService
          .unitsSelectedByEntryId(this.data?.id)
          .subscribe((units) => {
            this.units = units;
          })
      );
    }
  }

  increment() {
    this.clickEvent.emit({ id: this.data?.id as string, increment: true });
  }

  decrement() {
    this.clickEvent.emit({ id: this.data?.id as string, increment: false });
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
