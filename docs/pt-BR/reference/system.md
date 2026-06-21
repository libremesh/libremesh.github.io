---
outline: deep
---

# Opções do sistema
Os valores padrão conforme `lime-defaults`
```
config lime system
	option hostname 'LiMe-%M4%M5%M6'
	option domain 'thisnode.info'
	option keep_on_upgrade 'libremesh dropbear minimum-essential /etc/sysupgrade.conf'
	option root_password_policy 'DO_NOTHING'
	option root_password_secret ''
	option deferrable_reboot_uptime_s '97200'
	option deferrable_reboot_ping_target '4.2.2.2'
	option firstbootwizard_configured false
	option firstbootwizard_dismissed false
```

## hostname
- Padrão: `LiMe-%M4%M5%M6`
- Parametrizável com `%Mn`

```
config lime system
    option hostname 'LiMe-%M4%M5%M6'
```

O nome de host do nó

## domain
- Tipo: `string`
- Padrão: `thisnode.info`

```
config lime system
    option domain 'thisnode.info'
```

Domínio DNS para a nuvem L2, pode ser algo como `minhanube.minharede.tld`

## keep_on_upgrade
- Tipo: `list`
- Padrão: `libremesh dropbear minimum-essential /etc/sysupgrade.conf`

```
config lime system
  option keep_on_upgrade 'libremesh dropbear minimum-essential /etc/sysupgrade.conf'
```

Arquivos que definem a lista de arquivos e diretórios a serem copiados durante a atualização.    
O caminho do arquivo é relativo ao `/lib/upgrade/keep.d` padrão do OpenWrt se nenhum `/` for definido.    
Esta opção é usada pelo comando `lime-sysupgrade` e pelo pacote opcional `safe-upgrade`.

Consulte a página [Atualizar](/guide/upgrade) para mais detalhes.

## root_password_policy
- Tipo: `DO_NOTHING | RANDOM | SET_SECRET`
- Padrão: `DO_NOTHING`

```
config lime system
    option root_password_policy 'DO_NOTHING'
```

Determina a configuração do lime para a senha root:
- `DO_NOTHING` - deixa a senha root vazia (você terá que defini-la manualmente ou através do FirstBootWizard).
- `RANDOM` - uma senha forte aleatória será definida se root não tiver senha, use isso se seu firmware for construído com chaves ssh internas. 
- `SET_SECRET` - a senha root será configurada conforme especificado em root_password_secret.

A opção padrão evita que o libremesh sobrescreva a configuração manual, por exemplo, através de `luci`, `uci` ou `lime-app`.

## root_password_secret
- Tipo: `string`
- Padrão: `''`

```
config lime system
    option root_password_secret ''
```

Usado apenas quando `root_password_policy` está definido como `SET_SECRET`.    
O hash da senha será armazenado em /etc/shadow.
Use uma senha forte com pelo menos 10 números e letras, quanto mais longa melhor!.

```
openssl passwd -5
```

Você pode gerar o segredo com `openssl passwd -1` para ser compatível com a maioria dos firmwares OpenWrt.    
Para segurança aprimorada, use `openssl passwd -6` para SHA512 (ou -5 para SHA256), mas esteja ciente de que nem todos os firmwares suportam isso.

## firstbootwizard_configured
- Tipo: `string`
- Padrão: `false`
- Pacotes necessários: `first-boot-wizard`

```
config lime system
    option firstbootwizard_configured false
```
Quando true, o assistente de primeiro boot não aparecerá por padrão.

## firstbootwizard_dismissed
- Tipo: `string`
- Padrão: `false`
- Pacotes necessários: `first-boot-wizard`

```
config lime system
    option firstbootwizard_dismissed false
```

Quando true, o banner do assistente de primeiro boot será ocultado.
