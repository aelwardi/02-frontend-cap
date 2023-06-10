import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  profileForm!: FormGroup;


  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      firstName: ['John'],
      lastName: ['Doe'],
      dateBirth: ['1990-01-01'],
      phone: ['0123456789'],
      gender: ['Male'],
      email: ['john@example.com'],
      password: ['********'],
      accountStatus: ['Active']
    });
  }
}
