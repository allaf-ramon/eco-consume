#!/bin/sh

npx prisma migrate deploy

npm run seed

npm run start
