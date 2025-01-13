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
  PoTableAction,
  PoNotification,
  PoNotificationService,

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
  
  @ViewChild('modalTarefa', { static: true }) modalTarefa: PoModalComponent | undefined;
  @ViewChild('modalExcluir', {static:true}) modalExcluir : PoModalComponent | undefined;
  @ViewChild('form', { static: true }) formulario: NgForm | undefined;
  
  tarefa = {
    nome : "",
    descricao : "",
    categoria : "",
    id : 1,
  }
  
  constructor(private notificacao: PoNotificationService){
    
  }

  tarefas:Array<any>= [];

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
    {property: 'acoes', label:'Ações', width:'10%', type: 'icon'}
  ];

  public readonly acoes: Array<PoTableAction> = [
    {label: 'editar',action: this.editar.bind(this)},
    {label: 'excluir',action: this.removerTarefa.bind(this)},
  ]

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.onClick.bind(this) },
  ];

  ngOnInit(){
    let tarefasRecuperadas = sessionStorage.getItem('tarefas');

    this.tarefas = tarefasRecuperadas ? JSON.parse(tarefasRecuperadas) : [];
  }
  
  editar(linha:any){
    this.tarefa = {...linha}
    this.modalTarefa?.open()
    this.mandarStorage(this.tarefas);
  }

  abrirModal() {  
    this.tarefa.id = 0;
    this.tarefa.nome = "";
    this.tarefa.descricao = "";
    this.tarefa.categoria = "";
    this.modalTarefa?.open();
  }
    
  onClick() {
    alert('Testando menu');
  }

  removerTarefa(tarefa: any){
    let indice = this.tarefas.findIndex((t:any) => t.id === tarefa.id);
    this.tarefas.splice(indice, 1);
    alert(`Tarefa ${tarefa.nome} removida com sucesso!!!`);
    this.notificacao.success("teste")
    this.mandarStorage(this.tarefas);
  }

  salvar(){
    this.modalTarefa?.close();
    if(this.tarefa.id == 0){
      let ultimoIdTarefa = this.tarefas.reduce((last, tarefa) => tarefa.id, 0);
      this.tarefa.id = ultimoIdTarefa+1;
      this.tarefas.push({...this.tarefa});
    }else{
      let indice = this.tarefas.findIndex((e:any) => e.id == this.tarefa.id)
      this.tarefas[indice] = this.tarefa;
    }
    this.mandarStorage(this.tarefas);
  }

  mandarStorage(tarefas: any){
    console.log(tarefas);
    let tarefasString = JSON.stringify(tarefas);

    sessionStorage.setItem('tarefas', tarefasString);
  }
 
}
