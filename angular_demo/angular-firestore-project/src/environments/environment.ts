// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDQT66ygrBXJWVx5tE1rrq4v5F8lX-_3Xg",
    authDomain: "angular-firestore-project.firebaseapp.com",
    databaseURL: "https://angular-firestore-project.firebaseio.com",
    projectId: "angular-firestore-project",
    storageBucket: "angular-firestore-project.appspot.com",
    messagingSenderId: "1089847279841"
  }
};
