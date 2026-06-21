---
outline: deep
---

# Seções específicas do Watchcat

## Referência
- [Watchcat - utilidade de vigilância de rede](https://openwrt.org/docs/guide-user/advanced/watchcat)

## Exemplos
### ping_reboot
Uma seção para cada regra de vigilância ping que você desejar definir.
Reinicia o dispositivo por ping se o gateway (ou qualquer IP) estiver inalcançável
```
config hwd_watchcat default
    option mode       'ping_reboot'
    option pinghosts  '4.2.2.2'
    option pingperiod '30s'
    option period     '6h'
    option forcedelay '1m'
```

- `pinghost '4.2.2.2'` - Resolvedor padrão de Level3
- `pingperiod '30s'` - Enviar um ping a cada 30 segundos
- `period '6h'` - Reiniciar se falhar continuamente por 6h
- `forcedelay '1m'` - Esperar até 1m para uma reinicialização suave

### periodic_reboot
Reinicialização periódica do dispositivo após certo tempo de atividade
```
config hwd_watchcat periodic_reboot
	option mode 'periodic_reboot'
	option period '27h'
	option forcedelay '1m'
```
