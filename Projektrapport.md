<h1>Projekt Rapport</h1>

<h2> Inledning </h2>

<p>Huvudidén med min applikation vilken jag nu utvecklat är att erbjuda mina besökare verktygen de behöver i syfte att redigera deras tilltänkta bilder. Min webbapplikation ger besökaren chansen att antingen redigera en lokal bild från datorn eller en bild från dennes Google Drive. När användaren är klar med bildredigeringsverktyget kan denne antingen ladda ner den redigerade bilden lokalt till datorn eller ladda upp och spara den på sin Google Drive.</p>

<p>De två främsta beståndsdelarna jag implementerat i min applikation är Googles API (Inlogging och åtkomst till Google Drive) och Adobes Aviary API vilket är själva bildredigeringsverktyget. I min projektbeskrivning nämnde jag att jag hade tänkt inkludera PXLR:s API för att agera redigeringsverktyg. Jag märkte dock att detta API gav mig för mycket gratis, däribland inloggning till Google redan implementerat. Valet landade istället på Aviary som gav mig en bättre implementation både vad gäller design samt konfigurations-val.</p>

<p>De två främsta liknande applikationerna är PIXLR och Googles Drive-tjänst. PIXLR (https://pixlr.com/) använder sig av sitt
egenutvecklade redigeringsverktyg samt, som ovan nämnt, inkluderar inloggning till Google. <br />
Google Drive erbjuder användaren att öppna sina bilder med diverse verktyg, däribland PIXLR. Andra verktyg går även att lägga till på sitt konto.

<h2>Schematisk bild över applikationens beståndsdelar</h2>

<h2>Säkerhet och prestandaoptimering</h2>

<h3>Säkerhet</h3>
<h4>1. Cross Site Scripting</h4>
<p>Främsta säkerhetsåtgärden jag vidtagit är att inte i någon mån implementera textfält på webbsidan. Detta för att undvika och inte
riskera angrepp i form av XSS-attacker (Cross Site Scripting). Detta är den mest utbredda säkerhetsrisken rörande webbapplikationer. Det är ett problem som innebär att applikationen tar ej anförtrodd data och skickar det till webbläsaren utan ordentlig validering eller hantering. XSS tillåter angripare att exekvera skript i offrets webbläsare vilket exempelvis kan kapa dennes sessioner, vanställa webbsidor eller omdirigera användaren till maliciösa sidor [1].</p>
<p>Eftersom all min JavaScript-kod ligger synlig på klienten skulle detta kunna ge högst oönskade resultat.
Ett bra exempel på vad jag skulle ha kunnat implementera på min kontaktsida är just ett kontaktformulär med fält för
såväl besökarens namn, email samt själva meddelandet vilken denne tänkt skicka. Det hade förvisso resulterat i en angenämnare
upplevelse och smidighet för användaren, men på beskostnad av säkerheten. Dessutom hade en stor del extra tid gått åt till att
skriva kod som skyddar mot attacker. Jag valde därför att i ren text uppge dels min Gmail-adress men också länkar till min Facebook samt Twitter.</p>

<p>Skydda sig mot XSS-attacker kräver separation av opålitlig data från aktivt innehåll i webbläsaren. Det föredragna valet är att ordentligt behandla och städa undan all opålitlig data baserad på HTML-kontexten, så som body, attribute, JavaScript, CSS och URL, i vilket data kommer bli inplacerad [2].</p>

<h4>2. Broken Authentication and Session Management</h4>
<p>Vid varje utloggning är jag mycket noga med att upphäva alla rättigheter för den nyligen inloggade användaren. Användarens Session-token återkallas och samtliga rättigheter ("scopes"), exempelvis åtkomst till Google Drive, som min applikation vill ha godkännande för vid inloggning upphör.</p>
I det fall jag inte skulle utföra detta skulle det kunna resultera i ett problem som innebär att angripare tillåts äventyra lösenord, nycklar, så kallade (som ovan nämnt) "Session-tokens" eller utnyttja andra brister i implementationen för att upptaga andra användares identiteter [3].</p>
<p>Dessa attacker och brister kan tillåta vissa eller till och med samtliga konton att attackeras. Skulle en angripare lyckas med attacken kan denne utföra allt som användaren skulle kunna. Det är de privilegierade kontona vilka ständigt är inriktade av angripare [4].</p>

<h3>Prestandaoptimering</h3>
<h4>CSS-taggar</h4>
<p>Jag har valt att placera samtliga av mina CSS-taggar i head-taggen. I det fall jag inte skulle göra detta kan det resultera i ett problem som kan, beroende på vilken webbläsare som används samt hur sidan laddas in, leda till en blank vit sida[5].<br />
Detta leder till en dålig användarupplevelse eftersom ingen visuell respons ges som skulle kunna försäkra användaren om att dennes begäran behandlas korrekt. Detta kan i sig leda till att användaren undrar vad som försiggår och istället lämnar sidan.</p>

<p>För att undvika blank vit sida skall ens stylesheet placeras högst upp i dokumentets head-tagg. Detta löser samtliga problematiska scenarion. Oavsett hur sidan laddas in (nytt fönster, omladdning eller som hem/start-sida) kommer sidan alltid laddas progressivt[5].</p>

</h2>Offline-first</h2>

<h2>Risker med din applikation</h2>

<h2>Egen reflektion kring projektet</h2>

<h2>Referenslista</h2>

<h3>Webbsidor</h3>

[1] J. Williams, D. Wichers, "Cross-site Scripting (XSS)," *OWASP*, 2013 [Online] Tillgänglig: [https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)). [Hämtad: 1 december, 2015].

[2] J. Williams, D. Wichers, "Top 10 2013-A3-Cross-Site Scripting (XSS)," *OWASP*, 2013 [Online] Tillgänglig: [https://www.owasp.org/index.php/Top_10_2013-A3-Cross-Site_Scripting_(XSS)](https://www.owasp.org/index.php/Top_10_2013-A3-Cross-Site_Scripting_(XSS)). [Hämtad: 1 december, 2015].

[3] J. Williams, D. Wichers, "Top 10 2013-Top 10," OWASP, 2013 [Online] Tillgänglig: [https://www.owasp.org/index.php/Top_10_2013-Top_10]. [Hämtad: 1 december, 2015].

[4] J. Williams, D. Wichers, "Top 10 2013-A2-Broken Authentication and Session Management," OWASP, 2013 [Online] Tillgänglig: https://www.owasp.org/index.php/Top_10_2013-A2-Broken_Authentication_and_Session_Management. [Hämtad: 2 december, 2015].

### Böcker ###

[1] S. Souders, *High Performance Web Sites: Essential Knowledge for Frontend Engineers*, Sebastopol: O’Reilly, 2007, 40-41.


Inledning där du kort beskriver vad du gjort och bakgrunden till din applikation. Finns det liknande applikationer redan? Vilka tekniker har använts.

Inkludera en schematisk bild över applikationens beståndsdelar så att läsaren har enklare att förstå applikationens dataflöde.

Säkerhet och prestandaoptimering - Hur har du funderat kring säkerhet och prestanda och vilken teori har du kopplat detta emot.

Offline-first: Hur har du tänkt kring offline-first?

Risker med din applikation: Reflektera över vilka risker det finns med din applikation; rent tekniskt, säkerhet, etiskt m.m.

Egen reflektion kring projektet: Här tar du upp hur projektet har gått. Vilka eventuella problem har du stött på? Finns det funktioner som du velat implementera men inte hunnit? Hur skulle du vilja jobba vidare med din applikation?
Skriv också om de eventuella delar du anser vara betygshöjande med din applikation. Motivera varför du anser dessa vara betygshöjande.
