import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { DatabaseService, User } from '../services/database.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonIcon, IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonicModule, FormsModule, CommonModule],
})
export class HomePage {
  users = this.database.getUsers();
  newUserName = '';

  constructor(private database:DatabaseService) {
    this.users = this.database.getUsers();
    console.log(this.users.length);

  }

  async log(){
    this.users = this.database.getUsers();
    console.log(this.users.length);
  }
  async createUser(){
    this.newUserName = "Usuario " + (Math.random() * 9999);
    await this.database.addUser(this.newUserName);
    this.newUserName = '';
  }

  updateUser(user: User){
    const active = user.active ? 1:0;
    this.database.updateUserById(user.id.toString(), active);
  }

  deleteUser(user:User){
    console.log(user.id);
    this.database.deleteUserById(user.id.toString());
  }
}


