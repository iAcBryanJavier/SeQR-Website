export class ManongService {

  loggedIn: boolean = false;

  isAuthenticated() {
    console.log(this.loggedIn)
    return this.loggedIn;
  }
}
