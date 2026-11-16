# Survey Saurus

A survey app with a GraphQL API, role-based access control, and notes on scaling with AWS.

> Note: this repo is named `blog-admin` on GitHub, but the project inside is **Survey Saurus**.

## What it does

- Survey frontend with user signup
- GraphQL user model (Apollo)
- Role-based access control (RBAC)
- Notes on auto-scaling the service on AWS

## Tech

- JavaScript
- GraphQL (Apollo)
- React
- Express
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)

## Run it

Install dependencies in the root and in each of `client/`, `server/` and `server-gateway/` (each has its own `package.json`), then start everything from the root — `npm start` runs the server, client and gateway together:

```bash
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..
cd server-gateway && npm install && cd ..
npm start
```

Copy `.env.example` to `.env` and set `JWT_SECRET` before starting the server.

## License

MIT — see [LICENSE](LICENSE).















