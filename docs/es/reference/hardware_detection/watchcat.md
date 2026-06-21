---
outline: deep
---

# Secciones específicas de Watchcat

## Referencia
- [Watchcat - utilidad de vigilancia de red](https://openwrt.org/docs/guide-user/advanced/watchcat)

## Ejemplos
### ping_reboot
Una sección para cada regla de vigilancia ping que desees definir.
Reinicia el dispositivo por ping si el gateway (o cualquier IP) es inalcanzable
```
config hwd_watchcat default
    option mode       'ping_reboot'
    option pinghosts  '4.2.2.2'
    option pingperiod '30s'
    option period     '6h'
    option forcedelay '1m'
```

- `pinghost '4.2.2.2'` - Resolvedor por defecto de Level3
- `pingperiod '30s'` - Enviar un ping cada 30 segundos
- `period '6h'` - Reiniciar si falla continuamente durante 6h
- `forcedelay '1m'` - Esperar hasta 1m para un reinicio suave

### periodic_reboot
Reinicio periódico del dispositivo después de cierto tiempo de actividad
```
config hwd_watchcat periodic_reboot
	option mode 'periodic_reboot'
	option period '27h'
	option forcedelay '1m'
```
