import { Component, OnInit } from '@angular/core';
import { ExtraType } from 'src/app/models/extra-types.model';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  fields: any = [
    { name: 'Nome do colaborador',  key: 'a', type: ExtraType.ShortText },
    { name: 'Matrícula',  key: 'b', type: ExtraType.ShortText },
    { name: 'Função',  key: 'c', type: ExtraType.ShortText },
    { name: 'Regime Jurídico',  key: 'd', type: ExtraType.ShortText },
    { name: 'Unidade/Orgão',  key: 'e', type: ExtraType.ShortText },
    { name: 'Ramal',  key: 'f', type: ExtraType.ShortText },
    { name: 'Motivo', key: '2', options: ['Doença sem atestado', 'Doença com atestado', 'Outros'], type: ExtraType.Choice },
    { name: 'Período de ausência', key: 'g', type: ExtraType.Date },
    { name: 'Ausência', key: '3', options: ['Com vencimentos', 'Sem vencimentos'], type: ExtraType.Choice }, 
    { name: 'Inps a partir de',  key: 'i', type: ExtraType.Date },
    { name: 'Total de dias',  key: 'h', type: ExtraType.Date },
    { name: 'Último dia de trabalho',  key: 'j', type: ExtraType.Date },
    { name: 'Observações',  key: 'k', type: ExtraType.LongText },
    { name: 'Data',  key: 'l', type: ExtraType.Date },
    { name: 'Parecer clínico (em caso de doença)' , key: 'm', type: ExtraType.ShortText },
    { name: 'Aprovação', key: 'n', type: ExtraType.ShortText },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
