# Babeld

![Babel](/babel_logo.svg){width=200 height=200}

## Reference
- [Babel on Wikipedia](https://en.wikipedia.org/wiki/Babel_(protocol))
- OpenWrt wiki page for [Babel routing protocol (babeld)](https://openwrt.org/docs/guide-user/services/babeld)
- The [Babel website](https://www.irif.fr/~jch/software/babel/)

## Default options
Default configuration stored in `/etc/config/babeld`.

```
config general 'general'
	option local_port '30003'
	option ubus_bindings 'true'

config filter 'ula6'
	option type 'redistribute'
	option ip 'fc00::/7'
	option action 'allow'

config filter 'public6'
	option type 'redistribute'
	option ip '2000::0/3'
	option action 'allow'

config filter 'default6'
	option type 'redistribute'
	option ip '0::0/0'
	option le '0'
	option action 'allow'
	option proto '7'

config filter 'mesh4'
	option type 'redistribute'
	option ip '10.0.0.0/8'
	option action 'allow'

config filter 'mptp4'
	option type 'redistribute'
	option ip '172.16.0.0/12'
	option action 'allow'

config filter 'default4'
	option type 'redistribute'
	option ip '0.0.0.0/0'
	option le '0'
	option action 'allow'
	option proto '7'

config filter 'localdeny'
	option type 'redistribute'
	option local 'true'
	option action 'deny'

config filter 'denyany'
	option type 'redistribute'
	option action 'deny'

```