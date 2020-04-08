# Shelter in Pets

During the COVID-19 pandemic, the various social distancing protocols are preventing many people from visiting shelters to adopt pets. Our app solves this problem by letting users search for adoptable dogs from the comfort and safety of their homes. It matches user-uploaded dog images to similar adoptable dogs, allows a user to conduct filtered searches based on desired traits, and even recommends adoptable dogs based on the user’s in-app activity.

Visit [Shelter-In-Pets](https://expo.io/@shelterinpets/ShelterInPets?release-channel=prod) to try our app!


## Table of Contents
- [Getting Started](#Getting-Started)
- [Team](#Team)
  - [Kate Lee](#Kate-Lee)
  - [Sonia Susanto](#Sonia-Susanto)
  - [Angela Vuong](#Angela-Vuong)
  - [Laura Armfield-Perez](#Laura-Armfield-Perez)
- [Tech Stack - Front End](#Tech-Stack---Front-End)
  - [React Native](#React-Native)
  - [Redux](#Redux)
  - [Expo](#Expo)
  - [Clarifai API](#Clarifai-API)	
- [Tutorial](#Tutorial)


## Getting Started

#### Note: This is the client side! You must clone the shelter-in-pets-server repo and follow the directions in the README.md https://github.com/sense-5/shelter-in-pets-server

To install Expo CLI:

```
npm install -g expo-cli
```

In one terminal:

```
cd <directory you want to download to>

git clone https://github.com/sense-5/shelter-in-pets.git

npm install

expo start
```

Go to http://localhost:19002/ to use Shelter in Pets!

## Tech Stack - Front End

### React Native

https://react-native.org/

- React Native is a JavaScript library for building mobile applications.

- React Native's framework that allows components to be built ontop of other components with their own state.

### Redux

https://redux.js.org/

- Redux is a JavaScript library that allows for state management.

- Redux works with React Native and Node.js to build user interfaces by retrieving data from the database and manages state in the client side.

### Expo

https://expo.io/

- Expo is an open-source platform for developing and publishing native apps for Android, iOS, and web browser. 

### Clarifai API

https://www.clarifai.com/

- Clarifai API is an image recognition service.

- Clarifai's predict API is called by passing in an image input. It will respond with a list of concepts and their corresponding probability scores. The probability score is the likelihood that the concepts are present within the image. 

## Team

#### Kate Lee

> Github: https://github.com/katherinelee703
>
> LinkedIn: https://www.linkedin.com/in/katherinelee703/

#### Sonia Susanto

> Github: https://github.com/soniasusanto
>
> LinkedIn: https://www.linkedin.com/in/soniasusanto/

#### Angela Vuong

> Github: https://github.com/avuong12
>
> LinkedIn: https://www.linkedin.com/in/avuong12/

#### Laura Armfield-Perez

> Github: https://github.com/Larmfieldperez
>
> LinkedIn: https://www.linkedin.com/in/laura-armfield-perez/

## Tutorial

After logging in, you can start by scrolling through all the dogs available for adoption. Upload a picture of a dog you want to search for. Select a sub-breed. Click on a dog and you will see more information.

<img src='https://github.com/sense-5/shelter-in-pets/blob/master/assets/gif/browseAndSelect.gif' width='30%' height='30%' />

Use the search by filter feature to selected your desired dog attributes.

<img src='https://github.com/sense-5/shelter-in-pets/blob/master/assets/gif/filterSearchAndLike.gif' width='30%' height='30%' />

Like a dog and you will see it on your list of Favorite Dogs.

<img src='https://github.com/sense-5/shelter-in-pets/blob/master/assets/gif/likeAndFavorites.gif' width='30%' height='30%' />

Click on "recommendations" and you can swipe through dogs recommended to you base on your view and like history. Once you have found your dog, you can contact the shelter via email, phone, or get the shelter location.

<img src='https://github.com/sense-5/shelter-in-pets/blob/master/assets/gif/recAndFinalPick.gif' width='30%' height='30%' />
