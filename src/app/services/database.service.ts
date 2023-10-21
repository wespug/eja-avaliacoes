import { Injectable, WritableSignal, signal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

const DB_USERS = "sesi_eja_db";

export interface User {
  id: number;
  name: string;
  active: number,
}

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private users: WritableSignal<User[]> = signal<User[]>([]);

  constructor() { }

  async initializePlugin(){
    this.db = await this.sqlite.createConnection(
      DB_USERS, 
      false, 
      'no-encryption', 
      1, 
      false
    ); 
    
    await this.db.open();
    
    const schema = 'CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, active INTEGER DEFAULT 1 );';
    await this.db.execute(schema);
    this.loadUers();
    return true;
  }

  getUsers(){
    return this.users;
  }
  //CRUD
  async loadUers(){
    const users = await this.db.query('SELECT * FROM users');
    this.users.set(users.values || []);
    console.log("Carregar Usuarios");
  }
  
  async addUser(name: string){
    const query = `INSERT INTO users (name) VALUES ('${name}')`;
    const result = await this.db.query(query);
    this.loadUers();
    console.log("Adicionar Usuario " + name);
    return result;

  }

  async updateUserById(id: String, active: number){
    const query = `UPDATE users SET active=${active} WHERE id=${id}`;
    const result = await this.db.query(query);
    this.loadUers();
    console.log("Atulizar Usuario " + id);
    return result;
  }

  async deleteUserById(id:string){
    const query = `DELETE FROM users WHERE id=${id}`;
    const result = await this.db.query(query);
    this.loadUers();
    console.log("Deletar  Usuario " + id);
    return result;
  }


}
