const fs=require('fs');
const U='C:/Users/Leap_/Documents/ChatGPT/排球/deploy/upload.ps1';
let u=fs.readFileSync(U,'utf8');
u=u.replace('$server:$dest','${server}:${dest}');
fs.writeFileSync(U,u);
console.log('done; contains ${server}:${dest}:', u.includes('${server}:${dest}'));