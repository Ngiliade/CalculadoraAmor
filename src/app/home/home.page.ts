import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nome1 = ""
  nome2 = ""
  url = "http://lucasreno.kinghost.net/love-calculator/"
  resultado = 0
  mensagem = ""
  calculando = false;
  imagem = false

  constructor(
    public http: HttpClient,
  ) { }

  async enviarDados() {
    let soma = 0;
    this.imagem = false
    while (soma != 10) {
      this.resultado = Math.floor(Math.random() * 100 + 1);
      this.calculando = true;
      soma += 1;
      await this.delay(75);
    }

    
    this.calculando = false;

    this.http.get<any>(this.url + this.nome1 + "/" + this.nome2).subscribe(
      (resposta: any) => {
        this.resultado = resposta;
        if (this.resultado < 20) this.mensagem = "Deu nada, sai dessa";
        else if (this.resultado < 40) this.mensagem = "O não já tem, busca a humilhação";
        else if (this.resultado < 60) this.mensagem = "Não tá ruim, mas também não tá bom";
        else if (this.resultado < 80) this.mensagem = "Acho que só amizade mesmo";
        else{ 
          this.imagem = true;
          this.mensagem = "Acho que só amizade mesmo";
        }
      }
    );
    if(this.nome1 == "" || this.nome2 == ""){
      this.mensagem = "Cade os nomes?";
      this.resultado = 0;
    }
    
    
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}
