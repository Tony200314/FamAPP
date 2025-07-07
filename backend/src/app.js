import bcrypt from 'bcrypt';

const password = "qwerty"; 

const hash = bcrypt.hashSync(password, 10);

console.log(password, hash); 