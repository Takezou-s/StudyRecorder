import Session from "./scripts/Logic/Session.js";

const session1 = new Session("Oturum - 1");
const session2 = new Session("Oturum - 2", session1);
const session3 = new Session("Oturum - 3", session1);
const session4 = new Session("Oturum - 4", session1);
const session5 = new Session("Oturum - 5", session1);
const session6 = new Session("Oturum - 6", session1);
const session7 = new Session("Oturum - 7", session1);
const session8 = new Session("Oturum - 8", session1);
const session9 = new Session("Oturum - 9", session1);
console.log(JSON.stringify(session2));
