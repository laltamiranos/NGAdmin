import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Tab } from '../../models/tab.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { UnsetTabAction } from 'src/app/store/actions/';
import { Router } from '@angular/router';
import { fadeAnimation } from '../../animations/fade';
import { VariablesService } from 'src/app/services/variableGL.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
  animations: [fadeAnimation]
})

export class BreadcrumbComponent implements OnInit, OnDestroy {
  
  cantidadRows = 1;
  pagina: string;

  tabsInBreadcrumb: Tab[] = [];
  tabsOutBreadcrumb: Tab[] = [];

  modalTabsOut: boolean = false;
  contadorModal: number = 0;

  tabsSubscription: Subscription = new Subscription();
  paginaSubscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private variablesService: VariablesService
  ) {
    this.cantidadRows = this.variablesService.getStatusPantalla();
    this.paginaSubscription = this.variablesService.pagina.subscribe((x:string) => {
      this.pagina = x;
    });

    this.tabsSubscription = this.store.select('tabs','list').subscribe((data: Tab[]) => {
      this.tabsInBreadcrumb = data.filter(x => x.isBreadcrumb == true).reverse();
      this.tabsOutBreadcrumb = data.filter(x => x.isBreadcrumb == false);

      setTimeout(() => {
        let tab: any = document.querySelector('.tab.active');
        let cartaNormal = document.getElementById('carta-view');
        
        if (this.cantidadRows != 1 && cartaNormal != null) { 
          if (String(tab.innerText).toLowerCase().includes('dashboard')) {
            cartaNormal.classList.toggle("carta-Normal");
            cartaNormal.classList.toggle("carta-Normal-dashboard");
          }
          else {
            if (cartaNormal.classList[0] != 'carta-Normal') {
              cartaNormal.classList.toggle("carta-Normal-dashboard");
              cartaNormal.classList.toggle("carta-Normal");
            }
          }
        }
      }, 100);
        
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.tabsSubscription) {
      this.tabsSubscription.unsubscribe();
    }
  }

  closeTab(tab: Tab) {
    this.store.dispatch(new UnsetTabAction(tab.label));

    if (this.tabsInBreadcrumb.length > 0)
      this.router.navigate([this.tabsInBreadcrumb[0].routerLink]);
    else
      this.router.navigate(['/Home']);
  }

  // Modal
  clickSides($event: Event) {
    $event.stopPropagation();
  }

  openModal() {
    this.modalTabsOut = true;
  }

  closeModal() {
    this.modalTabsOut = false;
    this.contadorModal = 0;
  }

  @HostListener('document:click', ['$event']) clickedOutside($event) {
    if (this.modalTabsOut && this.contadorModal == 0) {
      this.modalTabsOut = true;
      this.contadorModal++;
    }
    else if (this.modalTabsOut && this.contadorModal == 1) {
      this.closeModal();
    }
  }
}
