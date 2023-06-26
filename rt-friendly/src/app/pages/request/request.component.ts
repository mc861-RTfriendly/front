import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ExtraType } from 'src/app/models/extra-types.model';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  title: string = 'Formulário de Falta Abonada';

  fields: any = [
    { value: '',  show: true,  name: 'Nome do colaborador',  key: 'a', type: ExtraType.ShortText },
    { value: '',  show: true,  name: 'Matrícula',  key: 'b', type: ExtraType.ShortText },
    { value: '',  show: true,  name: 'Função',  key: 'c', type: ExtraType.ShortText },
    { value: '',  show: true,  name: 'Regime Jurídico',  key: 'd', type: ExtraType.ShortText },
    { value: '',  show: true,  name: 'Unidade/Orgão',  key: 'e', type: ExtraType.ShortText },
    { value: '',  show: true,  name: 'Ramal',  key: 'f', type: ExtraType.ShortText },
    { value: '',  show: true,  name: 'Motivo', key: 's', options: ['Doença sem atestado', 'Doença com atestado', 'Outros'], type: ExtraType.Choice },
    { value: '',  show: true,  name: 'Período de ausência', key: 'g', type: ExtraType.Date, range: true },
    { value: '',  show: true,  name: 'Ausência', key: 'x', options: ['Com vencimentos', 'Sem vencimentos'], type: ExtraType.Choice },
    { value: '',  show: true,  name: 'Inps a partir de',  key: 'i', type: ExtraType.Date },
    { value: '',  show: true,  name: 'Total de dias',  key: 'h', type: ExtraType.Number },
    { value: '',  show: true,  name: 'Último dia de trabalho',  key: 'j', type: ExtraType.Date },
    { value: '',  show: true,  name: 'Observações',  key: 'k', type: ExtraType.LongText },
    { value: '',  show: true,  name: 'Data',  key: 'l', type: ExtraType.Date },
    { notRequired: true, value: '',  show: true,  name: 'Parecer clínico (em caso de doença)' , key: 'm', type: ExtraType.ShortText },
    { value: '',  show: true,  name: 'Aprovação', key: 'n', type: ExtraType.ShortText }
  ];

  // TODO add barra de busca
  // Só os próprios tickets
    // Ticket Criado
    // Ticket Tomado
    // Ticket Trocou de fila
  filas: any = [
    {
      name: 'RH',
      itens: [
        { id: '35', name: 'Ticket de teste', status: 'New' },
        { id: '36', name: 'Ticket de teste 2', status: 'On going' }
      ]
    },
    {
      name: 'Congregação',
      itens: []
    }
  ];

  // PDF e JPG

  constructor(
    public requestService: RequestsService,
    public snack: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.requestService.getAll().subscribe( (response: any) => {
      console.log(response);
    });
  }

  sendForms(response) {
     setTimeout(() => {
        this.snack.open('Ticket criado com sucesso', 'OK');
     }, 2000);
  }
}
