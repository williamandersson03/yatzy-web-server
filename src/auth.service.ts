import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
const testPass = '$2b$10$B5U./0UYKB1B9ZYitfEc1OWzKhqb/0XqMk4B0UWQksP8MLfgCiMxS'; // hashed "test1"

@Injectable()
export class AuthService {
  async login(username: string, password: string): Promise<string> {
    // Hämta det hashade lösenordet från databasen baserat på användarnamnet
    // Test lösenordet är "test1"
    const hashedPasswordFromDatabase = testPass;

    // Verifiera lösenordet
    const match = await bcrypt.compare(password, hashedPasswordFromDatabase);
    if (match) {
      // Lösenordet matchar
      console.log('Login successful!');
      return 'Login successful!'; // Returnera ett svar
    } else {
      // Lösenordet matchar inte
      console.log('Invalid password!');
      return 'Invalid password!';
    }
  }
}
