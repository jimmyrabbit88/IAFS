// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyB8yti03zK-LBtwof35q5bys_Gm2EYMQw4",
    authDomain: "iafs-fbf21.firebaseapp.com",
    databaseURL: "https://iafs-fbf21.firebaseio.com",
    projectId: "iafs-fbf21",
    storageBucket: "iafs-fbf21.appspot.com",
    messagingSenderId: "296333589028",
    appId: "1:296333589028:web:095a1da0e549bf13ad76b1",
    measurementId: "G-KYY8TW4PH0"
  }
 
  // firebase: {
  //   apiKey: process.env.APIKEY,
  //   authDomain: process.env.AUTHDOMAIN,
  //   databaseURL: process.env.DATABASEURL,
  //   projectId: process.env.PROJECTID,
  //   storageBucket: process.env.STORAGEBUCKET,
  //   messagingSenderId: process.env.MESSAGINGSENDERID,
  //   appId: process.env.APPID,
  //   measurementId: process.env.MEASUREMENTID
  // }
 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
