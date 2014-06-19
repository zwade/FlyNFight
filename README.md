###Set Up
----------------------

```bash
git clone git@github.com:zwade/FlyNFight.git
cd FlyNFight
rmdir PseudoSocket
git clone git@github.com:zwade/PseudoSocket.git
#assuming you have github.com/zwade/node_modules installed and in your path somewhere
serv.js host/host.html >/dev/null &
node server/index.js >/dev/null & #not necessary if patching through heroku
```


