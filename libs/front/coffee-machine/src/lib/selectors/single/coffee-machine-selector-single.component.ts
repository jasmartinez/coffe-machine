
import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CoffeeMachineFacadeService } from '../../+state/coffee-machine-state-facade';
import { Subscription } from 'rxjs';

@Component({
  selector: 'coffee-machine-selector-single',
  templateUrl: 'coffee-machine-selector-single.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CoffeeMachineSelectorSingleComponent<
  T extends { url: string; id: string; name: string,price:number }
> implements OnInit, OnDestroy{
  selected = false;
  @Input() prefix = 'body';
  @Input() data: T | undefined;
  @Output() clickEvent = new EventEmitter<string>();
  private _subscriptions = new Subscription();
  constructor(
    private readonly coffeeMachineFacadeService:CoffeeMachineFacadeService,
    private readonly cdr:ChangeDetectorRef
    ){}
  
  ngOnInit(): void {
    if(this.data){
      this._subscriptions.add(
        this.coffeeMachineFacadeService.isEntryIdSelected(this.data?.id).subscribe((selected)=>{
          this.selected = selected; 
          this.cdr.markForCheck();
        })
      )
    }
  }

  onClick() {
    this.clickEvent.emit(this.data?.id);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
