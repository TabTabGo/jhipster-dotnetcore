# Monolith

## Monolith Artictecture

### With JWT

![monolith-jwt](../assets/Monolith-with-jwt.png)

### With identity provider

![monolith-jwt](../assets/Monolith-with-identity-server.png)

## Monolith structure

```
AppFolder
├───docker -> all docker related files
├───src
│   ├───MyApp.Api
│   │   └───ClientApp -> all client related files
│   │       ├───src
│   │       ├───test
│   │       └───webpack
│   ├───MyApp.Crosscuting
│   ├───MyApp
│   ├───MyApp.Services
│   └───MyApp.Infrastructure
└───tests -> Server tests
```
