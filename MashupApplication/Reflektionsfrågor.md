# Reflektionsfrågor #

* **Vad finns det för krav du måste anpassa dig efter i de olika API:erna?**

* **Hur och hur länga cachar du ditt data för att slippa anropa API:erna i onödan?**

<p>Trafikmeddelandena från SR skickas ut med enbart ett få antal minuters mellanrum. Max fem minuter. Detta är meddelanden som berör platser över hela landet. Eftersom jag inte har någon vetskap om var i landet en eventuell användare befinner sig är det alltså alltid aktuellt att kolla om det kommit något nytt. Därav har jag valt att behålla standardvärdet från SR:s API på en minuts cachning. Hade applikationen varit utbyggd på så vis att man kan filtrera på område där man bor samt tänkt köra hade kanske en cachnings-tid på ca 30 minuter varit lämpligt då det sällan, även i storstäderna, uppdateras med nya meddelanden oftare än så.
Utöver detta tror jag applikation är något man besöker en, möjligen två gånger dagligen innan man tar bilen mot önskad destination. Med tanke på meddelandenas täta uppdateringar är det i princip ständigt aktuellt att hämta det senaste vid varje nytt besök av applikationen.</p> 
<p>På grund av detta har jag istället valt att fokusera på "offline-first". Vid varje lyckad hämtning av traffikmeddelanden sparar jag dessa i "local storage". Vid händelse av redan sparade meddelanden rensar jag först dessa innan nya sparas. Skulle sedan användarens internetuppkoppling sluta fungera av en eller flera orsaker kan denne ändå komma åt de senaste meddelandena. Eftersom vissa meddelandens information mycket väl skulle kunna vara aktuellt i flertalet dagar anser jag att "local storage" fyller en funktion i detta fall.</p>
 
* **Vad finns det för risker kring säkerhet och stabilitet i din applikation?**
 
* **Hur har du tänkt kring säkerheten i din applikation?**
 
* **Hur har du tänkt kring optimeringen i din applikation?**
