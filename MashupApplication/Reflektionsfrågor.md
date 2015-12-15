# Reflektionsfrågor #

**Vad finns det för krav du måste anpassa dig efter i de olika API:erna?**

**Hur och hur länga cachar du ditt data för att slippa anropa API:erna i onödan?**

<p>Trafikmeddelandena från SR skickas ut med enbart ett få antal minuters mellanrum. Max fem minuter. Detta är meddelanden som berör platser över hela landet. Eftersom jag inte har någon vetskap om var i landet en eventuell användare befinner sig är det alltså alltid aktuellt att kolla om det kommit något nytt. Därav har jag valt att behålla standardvärdet från SR:s API på en minuts cachning. Hade applikationen varit utbyggd på så vis att man kan filtrera på område där man bor samt tänkt köra hade kanske en cachnings-tid på ca 30 minuter varit lämpligt då det sällan, även i storstäderna, uppdateras med nya meddelanden oftare än så.
Utöver detta tror jag applikation är något man snabbt besöker en, möjligen två gånger dagligen innan man tar bilen mot önskad destination. Med tanke på meddelandenas täta uppdateringar är det i princip ständigt aktuellt att hämta det senaste vid varje nytt besök av applikationen.</p> 
<p>På grund av detta har jag istället valt att fokusera på "offline-first". Vid varje lyckad hämtning av traffikmeddelanden sparar jag dessa i "local storage". Vid händelse av redan sparade meddelanden rensar jag först dessa innan nya sparas. Skulle sedan användarens internetuppkoppling sluta fungera av en eller flera orsaker kan denne ändå komma åt de senaste meddelandena. Eftersom vissa meddelandens information mycket väl skulle kunna vara aktuellt i flertalet dagar anser jag att "local storage" fyller en funktion i detta fall.</p>
 
**Vad finns det för risker kring säkerhet och stabilitet i din applikation?**

<p>Rörande stabiliteten skulle en risk kunna vara att applikationen segas ned avsevärt i det fall SR har en otroligt stor mängd meddelanden sparade. Min applikation är utbyggd på så vis att den först skickar in ett hårdkodat värde på antal meddelanden den vill hämta. Efter detta kontrollerar den om antalet hämtade meddelanden understiger det totala antalet meddelanden som går att hämta från SR:s API. Finns fler meddelanden att hämta skickar applikationen en ny förfrågan på samtliga av dessa. Eftersom jag inte har någon vetskap om ifall eller hur ofta SR rensar dessa meddelanden skulle detta i teorin kunna innebära en förfrågan på tusentals meddelanden.</p>
 
**Hur har du tänkt kring säkerheten i din applikation?**

Rörande säkerheten har jag valt att inte implementera några inmatningsfält för användaren som denne skulle kunna nyttja för XSS-angrepp. Eftersom applikationen erbjuder användaren att filtrera meddelanden efer kategori skulle man kunna tänka sig att implementera denna funktionalitet i form av ett textfält där användaren fyller i själv/söker efter önskad kategori. Jag har istället valt att implementera detta i form av "radioknappar".
 
**Hur har du tänkt kring optimeringen i din applikation?**
