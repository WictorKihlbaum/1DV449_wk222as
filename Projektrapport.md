# Projekt Rapport #

### Inledning ###

<p>Huvudidén med min applikation vilken jag nu utvecklat är att erbjuda mina besökare verktygen de behöver i syfte att redigera deras tilltänkta bilder. Min webbapplikation ger besökaren chansen att antingen redigera en lokal bild från datorn eller en bild från dennes Google Drive. När användaren är klar med bildredigeringsverktyget kan denne antingen ladda ner den redigerade bilden lokalt till datorn eller ladda upp och spara den på sin Google Drive.</p>

<p>De två främsta beståndsdelarna jag implementerat i min applikation är Googles API (Inlogging och åtkomst till Google Drive) och Adobes Aviary API vilket är själva bildredigeringsverktyget. I min projektbeskrivning nämnde jag att jag hade tänkt inkludera PXLR:s API för att agera redigeringsverktyg. Jag märkte dock att detta API gav mig för mycket gratis, däribland inloggning till Google redan implementerat. Valet landade istället på Aviary som gav mig en bättre implementation både vad gäller design samt konfigurations-val.</p>

<p>De två främsta liknande applikationerna är PIXLR och Googles Drive-tjänst. PIXLR (https://pixlr.com/) använder sig av sitt
egenutvecklade redigeringsverktyg samt, som ovan nämnt, inkluderar inloggning till Google. <br />
Google Drive erbjuder användaren att öppna sina bilder med diverse verktyg, däribland PIXLR. Andra verktyg går även att lägga till på sitt konto.

### Schematisk bild över applikationens beståndsdelar ###

### Säkerhet och prestandaoptimering ###

<h4>Säkerhet</h4>
<p>Främsta säkerhetsåtgärden jag vidtagit är att inte i någon mån implementera textfält på webbsidan. Detta för att undvika och inte
riskera angrepp i form av XSS-attacker (Cross Site Scripting). Detta är den mest utbredda säkerhetsrisken rörande webbapplikationer. Det är ett problem som innebär att applikationen tar ej anförtrodd data och skickar det till webbläsaren utan ordentlig validering eller hantering. XSS tillåter angripare att exekvera skript i offrets webbläsare vilket exempelvis kan kapa dennes sessioner, vanställa webbsidor eller omdirigera användaren till maliciösa sidor [1].</p>
<p>Eftersom all min JavaScript-kod ligger synlig på klienten skulle detta kunna ge högst oönskade resultat.
Ett bra exempel på vad jag skulle ha kunnat implementera på min kontaktsida är just ett kontaktformulär med fält för
såväl besökarens namn, email samt själva meddelandet vilken denne tänkt skicka. Det hade förvisso resulterat i en angenämnare
upplevelse och smidighet för användaren, men på beskostnad av säkerheten. Dessutom hade en stor del extra tid gått åt till att
skriva kod som skyddar mot attacker.</p>


### Prestandaoptimering ###

### Offline-first ###

<p></p>

### Risker med din applikation ###

### Egen reflektion kring projektet ###

### Referenslista ###

[1] J. Williams, D. Wichers, "Cross-site Scripting (XSS)," *OWASP*, 2013 [Online] Tillgänglig: [https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)). [Hämtad: 1 december, 2015].


Inledning där du kort beskriver vad du gjort och bakgrunden till din applikation. Finns det liknande applikationer redan? Vilka tekniker har använts.

Inkludera en schematisk bild över applikationens beståndsdelar så att läsaren har enklare att förstå applikationens dataflöde.

Säkerhet och prestandaoptimering - Hur har du funderat kring säkerhet och prestanda och vilken teori har du kopplat detta emot.

Offline-first: Hur har du tänkt kring offline-first?

Risker med din applikation: Reflektera över vilka risker det finns med din applikation; rent tekniskt, säkerhet, etiskt m.m.

Egen reflektion kring projektet: Här tar du upp hur projektet har gått. Vilka eventuella problem har du stött på? Finns det funktioner som du velat implementera men inte hunnit? Hur skulle du vilja jobba vidare med din applikation?
Skriv också om de eventuella delar du anser vara betygshöjande med din applikation. Motivera varför du anser dessa vara betygshöjande.