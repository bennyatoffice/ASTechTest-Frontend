import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { AuthServiceService } from '../services/auth-service.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  displayedColumns: string[] = [
    'accountNo',
    'accountHolderName',
    'accountType',
    'actions',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private accountService: AccountService
  ) {
    this.accountService.fetchAccounts().subscribe((accounts: any) => {
      console.log(accounts);
      let data = [];

      for (let i = 0; i < accounts.length; i++) {
        data.push({
          _id: accounts[i]._id,
          accountNumber: accounts[i].accountNo,
          accountName: accounts[i].accountHolderName,
          accountType: accounts[i].accountType,
        });
      }
      this.dataSource = new MatTableDataSource<any>(data);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toNewAccount() {
    this.router.navigate(['/accountDetail']);
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['']);
  }
  toEditScrean(id) {
    this.router.navigate(['/editAccountDetail', id]);
    console.log(id);
  }
}
