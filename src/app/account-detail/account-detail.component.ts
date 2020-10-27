import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css'],
})
export class AccountDetailComponent implements OnInit {
  accountDetailForm: FormGroup;
  accountDetails = {};
  edit: boolean = false;
  accountId: string = '';

  accoutnHolderName: String = null;
  accountNumber: Number = null;
  address: String = null;
  dob: Date = null;
  age: Number = null;
  gender: String = null;
  phoneNumber: Number = null;
  contactEmail: String = null;
  accountType: String = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private accountService: AccountService,
    private datePipe: DatePipe
  ) {
    this.actRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.accountId = id;
        this.edit = true;
        this.accountService.fetchAccountById(id).subscribe((data) => {
          this.editAccount(data);
          console.log(data);
        });
      }
    });
  }

  ngOnInit(): void {
    this.accountDetailForm = this.fb.group({
      accoutnHolderName: [null, Validators.required],
      accountNumber: [null, Validators.required],
      address: [null, Validators.required],
      dob: [null, Validators.required],
      age: [null],
      gender: [null],
      phoneNumber: [
        null,
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      contactEmail: [null, [Validators.required, Validators.email]],
      accountType: [null, Validators.required],
    });
  }

  editAccount(data) {
    var date = new Date(data.dateOfBirth);
    this.accountDetailForm.patchValue({
      accoutnHolderName: data.accountHolderName,
      accountNumber: data.accountNo,
      address: data.address,
      dob: this.datePipe.transform(date, 'yyyy-MM-dd'),
      age: data.age,
      gender: data.sex,
      phoneNumber: data.contactNo,
      contactEmail: data.contactEmail,
      accountType: data.accountType,
    });
  }

  onSubmit() {
    console.log('submitted');
    // console.log(this.accountDetailForm.value.accoutnHolderName);
    // console.log(this.accountDetailForm.value.address);
    // console.log(this.accountDetailForm.value.dob);
    // console.log(this.accountNumber);
    // console.log(this.accountDetailForm.value.age);
    // console.log(this.accountDetailForm.value.gender);
    // console.log(this.accountDetailForm.value.phoneNumber);
    // console.log(this.accountDetailForm.value.contactEmail);
    // console.log(this.accountDetailForm.value.accountType);
    this.accountDetails = {
      accountHolderName: this.accountDetailForm.value.accoutnHolderName,
      address: this.accountDetailForm.value.address,
      dateOfBirth: this.accountDetailForm.value.dob,
      accountNo: this.accountNumber,
      age: this.accountDetailForm.value.age,
      sex: this.accountDetailForm.value.gender,
      contactNo: this.accountDetailForm.value.phoneNumber,
      contactEmail: this.accountDetailForm.value.contactEmail,
      accountType: this.accountDetailForm.value.accountType,
    };

    if (this.edit) {
      this.accountService
        .updateAccount(this.accountDetails, this.accountId)
        .subscribe((data) => {
          console.log(data);
        });
    } else {
      this.accountService
        .newAccount(this.accountDetails)
        .subscribe((accounts) => {
          console.log(accounts);
        });
    }

    // this.router.navigate(['/home']);
  }

  generateAccountNumber() {
    var number = Math.floor(100000000 + Math.random() * 900000000);
    this.accountNumber = number;
    this.accountDetailForm.get('accountNumber').setValue(number);
    console.log(number);
  }
}
