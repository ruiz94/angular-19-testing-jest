# AngularTesting

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.




## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# Cleaning the project 

## removing Karma and Jasmine 

```bash
yarn remove karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter @types/jasmine
```

# Install Testing Library

```bash
yarn add -D testing-library @testing-library/angular @testing-library/dom @testing-library/jest-dom @testing-library/user-event 
```

## Install types for Testing Library

```bash
yarn add @types/test ing-library__jest-dom
```

## Install Jest

```bash
yarn add jest jest-preset-angular
```
## Running end-to-end tests

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

### In order to install playwright in Angular we must 
https://playwright.dev/

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

```bash 
ng e2e 
```

and select **Playwright** option  
Schematics: Yes  
Install Playwright browsers: Yes  
