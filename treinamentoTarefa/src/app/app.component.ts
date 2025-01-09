import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';

import {
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
  PoButtonModule,
  PoTableModule,
  PoModalModule,
  PoFieldModule,
  PoModalAction,
  PoModalComponent,
  PoComboOption,
  PoTableColumn,

} from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    PoButtonModule,
    PoTableModule,
    PoModalModule,
    PoFieldModule,

  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  
  @ViewChild('modalAddTarefa', { static: true }) modalTarefa: PoModalComponent | undefined;
  @ViewChild('form', { static: true }) formulario: NgForm | undefined;
  
  nome = "";
  descricao = "";
  categoria = "";
  id = 1;

  tarefa = [
    {id: 0, nome: '', categoria: '', descricao: ''},
  ];

  public readonly categorias: Array<PoComboOption> = [
    { value: 'suporte', label: 'Suporte' },
    { value: 'melhoria', label: 'Melhoria' },
    { value: 'correcao', label: 'Correção' },
    { value: 'analise', label: 'Análise' },
  ];

  public readonly columns: Array<PoTableColumn> = [
    {property: 'id', label:'ID', width: '10%'},
    {property: 'nome', label:'Nome', width: '30%'},
    {property: 'categoria', label:'Categoria', width: '30%'},
    {property: 'descricao', label:'Descrição', width: '20%'},
    {property: 'acoes', label:'Ações', width:'10%'}
  ]

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.onClick.bind(this) },
  ];

  abrirModal() {  
    this.modalTarefa?.open()
  }
    
  onClick() {
    alert('Testando menu');
  }

  addTarefa(){
    this.modalTarefa?.close();
    this.tarefa.push({ id: this.id, nome: this.nome, categoria: this.categoria, descricao: this.descricao });
    this.nome = "";
    this.descricao = "";
    this.categoria = "";
    this.id += 1;
    console.log(this.tarefa);
  }
 
}
