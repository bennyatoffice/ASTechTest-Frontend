import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  url: string = 'http://localhost:3000/';

  // Add new Account
  newAccount(accountDetails) {
    return this.http.post(this.url + 'accounts', accountDetails);
  }

  //update account
  updateAccount(account, id) {
    console.log('test');

    console.log(account);

    return this.http.patch(this.url + 'accounts/' + id, account);
  }
  //delete account

  //list accounts
  fetchAccounts() {
    return this.http.get(this.url + 'accounts');
  }

  // Fetch by Id
  fetchAccountById(id) {
    return this.http.get(this.url + 'accounts/' + id);
  }
}
