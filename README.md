# MyBudget

A MERN stack application to help visualize how you spend your money each year.

## Installation

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (v20.10.0)
- MongoDB Atlas account and connection URI
- Git (optional but recommended)

### Clone the Repository

```bash
git clone https://github.com/TylerH123/MyBudget
cd MyBudget
```

### Install Dependencies

#### Install root dependencies:
```bash
npm install
```

#### Install server-side dependencies:
```bash
cd server
npm install
```

#### Install client-side dependencies:
```bash
cd client
npm install
```

#### Create .env File

Create a .env file in the server directory with the following content:
- MONGODB_URI=<your_mongodb_uri>
- PORT=4000
- SECRET=<string_to_sign_JWT>

### Start the server:
```bash
cd server
npm start
```

### Start the client:
```bash
cd client
npm start
```

#### Visit http://localhost:3000 in your web browser to view the app.

## Usage

## Contributing

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
