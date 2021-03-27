import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Toast } from '../shared/models/toast.model';
import { Tab } from '../shared/models/tab.model';
import { SwalModel } from 'src/app/shared/models/swal.model';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  showSideUser = new Subject<boolean>();
  showSideViews = new Subject<boolean>();
  showSideBar = new Subject<boolean>();
  changeTipoMenu = new Subject<boolean>();

  toastLogin = new BehaviorSubject<Toast>(null);
  toast = new BehaviorSubject<Toast>(null);
  swal = new BehaviorSubject<SwalModel>(null);
  pagina = new BehaviorSubject<string>("");

  tabs = new BehaviorSubject<Tab[]>([]);

  constructor(
    private router: Router
  ) { 
  }

  getStatusPantalla(): number {
    let width = window.screen.width;
    
    if (width < 640) return 1;
    else if (width > 640 && width < 1920) return 10;
    else return 17;
  }

  removeCredential() {
    this.router.navigate(['/'], { replaceUrl: true });
    localStorage.clear();
    location.reload();
  }

  getDataTable(data: any): any {
    let arregloCols: any[] = [];
    let headers = Object.keys(data[0]);

    headers.map(h => {
      if (h.substring(0,2).toLowerCase() != "id"){
        arregloCols.push({
            field: h,
            header: h
        });
      }
    });

    let arregloRows: any[] = [];
    data.map((row) => {
      let x: any = [];
      headers.map((h) => {
          x[h] = row[h];
      });
      arregloRows.push(x)
    });

    return { cols: arregloCols, rows: arregloRows };
  }
}
