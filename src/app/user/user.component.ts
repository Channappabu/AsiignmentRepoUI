import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';  
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Observable } from 'rxjs'; 
import {UserDetails}  from '../user-details'
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit { 
  dataSaved = false;  
  userForm: any;  
  allUsers: Observable<UserDetails[]>;  
  userIdUpdate = null;  
  massage = null; 
  

  constructor(private formbulider: FormBuilder, private userService:UserServiceService) { }

  ngOnInit(): void {

    this.userForm = this.formbulider.group({  
      Name: ['', [Validators.required]],  
      DateOfBirth: ['', [Validators.required]],  
      Designation: ['', [Validators.required]],  
      Skills: ['', [Validators.required]],        
    });  
    this.loadAllUsers(); 

  }
 
  onItemSelect(item: any) {
    console.log('onItemSelect', item);
}
onSelectAll(items: any) {
    console.log('onSelectAll', items);
}

  loadAllUsers() {  
    this.allUsers = this.userService.getAllUser();  
  } 

  onFormSubmit() {  
    this.dataSaved = false;  
    const employee = this.userForm.value;  
    this.CreateUser(employee);  
    this.userForm.reset();  
  }  

  loadUserToEdit(userId: string) {  
    this.userService.getUserById(userId).subscribe(user=> {  
      this.massage = null;  
      this.dataSaved = false;
         
      this.userIdUpdate = user[0].Id;  
      this.userForm.controls['Name'].setValue(user[0].Name);  
     this.userForm.controls['DateOfBirth'].setValue(user[0].DateOfBirth);  
      this.userForm.controls['Designation'].setValue(user[0].Designation);  
      this.userForm.controls['Skills'].setValue(user[0].Skills);        
    });  
  
  }  
  CreateUser(user: UserDetails) {  
    if (this.userIdUpdate == null) {  
      this.userService.createUser(user).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.massage = 'Record saved Successfully';  
          this.loadAllUsers();  
          this.userIdUpdate = null;  
          this.userForm.reset();  
        }  
      );  
    } else {  
      user.Id = this.userIdUpdate;  
      this.userService.updateEmployee(user).subscribe(() => {  
        this.dataSaved = true;  
        this.massage = 'Record Updated Successfully';  
        this.loadAllUsers();  
        this.userIdUpdate = null;  
        this.userForm.reset();  
      });  
    }  
  }   
  deleteUser(userId: string) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.userService.deleteUserById(userId).subscribe(() => {  
      this.dataSaved = true;  
      this.massage = 'Record Deleted Succefully';  
      this.loadAllUsers();  
      this.userIdUpdate = null;  
      this.userForm.reset();  
  
    });  
  }  
}  
  resetForm() {  
    this.userForm.reset();  
    this.massage = null;  
    this.dataSaved = false;  
  }  



}
