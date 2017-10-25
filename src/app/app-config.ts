 export const AppConfigurations = {
    ROOTLEVEL: 'ARCATOMO', //categoria omogenea
    SECONDLEVEL: 'ARCODFAM', //famiglia
    THIRDLEVEL: 'ARGRUMER', //gruppo merceologico
    COLUMNS : {
        "ARCODART" : {"label": "Codice articolo"},
        "ARDESART" : {"label": "Articolo"},
        "ARGRUMER" : {"label": "Codice gruppo merceologico"},
        "GMDESCRI" : {"label": "Gruppo merceologico"},
        "ARCODFAM" : {"label": "Codice famiglia"},
        "FADESCRI" : {"label": "Famiglia"},
        "ARCATOMO" : {"label": "Codice categoria omogenea"},
        "OMDESCRI" : {"label": "Categoria omogenea"}    
      }
 }

/*
 export const AppConfigurations = {
  rootLevel: {
    name: 'ARCATOMO',
    label: "Categoria omogenea",
    resource: "homogeneousCategories"
},

secondLevel: {
  name: 'ARCODFAM',
  label: "Famiglia",
  resource: "familyCategories"
},

thirdLevel: {
  name: 'ARGRUMER',
  label: "Gruppo merceologico",
  resource: "merceologicalCategories"
},

article: {
  name: 'ARCODART',
  label: "Articolo",
  resource: "articles"
}
  
 }*/