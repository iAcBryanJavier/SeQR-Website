// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  logging:{
    isfirebase: true,
    loglevel: "Warn",
    dblogging: true
  },
  firebase: {
    projectId: 'seqr-e7c21',
    appId: '1:189848402742:web:9d37c1df949acacf875197',
    storageBucket: 'seqr-e7c21.appspot.com',
    apiKey: 'AIzaSyAMt571lgisQ-b5oYhyb7567XVojIBAIrc',
    authDomain: 'seqr-e7c21.firebaseapp.com',
    messagingSenderId: '189848402742',
    measurementId: 'G-HKP4VM7RV5',
    databaseURL: 'https://seqr-e7c21-default-rtdb.asia-southeast1.firebasedatabase.app',
  
  },
  pinatacloud: {
    apiKey: '69d53fc98f91ee0e671c',
    apiJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4ZTg1NzRmYi03NTRjLTRlNWItYWE2NC0yMzQ0YTgxNTc3ODUiLCJlbWFpbCI6ImNhcmxtZXJjYWRvYXpAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjY5ZDUzZmM5OGY5MWVlMGU2NzFjIiwic2NvcGVkS2V5U2VjcmV0IjoiOTAwNjFhZWY1ZmRiNTQxZDI2NjUyMTBmZGQ1NzRhNTlmY2RmOGMyMWI3NjU3ZmY0ZDVkZmIzODgwMDA1OTZlZCIsImlhdCI6MTY3NjI2NTU3MX0.Gwye_siTItfmkSkxRT0wv08dxoldvd79TTMczzRdMBs', 
    apiSecret: '90061aef5fdb541d2665210fdd574a59fcdf8c21b7657ff4d5dfb388000596ed',
  },

  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
