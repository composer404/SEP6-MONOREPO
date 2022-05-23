import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {MessageService, PrimeNGConfig} from "primeng/api";
import {environment} from "../../../environments/environment";
import {LOCAL_API_SERVICES} from "../../interfaces/local-api-endpoints";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
  providers: [MessageService]
})
export class RankingComponent implements OnInit {


  public property: string;
  public movieList = [];
  public topListForm: FormGroup;

  constructor(private authService: AuthService, private httpClient: HttpClient,
              private messageService: MessageService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.topListForm = new FormGroup({
      name: new FormControl(``, [Validators.required, Validators.minLength(1)]),
      description: new FormControl(``, [Validators.required, Validators.minLength(10)]),
    });
  }

  public async onCreateMovie() {
    const response = await firstValueFrom(
      this.httpClient.post<string>(`${environment.localApiUrl}${LOCAL_API_SERVICES.topList}`, {
        name: this.topListForm.get('name').value,
        description: this.topListForm.get('description').value,
      })
    )
     if(response) {
       this.showSuccess();
       return;
     }
    this.showError();
  }

  public clear() {
    this.messageService.clear();
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary:'Success', detail:'The movie has been added successfully'});
  }

  showError() {
    this.messageService.add({severity:'error', summary:'Error', detail:'There has been an error while adding the movie'});
  }
}
