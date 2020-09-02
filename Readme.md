# WeWorkIn.xyz

Open-source talent board, powered by [Hasura GraphQL Engine](https://hasura.io/).

## Local Quick Start

#### 1. Start Hasura + PostgreSQL + Node.js backend containers

- Create `.env` file based on the `.env.example` structure.

- `docker-compose -f docker-compose.prod.yml up -d`

Hasura Console is now running at http://localhost:8080, exposing the GraphQL endpoint at http://localhost:8080/v1/graphql.

#### 2. Apply migrations and metadata

- Install [Hasura CLI](https://hasura.io/docs/1.0/graphql/manual/hasura-cli/install-hasura-cli.html#install-hasura-cli)
- Run `hasura-init.sh`. It is a small helper script that handles migrations initial setup. After this initial setup, everything related to migrations and metadata will be handled in the `hasura` directory.

#### 3. Build the frontend

- `cd frontend`

Change the values in the `/frontend/.env` file, if needed. Or create `.env.local` file to overwrite.

- `yarn install && yarn build`

The client is a simple static application, bootstraped with [create-react-app](https://create-react-app.dev/). Locally, for a quick preview, the application can be served with `cd build && serve`. [Serve](https://www.npmjs.com/package/serve) must be installed first (`yarn global add serve`). 

Please read the [Making it yours](/docs/making-it-yours) section, for additional customization options.


## Running in production

It is recommended to serve the client SPA and the Hasura instance through a server like Nginx, Caddy, etc. 

Here is a starting point for Nginx configuration:


Reverse-proxy the Hasura instance:

```
server {
	server_name hasura.yourdomain.com www.hasura.yourdomain.com;

    location / {
        proxy_pass http://localhost:8080/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

The client SPA is static, so Nginx can serve it directly:

```
server {
   	server_name yourdomain.com www.yourdomain.com;
	root path/to/frontend/build;
	index index.html index.htm index.nginx-debian.html;

	location / {
        try_files $uri /index.html;
	}

	location ~* \.(jpg|jpeg|png|svg|gif|ico|css|js)$ {
		expires 365d;
	}
}
```

## Development

### Client

The client is a single page application, totally decoupled, the only connection with the backend is the Hasura GraphQL endpoint.

`cd frontend && yarn install && yarn start`


### Backend

1. Rebuild the images with the development setup `docker-compose -f docker-compose.yml build`
2. Start containers in development mode `docker-compose -f docker-compose.yml up -d`

For development purposes, the container is named `backend_dev`. Run `docker logs -f backend_dev` in order to see console output while developing.

Any changes to code will be applied automatically. 