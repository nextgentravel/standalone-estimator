let list = [
    {
      "city": "Edmonton",
      "suburbOf": "Edmonton",
      "province": "AB"
    },
    {
      "city": "Leduc",
      "suburbOf": "Edmonton",
      "province": "AB"
    },
    {
      "city": "Nisku",
      "suburbOf": "Edmonton",
      "province": "AB"
    },
    {
      "city": "Saint-Albert",
      "suburbOf": "Edmonton",
      "province": "AB"
    },
    {
      "city": "Sherwood Park",
      "suburbOf": "Edmonton",
      "province": "AB"
    },
    {
      "city": "Abbotsford",
      "suburbOf": "Vancouver",
      "province": "BC"
    },
    {
      "city": "Burnaby",
      "suburbOf": "Vancouver",
      "province": "BC"
    },
    {
      "city": "Coquitlam",
      "suburbOf": "Vancouver",
      "province": "BC"
    },
    {
      "city": "Delta",
      "suburbOf": "Vancouver",
      "province": "BC"
    },
    {
      "city": "Langley",
      "suburbOf": "Vancouver",
      "province": "BC"
    },
    {
      "city": "Maple Ridge",
      "suburbOf": "Vancouver",
      "province": "BC"
    },
    {
      "city": "Mission",
      "suburbOf": "Vancouver",
      "province": "BC"
    },
    {
      "city": "New Westminster",
      "suburbOf": "Vancouver",
      "province": "BC"
    },
    {
      "city": "North Vancouver",
      "suburbOf": "Vancouver",
      "province": "BC"
    },
    {
      "city": "Pitt Meadows",
      "suburbOf": "Vancouver",
      "province": "BC"
    },
    {
      "city": "Port Coquitlam",
      "suburbOf": "Vancouver",
      "province": "BC"
    },
    {
      "city": "Port Moody",
      "suburbOf": "Vancouver",
      "province": "BC"
    },
    {
      "city": "Richmond",
      "suburbOf": "Vancouver",
      "province": "BC"
    },
    {
      "city": "Surrey",
      "suburbOf": "Vancouver",
      "province": "BC"
    },
    {
      "city": "Vancouver",
      "suburbOf": "Vancouver",
      "province": "BC"
    },
    {
      "city": "Walnut Grove",
      "suburbOf": "Vancouver",
      "province": "BC"
    },
    {
      "city": "West Vancouver",
      "suburbOf": "Vancouver",
      "province": "BC"
    },
    {
      "city": "White Rock",
      "suburbOf": "Vancouver",
      "province": "BC"
    },
    {
      "city": "Colwood",
      "suburbOf": "Victoria",
      "province": "BC"
    },
    {
      "city": "Cordova Bay",
      "suburbOf": "Victoria",
      "province": "BC"
    },
    {
      "city": "Esquimalt",
      "suburbOf": "Victoria",
      "province": "BC"
    },
    {
      "city": "Goldstream",
      "suburbOf": "Victoria",
      "province": "BC"
    },
    {
      "city": "Langford",
      "suburbOf": "Victoria",
      "province": "BC"
    },
    {
      "city": "North Saanich",
      "suburbOf": "Victoria",
      "province": "BC"
    },
    {
      "city": "Oak Bay",
      "suburbOf": "Victoria",
      "province": "BC"
    },
    {
      "city": "Saanich",
      "suburbOf": "Victoria",
      "province": "BC"
    },
    {
      "city": "Saanichton",
      "suburbOf": "Victoria",
      "province": "BC"
    },
    {
      "city": "Sidney",
      "suburbOf": "Victoria",
      "province": "BC"
    },
    {
      "city": "Victoria",
      "suburbOf": "Victoria",
      "province": "BC"
    },
    {
      "city": "View Royal",
      "suburbOf": "Victoria",
      "province": "BC"
    },
    {
      "city": "Dieppe",
      "suburbOf": "Moncton",
      "province": "NB"
    },
    {
      "city": "Moncton",
      "suburbOf": "Moncton",
      "province": "NB"
    },
    {
      "city": "Quispamsis",
      "suburbOf": "Saint John",
      "province": "NB"
    },
    {
      "city": "Saint John",
      "suburbOf": "Saint John",
      "province": "NB"
    },
    {
      "city": "Dartmouth",
      "suburbOf": "Halifax",
      "province": "NS"
    },
    {
      "city": "Enfield",
      "suburbOf": "Halifax",
      "province": "NS"
    },
    {
      "city": "Fall River",
      "suburbOf": "Halifax",
      "province": "NS"
    },
    {
      "city": "Goffs",
      "suburbOf": "Halifax",
      "province": "NS"
    },
    {
      "city": "Halifax",
      "suburbOf": "Halifax",
      "province": "NS"
    },
    {
      "city": "North Sydney",
      "suburbOf": "Sydney",
      "province": "NS"
    },
    {
      "city": "Sydney",
      "suburbOf": "Sydney",
      "province": "NS"
    },
    {
      "city": "Belleville",
      "suburbOf": "Belleville",
      "province": "ON"
    },
    {
      "city": "Trenton",
      "suburbOf": "Belleville",
      "province": "ON"
    },
    {
      "city": "Waterloo",
      "suburbOf": "Kitchener",
      "province": "ON"
    },
    {
      "city": "Cambridge",
      "suburbOf": "Kitchener",
      "province": "ON"
    },
    {
      "city": "Guelph",
      "suburbOf": "Kitchener",
      "province": "ON"
    },
    {
      "city": "Kitchener",
      "suburbOf": "Kitchener",
      "province": "ON"
    },
    {
      "city": "Preston",
      "suburbOf": "Kitchener",
      "province": "ON"
    },
    {
      "city": "Cumberland",
      "suburbOf": "Ottawa",
      "province": "ON"
    },
    {
      "city": "Gatineau (QC)",
      "suburbOf": "Ottawa",
      "province": "ON"
    },
    {
      "city": "Gloucester",
      "suburbOf": "Ottawa",
      "province": "ON"
    },
    {
      "city": "Gouldbourn",
      "suburbOf": "Ottawa",
      "province": "ON"
    },
    {
      "city": "Kanata",
      "suburbOf": "Ottawa",
      "province": "ON"
    },
    {
      "city": "Manotick",
      "suburbOf": "Ottawa",
      "province": "ON"
    },
    {
      "city": "Nepean",
      "suburbOf": "Ottawa",
      "province": "ON"
    },
    {
      "city": "Orleans",
      "suburbOf": "Ottawa",
      "province": "ON"
    },
    {
      "city": "Ottawa",
      "suburbOf": "Ottawa",
      "province": "ON"
    },
    {
      "city": "Stittsville",
      "suburbOf": "Ottawa",
      "province": "ON"
    },
    {
      "city": "Fort Erie",
      "suburbOf": "St. Catharines",
      "province": "ON"
    },
    {
      "city": "Niagara Falls",
      "suburbOf": "St. Catharines",
      "province": "ON"
    },
    {
      "city": "Niagara-on-the-Lake,Thorold",
      "suburbOf": "St. Catharines",
      "province": "ON"
    },
    {
      "city": "St. Catharines",
      "suburbOf": "St. Catharines",
      "province": "ON"
    },
    {
      "city": "Welland",
      "suburbOf": "St. Catharines",
      "province": "ON"
    },
    {
      "city": "Mississauga",
      "suburbOf": "Toronto",
      "province": "ON"
    },
    {
      "city": "Scarborough",
      "suburbOf": "Toronto",
      "province": "ON"
    },
    {
      "city": "Ajax",
      "suburbOf": "Toronto",
      "province": "ON"
    },
    {
      "city": "Brampton",
      "suburbOf": "Toronto",
      "province": "ON"
    },
    {
      "city": "Burlington",
      "suburbOf": "Toronto",
      "province": "ON"
    },
    {
      "city": "Etobicoke",
      "suburbOf": "Toronto",
      "province": "ON"
    },
    {
      "city": "Hamilton",
      "suburbOf": "Toronto",
      "province": "ON"
    },
    {
      "city": "Markham",
      "suburbOf": "Toronto",
      "province": "ON"
    },
    {
      "city": "Milton",
      "suburbOf": "Toronto",
      "province": "ON"
    },
    {
      "city": "North York",
      "suburbOf": "Toronto",
      "province": "ON"
    },
    {
      "city": "Oakville",
      "suburbOf": "Toronto",
      "province": "ON"
    },
    {
      "city": "Oshawa",
      "suburbOf": "Toronto",
      "province": "ON"
    },
    {
      "city": "Pickering",
      "suburbOf": "Toronto",
      "province": "ON"
    },
    {
      "city": "Richmond Hill",
      "suburbOf": "Toronto",
      "province": "ON"
    },
    {
      "city": "Thornhill",
      "suburbOf": "Toronto",
      "province": "ON"
    },
    {
      "city": "Toronto",
      "suburbOf": "Toronto",
      "province": "ON"
    },
    {
      "city": "Vaughan",
      "suburbOf": "Toronto",
      "province": "ON"
    },
    {
      "city": "Whitby",
      "suburbOf": "Toronto",
      "province": "ON"
    },
    {
      "city": "York",
      "suburbOf": "Toronto",
      "province": "ON"
    },
    {
      "city": "Tecumseh",
      "suburbOf": "Windsor",
      "province": "ON"
    },
    {
      "city": "Windsor",
      "suburbOf": "Windsor",
      "province": "ON"
    },
    {
      "city": "Slemon Park",
      "suburbOf": "Summerside",
      "province": "PE"
    },
    {
      "city": "Summerside",
      "suburbOf": "Summerside",
      "province": "PE"
    },
    {
      "city": "Gatineau",
      "suburbOf": "Ottawa",
      "province": "ON"
    },
    {
      "city": "Cap-aux-Meules",
      "suburbOf": "Îles-de-la Madeleine",
      "province": "QC"
    },
    {
      "city": "Îles-de-la Madeleine",
      "suburbOf": "Îles-de-la Madeleine",
      "province": "QC"
    },
    {
      "city": "Dollard-des-Ormeaux",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Lachine",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Laval",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Pointe-Claire",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Senneville",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Ahuntsic-Cartierville",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Anjou",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Baie-d’Urfé",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Beaconsfield",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Blainville",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Boucherville",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Brossard",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Côte-Saint-Luc",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Dorval",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Kirkland",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Lachenaie",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Lasalle",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Laval-des-Rapides",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Lemoyne",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Longueuil",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Lorraine",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Montréal",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Montréal-Est",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Montréal-Nord",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Pierrefonds",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Plateau-Mont-Royal",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Pointe-Aux-Trembles",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Pont-Viau",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Rosemère",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Roxboro",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Saint-Hubert",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Saint-Lambert",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Saint-Laurent",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Saint-Léonard",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Sainte-Dorothée",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Sainte-Geneviève",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Sainte-Julie",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Sainte-Rose",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Sainte-Thérèse",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Terrebonne",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Tétreaultville",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Vaudreuil",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Westmount",
      "suburbOf": "Montréal",
      "province": "QC"
    },
    {
      "city": "Sainte-Foy",
      "suburbOf": "Québec",
      "province": "QC"
    },
    {
      "city": "Beauport",
      "suburbOf": "Québec",
      "province": "QC"
    },
    {
      "city": "Boischâtel",
      "suburbOf": "Québec",
      "province": "QC"
    },
    {
      "city": "Cap-Rouge",
      "suburbOf": "Québec",
      "province": "QC"
    },
    {
      "city": "Charlesbourg",
      "suburbOf": "Québec",
      "province": "QC"
    },
    {
      "city": "Lévis",
      "suburbOf": "Québec",
      "province": "QC"
    },
    {
      "city": "L’Ancienne-Lorette",
      "suburbOf": "Québec",
      "province": "QC"
    },
    {
      "city": "Québec",
      "suburbOf": "Québec",
      "province": "QC"
    },
    {
      "city": "Sillery",
      "suburbOf": "Québec",
      "province": "QC"
    },
    {
      "city": "Valcartier",
      "suburbOf": "Québec",
      "province": "QC"
    },
    {
      "city": "Wendake",
      "suburbOf": "Québec",
      "province": "QC"
    },
    {
      "city": "Chicoutimi",
      "suburbOf": "Saguenay",
      "province": "QC"
    },
    {
      "city": "Jonquière",
      "suburbOf": "Saguenay",
      "province": "QC"
    },
    {
      "city": "La Baie",
      "suburbOf": "Saguenay",
      "province": "QC"
    },
    {
      "city": "Laterrière",
      "suburbOf": "Saguenay",
      "province": "QC"
    },
    {
      "city": "Saguenay",
      "suburbOf": "Saguenay",
      "province": "QC"
    },
    {
      "city": "Deauville",
      "suburbOf": "Sherbrooke",
      "province": "QC"
    },
    {
      "city": "Fleurimont",
      "suburbOf": "Sherbrooke",
      "province": "QC"
    },
    {
      "city": "Lennoxville",
      "suburbOf": "Sherbrooke",
      "province": "QC"
    },
    {
      "city": "Mont-Bellevue",
      "suburbOf": "Sherbrooke",
      "province": "QC"
    },
    {
      "city": "Rock Forest",
      "suburbOf": "Sherbrooke",
      "province": "QC"
    },
    {
      "city": "Saint-Élie",
      "suburbOf": "Sherbrooke",
      "province": "QC"
    },
    {
      "city": "Sherbrooke",
      "suburbOf": "Sherbrooke",
      "province": "QC"
    }
  ]
  
  list = list.filter(item => item.city !== item.suburbOf)

  list = list.map(item => {
      return {
          ...item,
          queryProvince: item.province
      }
  })

  console.log(JSON.stringify(list, 0, 2));