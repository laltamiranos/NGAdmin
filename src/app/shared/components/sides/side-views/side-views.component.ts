import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Tab } from 'src/app/shared/models/tab.model';
import { VariablesService } from 'src/app/services/variableGL.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-side-views',
  templateUrl: './side-views.component.html',
  styleUrls: ['./side-views.component.css']
})
export class SideViewsComponent implements OnInit, OnDestroy {

  @Output() Modal = new EventEmitter<boolean>();

  tabs: Tab[] = [];
  tabSubcripcion: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private variablesService: VariablesService
  ) {
    this.tabSubcripcion = this.store.select('tabs','list').subscribe((data: Tab[]) => {
      this.tabs = data.filter((x:Tab) => x.label != this.variablesService.pagina.value);
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.tabSubcripcion) {
      this.tabSubcripcion.unsubscribe();
    }
  }

  closeModal() {
    this.Modal.emit(false);
  } 
}
