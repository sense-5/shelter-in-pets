# Shelter in Pets

During the COVID-19 pandemic, it important that people follow social distancing protocols. This prevents many people from visiting shelters to adopt pets that needs a home. Shelter in Pets is a pet adoption app that helps a user find their perfect pet from the safety of their home. The user can browse real adoptable dogs through the Petfinder API.
The app uses Clarifai API to predict the breed of the dog when a user uploads a picture. Users can also search for dogs by selecting specific dog attributes.
When a user views a dog, they can see information about the dog, like the dog, contact the shelter via phone or email, and get the location of the shelter.
The user can visit the dogs they have liked in "Favorites" and edit the list. The app makes recommendations of dogs to the user based on their view and like history.
Adopting a dog has never been more fun or easy!

## Getting Started

#### Note: This is the client side! You must clone the shelter-in-pets-server repo and follow the directions in the README.md https://github.com/sense-5/shelter-in-pets-server

```
To install Expo CLI:

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

React-Native

Redux

Expo

Clarfai API

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

After logging in, you can start by scrolling through all the dogs avaiable for adoption.

Upload a picture of a dog you want to search for. Select a sub-breed.

Click on a dog and you will see more information.

<img src='https://github.com/sense-5/shelter-in-pets/blob/readme/assets/gif/browseAndSelect.gif' width='50%' height='50%' />

Use the search by filter feature to selected your desired dog attributes.

<img src='https://github.com/sense-5/shelter-in-pets/blob/readme/assets/gif/filterSearchAndLike.gif' width='50%' height='50%' />

Like a dog and you will see it on your list of Favorite Dogs.

<img src='https://github.com/sense-5/shelter-in-pets/blob/readme/assets/gif/likeAndFavorites.gif' width='50%' height='50%' />

Click on "recommendations" and you can swipe through dogs recommended to you base on your view and like history.

Once you have found your dog, you can contact the shelter via email, phone, or get the shelter location.
