import express from 'express'
import basicAuth from 'express-basic-auth'
import http from 'node:http'
import { createBareServer } from '@tomphttp/bare-server-node'
import path from 'node:path'
import cors from 'cors'
import config from './config.js'
import chalk from 'chalk';

const __dirname = process.cwd()
const server = http.createServer()
const app = express(server)
const bareServer = createBareServer('/bare/')
const PORT = 8080

if (config.challenge) {
  console.log("Password protection is enabled.")
  console.log(chalk.red.bold('*-----------------------------*'));
  console.log("Usernames are: " + Object.keys(config.users))
  console.log("Passwords are: " + Object.values(config.users))
  console.log(chalk.red.bold('*-----------------------------*'));
  app.use(basicAuth(config))
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

const routes = [
    /*Main pages*/
  { path: '/', file: 'index.html' },
  { path: '/p', file: 'proxy.html' },
  { path: '/&', file: 'iframe.html' },
  /*Proxy paths*/
  { path: '/d', file: '/proxyApps/Discord.html' },
]

app.get('/y/*', cors({ origin: false }), async (req, res, next) => {
  try {
    const reqTarget = `https://raw.githubusercontent.com/ypxa/y/main/${req.params[0]}`
    const asset = await fetch(reqTarget)

    if (asset.ok) {
      const data = await asset.arrayBuffer()
      res.end(Buffer.from(data))
    } else {
      next()
    }
  } catch (error) {
    console.error('Error fetching:', error)
    next(error)
  }
})

routes.forEach((route) => {
  app.get(route.path, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', route.file))
  })
})

server.on('request', (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res)
  } else {
    app(req, res)
  }
})

server.on('upgrade', (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head)
  } else {
    socket.end()
  }
})

server.on('listening', () => {
  console.log(`Running at http://localhost:${PORT}`)
})

server.listen({
  port: PORT,
})

/*
var http = require("http");
var fs = require("fs");

const PORT = process.env.PORT;

fs.readFile(
  "public/index.html",
  function (err, html) {
    if (err) throw err;
    http
      .createServer(function (request, response) {
        response.writeHeader(200, { "Content-Type": "text/html" });
        response.write(html);
        response.end();
      })
      .listen(PORT);
      console.log(`SuperNova running at http://localhost:${process.env.PORT}`);
  }
);
*/