// Kartu Bitcoin: sumber CoinGecko (gratis, bisa tertunda)
function cariKartu(nama){
  return [...document.querySelectorAll('.card')]
    .find(c => c.querySelector('h3') && c.querySelector('h3').textContent.trim() === nama);
}

async function muatBitcoin(){
  const kartu = cariKartu('Bitcoin');
  if(!kartu) return;
  const val = kartu.querySelector('.val');
  const badge = kartu.querySelector('.badge');
  try{
    const r = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true');
    if(!r.ok) throw new Error(r.status);
    const d = (await r.json()).bitcoin;
    const chg = d.usd_24h_change;
    const jam = new Date(d.last_updated_at*1000).toLocaleTimeString('id-ID');
    val.innerHTML = '$' + d.usd.toLocaleString('en-US') +
      ' <small style="font-size:13px;color:' + (chg>=0?'#3fb950':'#f85149') + '">' +
      (chg>=0?'+':'') + chg.toFixed(2) + '% (24j)</small>';
    badge.textContent = 'TERTUNDA · CoinGecko · ' + jam;
    badge.style.background = '#12261a';
    badge.style.color = '#3fb950';
  }catch(e){
    val.textContent = '—';
    badge.textContent = 'GAGAL MEMUAT DATA';
    badge.style.background = '#2a1215';
    badge.style.color = '#f85149';
  }
}
muatBitcoin();
setInterval(muatBitcoin, 60000);
