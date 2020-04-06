import { upperCase } from './utils';

export const breedPrediction = (concepts, breeds) => {
  let result = [];
  let conceptsToIgnore = [
    'dog',
    'pet',
    'one',
    'miniature',
    'toy',
    'field',
    'eskimo',
    'breed',
    'coat',
    'wolf',
    'grey',
    'snow',
    'water',
    'lake',
    'hair',
    'mountain',
    'sea',
  ];
  let breedsToIgnore = ['shepherd', 'retriever', 'sheepdog', 'spaniel'];
  //check if image uploaded has a dog
  let dogIsPresent = false;
  for (let i = 0; i < concepts.length; i++) {
    if (concepts[i].name === 'dog') {
      dogIsPresent = !dogIsPresent;
    }
  }
  if (dogIsPresent === false) {
    return (result = []);
  }

  //for each predicted concept/breed, if it is not in the ignored list above, check if it matches a breed from petfinderAPI
  concepts.forEach((concept) => {
    if (!conceptsToIgnore.includes(concept.name.toLowerCase())) {
      breeds.forEach((breed) => {
        if (breed.includes(concept.name.toLowerCase())) {
          result.push(concept.name.toLowerCase());
        }
      });
    }
  });

  //get rid of duplicates
  result = result.filter((breed, index) => {
    return result.indexOf(breed) === index;
  });

  //get rid of general breed names
  if (result.length > 1) {
    result = result.filter((breed) => {
      return !breedsToIgnore.includes(breed);
    });
  }

  if (result.length !== 0) {
    for (let i = 0; i < result.length; i++) {
      //check for huskies
      if (result[i] === 'siberian') {
        result = ['siberian husky'];
      }

      //check for pomeranians
      if (result[i] === 'pomeranian') {
        result = ['pomeranian'];
      }
      //check for boxers
      if (result[i] === 'boxer') {
        result = ['boxer'];
      }
    }
  }

  return result;
};

function getBreedOptions(breeds, dogBreed) {
  let result = [];
  if (dogBreed === 'German Shepherd') {
    dogBreed = 'Shepherd';
  } else if (dogBreed === 'Siberian Husky') {
    dogBreed = 'Husky';
  }

  breeds.forEach((breed) => {
    if (breed.includes(dogBreed.toLowerCase())) {
      result.push(upperCase(breed));
    }
  });

  if (dogBreed === 'Spitz') {
    result = result.concat([
      'Akita',
      'Alaskan Malamute',
      'American Eskimo Dog',
      'Chow Chow',
      'Shiba Inu',
      'Samoyed',
    ]);
  }

  result = result.sort();

  //filter out dogs with / in their names

  result = result.filter((breed) => {
    return !breed.includes('/');
  });

  result = result.map((breed, idx) => {
    return {
      name: breed,
      key: idx,
    };
  });

  return result;
}

function getDogImages(dogs) {
  let result = [];

  //filter out dogs without images
  dogs = dogs.filter((dog) => {
    return dog.photos.length !== 0;
  });
  result = dogs.map((dog) => {
    return {
      uri: dog.photos[0].full,
      dog: dog,
      key: dog.id,
    };
  });
  return result;
}

module.exports = { breedPrediction, getBreedOptions, getDogImages };
