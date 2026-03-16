# Watchcat specific sections

## Reference
- [Watchcat - network watchdog utility](https://openwrt.org/docs/guide-user/advanced/watchcat)

## Examples

### ping_reboot
One section for each ping-watchdog rule you want to define.
Ping-reboot the device if gateway (or any IP) is unreachable
```
config hwd_watchcat default
    option mode       'ping_reboot'
    option pinghosts  '4.2.2.2'
    option pingperiod '30s'
    option period     '6h'
    option forcedelay '1m'
```

- `pinghost '4.2.2.2'` - Default Level3 resolver
- `pingperiod '30s'` - Send one ping every 30 seconds
- `period '6h'` - Reboot if 6h continuously failing
- `forcedelay '1m'` - Wait up to 1m for a soft-reboot

### periodic_reboot
Periodic-reboot the device after a certain uptime
```
config hwd_watchcat periodic_reboot
	option mode 'periodic_reboot'
	option period '27h'
	option forcedelay '1m'
```