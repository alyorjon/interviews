# Alyorjons-Mini production runtime

Bu qo'llanma faqat `Alyorjons-Mini:/Users/alyorjonaminboyev/Projects/interviews` uchun. Joriy ishlab chiqish Mac'ida uzoq ishlaydigan servisni ishga tushirmang.

## 1. Remote `.env`

`.env.example`ni `.env`ga nusxalang va qiymatlarni faqat Alyorjons-Mini'da kiriting:

- `BOT_TOKEN`
- `ALLOWED_TELEGRAM_USER_ID`
- `PUBLIC_URL`, masalan `https://interviews.4ontak.uz`
- `PUBLIC_HOSTNAME`, masalan `interviews.4ontak.uz`
- `AUTH_BYPASS=false`

`.env`ni Git, rsync, log yoki `docker compose config` chiqishiga qo'shmang. Productionda `AUTH_BYPASS=false` bo'lishi shart.

## 2. Servis boshqaruvi

Remote terminalda:

```sh
cd /Users/alyorjonaminboyev/Projects/interviews
./scripts/runtime/interviews-service.sh start
./scripts/runtime/interviews-service.sh status
./scripts/runtime/interviews-service.sh health
```

Log uchun `./scripts/runtime/interviews-service.sh logs`, qayta build uchun `restart`, to'xtatish uchun `stop`. Compose bitta `app` containerini `127.0.0.1:4173`da ko'taradi, `unless-stopped` orqali Docker qayta kelganda tiklaydi va `/health` bilan tekshiradi.

## 3. Mavjud Cloudflare tunnelga hostname qo'shish

Avval remote hostda aniq tunnel nomi/IDsi va uning amaldagi ingress konfiguratsiyasini read-only tekshiring. Keyin `.env`ni source qilmasdan hostname'ni alohida kiriting:

```sh
cd /Users/alyorjonaminboyev/Projects/interviews
PUBLIC_HOSTNAME=interviews.4ontak.uz ./scripts/runtime/add-cloudflare-dns-route.sh EXISTING_TUNNEL_NAME
```

Skript faqat birinchi muvaffaqiyatli chaqiruvda `cloudflared tunnel route dns` bajaradi va natijani Gitdan tashqaridagi `.runtime/`da belgilaydi; ayni tunnel/hostname bilan qayta chaqirish no-op. U `~/.cloudflared/config.yml`ni yozmaydi, `--overwrite-dns` ishlatmaydi va boshqa hostname yoki route'larni almashtirmaydi. Agar DNS record oldindan boshqa usulda yaratilgan bo'lsa, skript uni egallamaydi — remote auditda egasi tekshiriladi. DNS route originni o'zi belgilamaydi: mavjud tunnel ingressida quyidagi alohida qoida bo'lishi kerak, mavjud qoidalar va oxirgi catch-all saqlanadi:

```yaml
- hostname: interviews.4ontak.uz
  service: http://localhost:4173
```

Ingress o'zgarishini faqat aniq remote konfiguratsiya ko'rilgandan keyin qo'lda/additiv tarzda kiriting va `cloudflared tunnel ingress validate` bilan tekshiring. Skript xatosida `--overwrite-dns` ishlatmang: avval shu hostname'ning mavjud DNS egasini tekshiring.

## 4. Qabul dalili

Remote qabulda quyidagilar alohida tekshiriladi: container `healthy`, local `/health` 200, public HTTPS `/health` 200, portal assetlari 200, Telegram egasiga bir martalik startup xabari, `/start` inline Web App va begona userga rad javobi. Token yoki initData hech qachon dalilga ko'chirilmaydi.
