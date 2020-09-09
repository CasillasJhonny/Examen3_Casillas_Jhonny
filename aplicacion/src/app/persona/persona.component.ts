import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/model/persona';
import { PersonaService } from '../service/persona.service';
import { MenuItem } from 'primeng/components/common/menuitem';
import { MessageService, ConfirmationService } from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
import {MultiSelectModule} from 'primeng/multiselect';
//jhonny Casillas
@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  value: Date;
  personas: Persona[];
  cols: any[];
  items: MenuItem[];
  displaySaveDialog: boolean = false;
  persona: Persona = {
    COD_SUB_CATEGORIA: null,
    COD_CATEGORIA: null,
    NOMBRE:null,
    DESCRIPCION: null,
    FECHA_CREACION: null
   };

  selectedPersona: Persona = {
    COD_SUB_CATEGORIA: null,
    COD_CATEGORIA: null,
    NOMBRE:null,
    DESCRIPCION: null,
    FECHA_CREACION: null
  };

  constructor(private personaService: PersonaService, private messageService: MessageService, private confirmService: ConfirmationService) { }

  getAll() {
    this.personaService.getAll().subscribe(
      (result: any) => {
        let personas: Persona[] = [];
        for (let i = 0; i < result.length; i++) {
          let persona = result[i] as Persona;
          personas.push(persona);
          
        }
        this.personas = personas;
        console.log(personas);
      },
      error => {
        console.log(error);
      }
    );
  }

  showSaveDialog(editar: boolean) {
    if (editar) {
      if (this.selectedPersona != null && this.selectedPersona.COD_SUB_CATEGORIA != null) {
        this.persona = this.selectedPersona;
      }else{
        this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "seleccione un registro"});
        return;
      }
    } else {
     this.persona = new Persona();
    }
    this.displaySaveDialog = true;
  }

  save() {
    this.personaService.save(this.persona).subscribe(
      (result: any) => {
        let persona = result as Persona;
        this.validarPersona(persona);
        this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Se guardó la persona correctamente." });
        this.displaySaveDialog = false;

      },
      error => {
        console.log(error);
      }
    );
  }

  delete(){
    if(this.selectedPersona == null || this.selectedPersona.COD_SUB_CATEGORIA == null){
      this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Por favor seleccione un registro"});
      return;
    }
    this.confirmService.confirm({
      message: "¿Está seguro que desea eliminar el registro?",
      accept : () =>{
        this.personaService.delete(this.selectedPersona.COD_SUB_CATEGORIA).subscribe(
          (result:any) =>{
            this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Se eliminó correctamente." });
            this.deleteObject(result.COD_SUB_CATEGORIA);
          }
        )
      }
    })
  }

  deleteObject(id:string){
    let index = this.personas.findIndex((e) => e.COD_SUB_CATEGORIA == id);
    if(index != -1){
      this.personas.splice(index, 1);
    }
  }

  validarPersona(persona: Persona){
    let index = this.personas.findIndex((e) => e.COD_SUB_CATEGORIA == persona.COD_SUB_CATEGORIA);

    if(index != -1){
      this.personas[index] = persona;
    }else{
      this.personas.push(persona);

    }

  }
  
  ngOnInit() {
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
