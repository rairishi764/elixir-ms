// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  deployment :{
    labApi :"http://localhost:3002/api/",
    reportApi: 'http://localhost:5001/api/',
    mailApi: 'http://localhost:5000/api/'
  },
  clientdetails:{
    name:'MDMC',
    fullname:'Maharani Devi Medical Center',
    address:'No.8, 7th Cross, Agara Main Road, Babusahebpalya, Bangalore- 560 043',
    email:'E: mdmcmedical@gmail.com',
    website:'W: mdmd.in',
    phone:'P:(0)80 4890 2039, M:9845380011',
    sms_phone:'+13466169573',
    whatsapp_phone:'+14155238886'
  },
  firebase: {
    apiKey: "AIzaSyCMiS8O_uXK6GHiVpHwc97nlFx4v89E640",
    authDomain: "elixir-ba0ec.firebaseapp.com",
    databaseURL: "https://elixir-ba0ec.firebaseio.com",
    projectId: "elixir-ba0ec",
    storageBucket: "elixir-ba0ec.appspot.com",
    messagingSenderId: "927290938054",
    appId: "1:927290938054:web:b0ee967d7be9ca2ba8bdc7",
    measurementId: "G-1M1K6Q7JL6",

    clientId:"475376735430-gmjaoaap50p0ft3r46sb4nt3tbeh3ocv.apps.googleusercontent.com",
    clientSecret:"P_uS92w_WX5P8K74lNFfap5F"
  },
  services:{
  consultantservice:{
    "forms":
    {
      "formname": "Consultation Services",
      "attributes": [

        {
          "placeholder": "Consultation Service",
          "type": "text",
          "class": "form-control",
          "formControlName": "name"
        },
        {
          "placeholder": "Service Description",
          "type": "text",
          "class": "form-control",
          "formControlName": "description"
        }

      ],
      "submiturl": "localhost:3002/consultationservice/"
    }
}
}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
