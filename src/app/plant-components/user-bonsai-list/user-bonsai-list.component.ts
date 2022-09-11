import { Component, OnInit } from '@angular/core';
import { Bonsai } from 'src/app/_model/Bonsai';
import { BonsaiPage } from 'src/app/_model/BonsaiPage';
import { BonsaiStyle } from 'src/app/_model/BonsaiStyle';
import { BonsaiType } from 'src/app/_model/BonsaiType';
import { AuthService } from 'src/app/_security/auth.service';
import { BonsaiService } from 'src/app/_services/bonsai.service';

@Component({
  selector: 'app-user-bonsai-list',
  templateUrl: './user-bonsai-list.component.html',
  styleUrls: ['./user-bonsai-list.component.css']
})
export class UserBonsaiListComponent implements OnInit {

  principalId: number | null = null;
  bonsaiSelected: Bonsai = new Bonsai();

  bonsaiPage: BonsaiPage | null = null;
  bonsaiModelList: Array<Bonsai> | null = null;
  pageNumbers: Array<number> = new Array();
  totalPages: number = 0;
  pageSize: number = 1;
  sortBy: string = 'creationDate';

  public BonsaiStyle = BonsaiStyle;

  pageSizeOptions: Array<number> = new Array();

  constructor(
    private bonsaiService: BonsaiService,
    private authService: AuthService
  ) {
    if(this.authService.principalValue != null && this.authService.principalValue.id != null) {
      this.principalId = this.authService.principalValue.id;
    }

    this.pageSizeOptions = Array.from({length: 15}, (x, i) => i+1);
  }

  ngOnInit(): void {
    this.bonsaiService.getBonsaisPage(this.principalId, 0, this.pageSize, this.sortBy)
        .subscribe({
          next: bonsaiPageRecived => {
            this.processBonsaiPageRecived(bonsaiPageRecived);
          }
        });
  }

  getBonsaiPage(pageNum: number) {
    this.bonsaiService.getBonsaisPage(this.principalId, pageNum, this.pageSize, this.sortBy)
        .subscribe({
          next: bonsaiPageRecived => {
            this.processBonsaiPageRecived(bonsaiPageRecived);
          }
        });
  }

  processBonsaiPageRecived(bonsaiPageRecived: BonsaiPage): void {
    this.bonsaiPage = bonsaiPageRecived;
    this.bonsaiModelList = bonsaiPageRecived._embedded.bonsaiModelList;
    this.pageNumbers = Array.from({length: bonsaiPageRecived.page.totalPages}, (x, i) => i);
    this.totalPages = bonsaiPageRecived.page.totalPages;
  }

  updatePageSize(): void {
    // pageSize property was already updated
    if(this.bonsaiPage?.page != null) {
      this.getBonsaiPage(this.bonsaiPage?.page.number);
    }
  }

  updateSortBy(): void {
    // sortBy property was already updated 
    if(this.bonsaiPage?.page) {
      this.getBonsaiPage(this.bonsaiPage.page.number);
    }
  }

  getBonsaiStyleValue(bonsai: Bonsai): string {
    let response: string = '';
    if(bonsai != null && bonsai.bonsaiStyle != null) {
      const bonsaiTypeKey = bonsai.bonsaiStyle as unknown as keyof typeof BonsaiStyle;
      response = BonsaiStyle[bonsaiTypeKey];
    }
    return response;
  } 

  getBonsaiTypeValue(bonsai: Bonsai): string {
    let response: string = '';
    if(bonsai && bonsai.bonsaiType) {
      const bonsaiTypeKey = bonsai.bonsaiType as unknown as keyof typeof BonsaiType;
      response = BonsaiType[bonsaiTypeKey];
    }
    return response;
  }

}
