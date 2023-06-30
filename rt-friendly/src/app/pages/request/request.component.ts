import { Component, OnInit, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExtraType } from 'src/app/models/extra-types.model';
import { RequestsService } from 'src/app/services/requests.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  columnMagicNumber: number = null;

  title: string = 'Formulário de Falta Abonada';

  selectedTicket = null;

  @ViewChild('individualTicketModal', { static: true }) individualTicketModal: any;

  email: string = null;//'user1@example.com';
  settingEmail: boolean = true;
  cc: string[] = [];

  emailTitle = 'Por favor, insira seu email e faça login';
  emailField: any = [
    { show: true,  name: 'Email',  key: 'email', type: ExtraType.ShortText },
  ];

  fields: any = [
    { value: '',  show: true,  name: 'Nome do colaborador',  key: 'nome', type: ExtraType.ShortText },
    { value: '',  show: true,  name: 'Matrícula',  key: 'matricula', type: ExtraType.ShortText },
    { value: '',  show: true,  name: 'Função',  key: 'funcao', type: ExtraType.ShortText },
    { value: '',  show: true,  name: 'Regime Jurídico',  key: 'regime', type: ExtraType.ShortText },
//    { value: '',  show: true,  name: 'Unidade/Orgão',  key: 'e', type: ExtraType.ShortText },
    { value: '',  show: true,  name: 'Ramal',  key: 'ramal', type: ExtraType.ShortText },
    { value: '',  show: true,  name: 'Motivo', key: 'motivo', options: ['Doença sem atestado', 'Doença com atestado', 'Outros'], type: ExtraType.Choice },
    { value: '',  show: true,  name: 'Período de ausência', key: 'per_ausencia', type: ExtraType.Date, range: true },
    { value: '',  show: true,  name: 'Ausência', key: 'ausencia', options: ['Com vencimentos', 'Sem vencimentos'], type: ExtraType.Choice },
//    { value: '',  show: true,  name: 'Inps a partir de',  key: 'i', type: ExtraType.Date },
    { value: '',  show: true,  name: 'Total de dias',  key: 'dias', type: ExtraType.Number },
//    { value: '',  show: true,  name: 'Último dia de trabalho',  key: 'j', type: ExtraType.Date },
    { value: '',  show: true,  name: 'Observações',  key: 'obs', type: ExtraType.LongText },
    { value: '',  show: true,  name: 'Data',  key: 'data', type: ExtraType.Date },
    { notRequired: true, value: '',  show: true,  name: 'Parecer clínico (em caso de doença)' , key: 'parecer', type: ExtraType.ShortText },
    { value: '',  show: true,  name: 'Aprovação', key: 'aprovacao', type: ExtraType.ShortText },
    { value: '',  show: true,  name: 'Cc (separado por , (vírgula))', key: 'cc_join', type: ExtraType.ShortText,  notRequired: true }
  ];

  itens: any[] = null;

  keys: any = [
    { key: 'name', name: 'Nome' },
    { key: 'flow', name: 'Fluxo' },
    { key: 'flow_status', name: 'Status no fluxo' },
    { key: 'queue_name', name: 'Fila' },
    { key: 'status', name: 'Status' },
    { key: 'attachments', name: 'Anexos', type: ExtraType.Number },
    { key: 'owner', name: 'Responsável' },
    { key: 'requestor', name: 'Requisitante' },
    { key: 'cc', name: 'Lista em CC' },
    { key: 'last_updated', name: 'Última atualização', type: ExtraType.Date },
  ];

  filters: any[] = [
    { key: 'owner',  label: 'Mostrar chamados em que eu sou responsável', active: true },
    { key: 'requestor',  label: 'Mostrar chamados em que eu sou requisitante', active: true },
    { key: 'cc',  label: 'Mostrar chamados em que eu faço parte da CC', active: true },
  ];

  imageMap: any = {
    'Falta Abonada': {
      ['Formulário Enviado']: 'assets/diagram_1.svg',
      ['Formulário Recebido pelo RH']: 'assets/diagram_2.svg',
      ['Avaliação da Chefia']: 'assets/diagram_3.svg',
      ['Falta Abonada Negada']: 'assets/diagram_4.svg',
      ['RH Insere Falta Abonada no Sistema Vetorh']: 'assets/diagram_5.svg',
      ['Falta Abonada Aprovada']: 'assets/diagram_7.svg',
    }
  };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setNumberOfColums();
  }

  constructor(
    public requestService: RequestsService,
    public modalService: ModalService,
    public snack: MatSnackBar,
  ) { }

  ngOnInit(): void { }

  setItens() {
    this.requestService.getAll(this.email).subscribe( (response: any) => {
      if (response) {
        response.forEach( (item) => {
          item.show = true;
          item.status = this.getTranslatedStatus(item.status);
          item.cc = item.cc && item.cc.length ? item.cc.join(', ') : null;
          item.owner = item.owner === 'Nobody' ? 'Ninguém' : item.owner;
          item.last_updated = item.last_updated ? (new Date(item.last_updated)).toLocaleDateString('en-GB') : null;
          item.attachments = item.attachments && item.attachments.length ? item.attachments : null;
        });

        this.itens = response;
        this.setNumberOfColums();
      } else {
        this.itens = [];
      }
    });
  }

  setNumberOfColums() {
    this.columnMagicNumber = Math.floor(window.innerWidth/350);
  }

  openFile(data) {
    const convertedData = new Uint8Array(atob(data.content).split('').map(char => char.charCodeAt(0)));
    const blob = new Blob([convertedData], { type: data.content_type });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }

  getTranslatedStatus(status: string): string {
    const mappedStatus: any = {
      ['new']: 'Recém criado',
      ['open']: 'Aberto',
      ['stalled']: 'Parado',
      ['resolved']: 'Resolvido',
      ['rejected']: 'Rejeitado',
      ['deleted']: 'Removido',
    };

    return (mappedStatus[status] ? mappedStatus[status] : `Status não mapeado - ${status}`);
  }

  filterItens(filter) {
    this.itens.forEach( (item) => {
      item.show = false;

      this.filters.forEach( (filter) => {
        if (filter.active) {
          let email: any = item[filter.key];

          if (filter.key === 'cc') {
            email = email.split(',');
            if (email.includes(this.email)) {
              item.show = true;
            }

          } else {
            if (email === this.email) {
              item.show = true;
            }
          }
        }
      });
    });
  }

  setEmail(email) {
    this.email = email.body.email;
    this.setItens();
  }

  switchEmailEditing() {
    this.settingEmail = !this.settingEmail;
  }

  sendForms(response) {
    const body: any = {
      requestor: this.email,
      fields: this.formatBody(response.body),
      cc: this.cc,
    };

    this.requestService.createTicket(body).subscribe( (response) => {
      this.snack.open('Ticket criado com sucesso', 'OK');
      this.setItens();
    });
  }

  formatBody(fields) {
    fields.dias = String(fields.dias);
    fields.per_ausencia_ini = fields.per_ausencia[0]
    fields.per_ausencia_fim = fields.per_ausencia[1]
    this.cc = fields.cc_join ? fields.cc_join.split(',') : [];
    delete fields.per_ausencia;
    delete fields.cc_join;
    return fields;
  }

  openModal(ticket) {
    this.selectedTicket = ticket;
    this.modalService.openModal(this.individualTicketModal).subscribe(() => {});
  }
}
