FROM node:10

ADD backend ./backend
ADD views ./views
COPY index.js about.json package.json config.json wait-for-it.sh ./
RUN chmod 777 wait-for-it.sh
RUN npm install
RUN npm install pm2 -g
CMD ["pm2-runtime", "index.js"]
# CMD node backend/db.js