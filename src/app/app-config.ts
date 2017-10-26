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
    ]
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