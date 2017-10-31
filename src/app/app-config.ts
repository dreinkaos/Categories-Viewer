 export const AppConfigurations = {
    ROOTLEVEL: 'ARCATOMO', //categoria omogenea
    SECONDLEVEL: 'ARCODFAM', //famiglia
    THIRDLEVEL: 'ARGRUMER', //gruppo merceologico
    COLUMNS : [
      {"key": "ARCODART", "value": "Codice articolo"},
      {"key": "ARDESART", "value": "Articolo"},
      {"key": "ARGRUMER", "value": "Codice gruppo merceologico"},
      {"key": "GMDESCRI", "value": "Gruppo merceologico"},
      {"key": "ARCODFAM", "value": "Codice famiglia"},
      {"key": "FADESCRI", "value": "Famiglia"},
      {"key": "ARCATOMO", "value": "Codice categoria omogenea"},
      {"key": "OMDESCRI", "value": "Categoria omogenea"}    
    ],
    SERVER_ADDRESS: "http://srv-app/node/express/api/"

 }