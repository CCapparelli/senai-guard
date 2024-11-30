import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Sessao } from "./sessao.model";
import { SessaoService } from "./sessao.service";

@Component({
  selector: "app-root",
  standalone: false,
  template: `
    <div
      *ngIf="
        sessao$ | async as sessao;
        else menuNaoLogado
      "
    >
      Olá {{ sessao.nome }}!
      <a routerLink="/home">Home</a> |
      <a routerLink="/login" (click)="logout()"
        >Logout</a
      >
    </div>
    <router-outlet></router-outlet>
    <ng-template #menuNaoLogado>
      usuário não logado
    </ng-template>
  `,
})
export class AppComponent {
  title = "consolelog-guards";
  sessao$: Observable<Sessao | null>;

  constructor(
    private sessaoService: SessaoService
  ) {
    this.sessao$ = this.sessaoService.getSessao();
  }

  logout() {
    this.sessaoService.limparSessao();
  }
}
