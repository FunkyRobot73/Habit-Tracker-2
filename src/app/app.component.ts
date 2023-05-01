import { Component } from '@angular/core';
import { SQLiteConnection, CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.testDb();
  }
  async testDb() {
    const sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
    
    let db: SQLiteDBConnection = await sqlite.createConnection(
      'mydb', 
      false, 
      'no-encryption', 
      1, 
      false
      );

      try {
        await db.open();

        const schema = `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          age INTEGER
        );`;

        let result = await db.execute(schema);
        console.log("⚽ ~ file:app.component.ts:39 ~ AppComponent ~ testDb ~ result", result)

          const users = `
          DELETE FROM users;
          INSERT INTO users (id, email, age) VALUES (1, 'me49@me.ca', 49);
          INSERT INTO users (id, email, age) VALUES (2, 'me39@me.ca', 39);
          INSERT INTO users (id, email, age) VALUES (3, 'me29@me.ca', 29);
          `;

        result = await db.execute(users);
        console.log("⚽ ~ file:app.component.ts:39 ~ AppComponent ~ testDb ~ result", result)

          const res = await db.query('SELECT * FROM users');
          console.log(
            "⚽ ~ file:app.component.ts:39 ~ AppComponent ~ testDb ~ result", res
          );

          await sqlite.closeAllConnections();

      } catch (error) {
        console.log('ERROR', error);
        await sqlite.closeAllConnections();
    }
  }
};
