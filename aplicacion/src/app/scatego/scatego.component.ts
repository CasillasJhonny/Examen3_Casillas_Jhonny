import { Component, OnInit } from '@angular/core';
import { Scatego } from 'src/model/scatego';
import { ScategoService } from '../service/scatego.service';
import { MenuItem } from 'primeng/components/common/menuitem';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TreeNode } from 'primeng/api';
import { Customer, Representative } from '../domain/customer';
import { CustomerService } from '../service/customerservice';
//jhonny Casillas
@Component({
  selector: 'app-persona',
  templateUrl: './scatego.component.html',
  styleUrls: ['./scatego.component.css']
})
export class ScategoComponent implements OnInit {
  value: Date;
  scategos: Scatego[];
  files: TreeNode[];
  cols: any[];
  categories: any = [];
  selectedOption:string;
  items: MenuItem[];
  customers: Customer[];
  displaySaveDialog: boolean = false;
  loading: boolean = true;
  scatego: Scatego = {
    COD_SUB_CATEGORIA: null,
    COD_CATEGORIA: null,
    NOMBRE:null,
    DESCRIPCION: null,
    FECHA_CREACION: null
   };

  selectedScatego: Scatego = {
    COD_SUB_CATEGORIA: null,
    COD_CATEGORIA: null,
    NOMBRE:null,
    DESCRIPCION: null,
    FECHA_CREACION: null
  };

  constructor(private scategoService: ScategoService, private messageService: MessageService, private confirmService: ConfirmationService) { }

  getAll() {
    this.scategoService.getAll().subscribe(
      (result: any) => {
        let scategos: Scatego[] = [];
        for (let i = 0; i < result.length; i++) {
          let scatego = result[i] as Scatego;
          scategos.push(scatego);
          
        }
        this.scategos = scategos;
        console.log(scategos);
      },
      error => {
        console.log(error);
      }
    );
  }
  getCategori() {
    this.scategoService.getCatego().subscribe(
      res => {
        this.categories = res;
      },
      err => console.error(err)
    );
  }
  onChange(selectedOption){
    this.getFiltre(selectedOption);
  }
  
  getFiltre(id: string) {
    this.scategoService.getFiltro(id).subscribe(
      (result: any) => {
        let scategos: Scatego[] = [];
        for (let i = 0; i < result.length; i++) {
          let scatego = result[i] as Scatego;
          scategos.push(scatego);
          
        }
        this.scategos = scategos;
        console.log(scategos);
      },
      error => {
        console.log(error);
      }
    );
  }
 

  showSaveDialog(editar: boolean) {
    if (editar) {
      if (this.selectedScatego != null && this.selectedScatego.COD_SUB_CATEGORIA != null) {
        this.scatego = this.selectedScatego;
      }else{
        this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "seleccione un registro"});
        return;
      }
    } else {
     this.scatego = new Scatego();
    }
    this.displaySaveDialog = true;
  }

  save() {
    this.scategoService.save(this.scatego).subscribe(
      (result: any) => {
        let scatego = result as Scatego;
        this.validarPersona(scatego);
        this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Se guardó la Sub-catego correctamente." });
        this.displaySaveDialog = false;

      },
      error => {
        console.log(error);
      }
    );
  }

  delete(){
    if(this.selectedScatego == null || this.selectedScatego.COD_SUB_CATEGORIA == null){
      this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Por favor seleccione un registro"});
      return;
    }
    this.confirmService.confirm({
      message: "¿Está seguro que desea eliminar el registro?",
      accept : () =>{
       
        this.scategoService.delete(this.selectedScatego.COD_SUB_CATEGORIA).subscribe(
          (result:any) =>{
            console.log(this.selectedScatego.COD_SUB_CATEGORIA);
            this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Se eliminó correctamente." });
            this.deleteObject(this.selectedScatego.COD_SUB_CATEGORIA);
          }
        )
      }
    })
  }

  deleteObject(id:string){
    let index = this.scategos.findIndex((e) => e.COD_SUB_CATEGORIA == id);
    if(index != -1){
      this.scategos.splice(index, 1);
    }
  }
 


  validarPersona(scatego: Scatego){
    let index = this.scategos.findIndex((e) => e.COD_SUB_CATEGORIA == scatego.COD_SUB_CATEGORIA);

    if(index != -1){
      this.scategos[index] = scatego;
    }else{
      this.scategos.push(scatego);

    }

  }
  
  ngOnInit() {
    this.onChange;
    this.getCategori();
    this.getAll();
    this.cols = [
      { field: "COD_SUB_CATEGORIA", header: "ID" },
      { field: "NOMBRE", header: "Nombre" },
      { field: "FECHA_CREACION", header: "FECHA_CREACION" }

    ];

    this.items = [
      {
        label: "Nuevo",
        icon: 'pi pi-fw pi-plus',
        command: () => this.showSaveDialog(false)
      },
      {
        label: "Detalle",
        icon: "pi pi-fw pi-eye",
        command: () => this.showSaveDialog(true)
      },
      {
        label: "Eliminar", 
        icon: "pi pi-fw pi-times",
        command: () => this.delete()
      }
    ]

  }

}
