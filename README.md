<div align="center">

# XMLRPC-BRUTE
[![Codefactor](https://www.codefactor.io/repository/github/ibnusyawall/xmlrpc-brute/badge/main)](https://www.codefactor.io/repository/github/ibnusyawall/xmlrpc-brute/overview/main)
<details>
 <summary>Help me!</summary>

 [Saweria](https://saweria.co/donate/ibnusyawall)

 [Paypal.me](https://paypal.me/syawal24)

</details>
</div>

> This is an exploit for Wordpress xmlrpc.php System Multicall function affecting the most current version of Wordpress. The exploit works by sending 1,000+ auth attempts per request to xmlrpc.php in order to "brute force" valid Wordpress users and will iterate through whole wordlists until a valid user response is acquired. It will then selectively acquire and display the valid username and password to login.

### Requirements
  - NodeJS

### Install

```sh
$ git clone https://github.com/ibnusyawall/xmlrpc-git.git
$ cd xmlrpc-brute
$ npm i
$ node . --help
```
### Usage

```sh
# run
$ node . --siteList <path/to/list> --userList <path/to/list> --passList <path/to/list>

# help
$ node . --help

# example
$ node . --siteList site.txt --userList user.txt --passList pass.txt
```

Any question? contact me at [Whatsapp](https://wa.me/6282299265151) or [Telegram](https://t.me/isywl)
