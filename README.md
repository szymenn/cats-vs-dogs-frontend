# cats-vs-dogs-frontend
Client app using Web API from [this repository](https://github.com/szymenn/CatsVsDogsBinaryClassification).
App uses Web API to get predictions whether it's a cat or a dog based on the input image.

### Used technologies
- React.js
- Ant Design

### Run on your computer
Prerequisites:
- Git
- Docker

To Run the app on your computer simply clone this repository using: <br />

`git clone https://github.com/szymenn/cats-vs-dogs-frontend.git` <br />

Then in the main directory build docker image using: <br />

`docker build -t catsvsdogs-frontend .`

And to run the app use: <br />

`docker run -it -p 3001:3000 catsvsdogs-frontend`

Or if you're using Windows run:

`winpty docker run -it -p 3001:3000 catsvsdogs-frontend`

## Screenshots:
<img src="https://github.com/szymenn/cats-vs-dogs-frontend/blob/master/catsvsdogs1.jpg" />
<img src="https://github.com/szymenn/cats-vs-dogs-frontend/blob/master/catsvsdogs2.jpg" />




