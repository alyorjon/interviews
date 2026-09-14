#!/bin/sh
set -eu

tunnel_name="${1:-}"
hostname="${PUBLIC_HOSTNAME:-}"
project_dir="/Users/alyorjonaminboyev/Projects/interviews"

if [ -z "$tunnel_name" ]; then
  echo "Foydalanish: PUBLIC_HOSTNAME=... $0 <existing-tunnel-name-or-id>" >&2
  exit 2
fi
case "$tunnel_name" in
  -*)
    echo "Tunnel nomi yoki IDsi option belgisi bilan boshlanmasligi kerak." >&2
    exit 2
    ;;
esac
if [ -z "$hostname" ]; then
  echo "PUBLIC_HOSTNAME bo'sh." >&2
  exit 2
fi
case "$hostname" in
  *[!A-Za-z0-9.-]*|.*|*..*|*.)
    echo "PUBLIC_HOSTNAME yaroqli DNS hostname emas." >&2
    exit 2
    ;;
esac
if ! command -v cloudflared >/dev/null 2>&1; then
  echo "cloudflared topilmadi." >&2
  exit 1
fi

state_dir="$project_dir/.runtime"
state_file="$state_dir/cloudflare-dns-route-${hostname}"
expected_state="$tunnel_name $hostname"
if [ -f "$state_file" ] && [ "$(sed -n '1p' "$state_file")" = "$expected_state" ]; then
  echo "DNS route oldin shu tunnelga qo'shilgan: $hostname"
  exit 0
fi

echo "Mavjud tunnel uchun DNS route tekshirilmoqda: $hostname"
cloudflared tunnel route dns "$tunnel_name" "$hostname"
mkdir -p "$state_dir"
umask 077
printf '%s\n' "$expected_state" > "$state_file"
echo "DNS route tayyor. Bu skript ~/.cloudflared/config.yml yoki ingress route'larini o'zgartirmadi."
