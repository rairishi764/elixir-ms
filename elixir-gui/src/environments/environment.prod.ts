export const environment = {
  production: true,

  deployment :{
    labApi :"http://15.206.66.198:3002/api/",
    reportApi: 'http://15.206.66.198:5001/api/',
    mailApi: 'http://15.206.66.198:5000/api/'
  },
  clientdetails:{
    name:'MDMC',
    fullname:'Maharani Devi Medical Center',
    address:'No.8, 7th Cross, Agara Main Road, Babusahebpalya, Bangalore- 560 043',
    email:'E: mdmcmedical@gmail.com',
    website:'W: mdmd.in',
    phone:'P:(0)80 4890 2039, M:9845380011'
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
