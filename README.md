# React Movie App



**Prerequisites:**

* **Node.js and npm (or yarn):** Download Node.js from the official website ([https://nodejs.org/en](https://nodejs.org/en)). Node.js comes bundled with npm, the Node Package Manager. Alternatively, you can use yarn as a package manager.

**Steps:**

1. **Clone the repository:** 

    ```bash
    git clone git@github.com:Mcorduk/movie-lister-react.git
    ```

2. **Install dependencies:** Navigate to your project directory in the terminal and run the following command:

   ```bash
   cd movie-lister-react
   npm install 
   ```

   This command will install all the necessary dependencies.
   
3. **Set up environment variables:** Create a `.env` file in the root of your project directory. Copy the contents of the `.env.example` file into the `.env` file. Replace `your_api_key` with your actual OMDB API key:

   ```env
   OMDB_API_KEY=your_api_key
   ```
4. **Start the production preview:** Once the dependencies are installed, run the following command to start the Vite development server:

   ```bash
   npm run start
   ```

   This command will build the app for production and launch the app in your default browser at `http://localhost:8080/`.
   
   Head over to start using the app!

**Troubleshooting:**

* If you encounter any errors during installation or running the development server, consult the documentation for Vite ([https://vitejs.dev/](https://vitejs.dev/)) or refer to the specific error messages for guidance.


By following these steps, you should be able to successfully run this Vite React app locally. 
