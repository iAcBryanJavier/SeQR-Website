// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  encryption:{
    key:'WWr6uNAfSUTRLO1qoHnfjAPnzfzSJ5Z1',
    iv: 'SHVXoDiMdH4PHQQ3yt0952Jglb39AmhH'
  },
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
    apiKey: '6fd36318b68fbfe0ab29',
    apiJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5OTI4ODdmMi05Y2Y5LTQzOTctOGRiZC00MDU4ZTY0MTBkOWYiLCJlbWFpbCI6IjIwMTkwMTE2NUBpYWNhZGVteS5lZHUucGgiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNmZkMzYzMThiNjhmYmZlMGFiMjkiLCJzY29wZWRLZXlTZWNyZXQiOiI1YzY4NjcxZmUxNGFjNDc3YjRlZWE5MDM0NTRiOTk4MDBjMjY1Yzc1OWE0YmY3Nzg5ZDlkMTgzZGY4MjdlOWZjIiwiaWF0IjoxNjc3NTc5MzEzfQ.VqV0UI1QM-SIuGzUDNSUtwSNbYajTu4mPBpntViqsCw',
    apiSecret: '5c68671fe14ac477b4eea903454b99800c265c759a4bf7789d9d183df827e9fc',
  },

  production: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
