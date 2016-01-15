<h1>Projekt Rapport</h1>

<h2> Inledning </h2>

<p>Huvudidén med min applikation vilken jag nu utvecklat är att erbjuda mina besökare verktygen de behöver i syfte att redigera deras tilltänkta bilder. Min webbapplikation ger besökaren chansen att antingen redigera en lokal bild från datorn eller en bild från dennes Google Drive. När användaren är klar med bildredigeringsverktyget kan denne antingen ladda ner den redigerade bilden lokalt till datorn eller ladda upp och spara den på sin Google Drive.</p>

<p>De två främsta beståndsdelarna jag implementerat i min applikation är Googles API (Inlogging och åtkomst till Google Drive) och Adobes Aviary API vilket är själva bildredigeringsverktyget. I min projektbeskrivning nämnde jag att jag hade tänkt inkludera PXLR:s API för att agera redigeringsverktyg. Jag märkte dock att detta API gav mig för mycket gratis, däribland inloggning till Google redan implementerat. Valet landade istället på Aviary som gav mig en bättre implementation både vad gäller design samt konfigurations-val.</p>

<p>De två främsta liknande applikationerna är PIXLR och Googles Drive-tjänst. PIXLR (https://pixlr.com/) använder sig av sitt
egenutvecklade redigeringsverktyg samt, som ovan nämnt, inkluderar inloggning till Google. <br />
Google Drive erbjuder användaren att öppna sina bilder med diverse verktyg, däribland PIXLR. Andra verktyg går även att lägga till på sitt konto.

<h2>Schematisk bild över applikationens beståndsdelar</h2>
<p>Bild: http://webproject1dv449.azurewebsites.net/images/schematic_image.png</p>

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

<h4>Externa resurs-filer (CSS & JS)</h4>
<p>Jag har valt att placera samtliga CSS-regler samt JavaScript-kod i externa filer vilka länkas in i HTML-dokumentet. Det främsta problemet som hade uppstått om jag inte valt att implementera dessa på detta sätt är dessa dessa resurser inte har möjlighet att cachas vilket generellt innebär långsammare laddning av webbsidor eftersom de måste laddas in på nytt inför varje besök. 

<p>Enda gången det är värt att överväga att ladda in resurser via så kallad "inline" är i det fall ens webbsida inte besöks nämnvärt ofta. Detta eftersom inline-resurser laddas in snabbare [6]. I mitt fall dock är möjlighet till cachning en avgörande del i mitt projekt eftersom jag vill kunna ge mina användare en såpass god upplevelse som möjligt, även i det fall en internet-anslutning bryts av en eller flera olika anledningar.</p>
<p>Några följder som skulle komma att uppstå i det fall jag inte väljer att placera CSS och JavaScript i externa filer är att HTML-sidorna tar upp större plats [6]. Detta i sig innebär alltså mer data att ladda in för användaren inför varje besök vilket kan öka väntetiden avsevärt.</p>

<h4>Script-taggar</h4>
I samtliga av mina HTML-dokument laddar jag in mina externa script längst ned innan body-taggen stängs. Detta medför en progressiv rendering och åstadkommer bättre nedladdnings-parallellisering [7]. Anledningen till att detta sker är för att skript blockerar parallell nedladdning. Detta medför således att resurser och övrigt innehåll som följer nedan skript måste vänta på sin tur [7].

<h2>Offline-first</h2>

<p>Eftersom jag vill ge mina besökare en såpass god upplevelse som möjligt oavsätt uppkoppling eller ej har jag valt att cacha samtliga resurser som ingår i min webbapplikation. Jag har valt att använda mig av "Application Cach" som metod där jag använder mig av en så kallad "manifest"-fil för detta ändamål. I denna fil har jag alla mina resurser uppskrivna som jag vill ska cachas. I denna fil står även mina HTML-dokument listade. Egentligen behöver man ej lista HTML-dokumentet då dessa per automatik cachas vid laddning av sida [8], dock krävs det att användaren besöker var och en av dessa sidor för de skall cachas [8]. Eftersom jag listat alla HTML-dokument krävs det alltså enbart att användaren besöker index-sidan. Eftersom den totala mängden data mina resurser tar upp inte överstiger 5Mb så tyckte jag detta var ett lämpligt cachnings-alternativ.</p>
<p>Genom att använda mig av denna metod ger jag min applikation tre fördelar: <br />
1. Användare kan navigera på hela webbsidan när de är offline. <br />
2. Resurser kommer direkt från den lokala datorn. Ingen nätverksrutt krävs. <br />
3. I det fall min sida stängs ned på grund av exempelvis underhåll så kommer mina besökare få offline-upplevelsen [8].</p>

<p>I det fall applikationen går offline kommer den vara cachad tills något av följande sker:<br />
1. Användaren rensar webbläsarens 'datastorage' för min sida.<br />
2. Manifest-filen modifieras [8].</p>

<p>Första gången användaren går in på min sida cachas alla listade och önskade resurser. Efter detta kommer webbläsaren per automatik känna av om manifestfilen har ändrats. Om den inte har ändrats händer ingenting, men om webbläsaren känner av att den modifierats kommer den automatiskt ladda ned de nya versionerna av filerna [8]. Det som är så smidigt med denna cach-metod är att allting sköts per automatik. Ingen programmering krävs för att verifiera, sätta och ladda ned filer [8].</p>

<p>I det fall en användare förlorar anslutning kommer denne meddelas detta per automatik via Offline.js API:et som jag implementerat i min webbapplikation. Jag har även satt som standard att alltid visa en indikationsruta i nedre vänstra hörnet på skärmen huruvida användaren är ansluten eller ej.</p>

<h2>Risker med din applikation</h2>

<h2>Egen reflektion kring projektet</h2>

<p>Överlag tycker jag att projektet har gått bra. Det har varit motiverande och roligt att arbeta med projektet eftersom man har haft såpass fria händer rörande vad applikationen ska hantera för data samt implementation av verktyg och API:er. Visserligen har det uppstått en del hinder på vägen som varit såväl tidskrävande som frustrerande. Lyckligtvis har inget av dessa resulterat i att en önskad funktion blivit utelämnad eller dylikt.</p>

<h4>Vilka eventuella problem har du stött på?</h4>

<h4>Finns det funktioner som du velat implementera men inte hunnit?</h4>
<p>Rörande funktionalitet finns det ytterligare en del funktioner jag hade velat implementera.</p>

<p>1. Inom sidan för lokal redigering ('localimage.html') hade jag velat implementera funktionalitet för att kunna dra och släppa en bildfil inom ett fält på sidan för att så vis få en automatisk inladdning av bilden. Detta skulle även erbjuda ytterligare användarvänlighet för besökaren. Man skulle alltså slippa klicka på "Upload image"-knappen.</p>

<p>2. Inom sidan för redigering av Google Drive bilder ('driveimage.html') hade jag velat vidareutveckla funktionaliteten rörande "Edit"-knappen. I det fall användaren har redigerat en bild för att sedan klicka på "Edit" ytterligare en gång så laddas den ursprungliga bilden in igen i verktyget, inte den temporärt redigerade versionen.</p>

<p>3. En ytterligare funktion jag hade velat implementera på sidan för Google Drive bilder är att vid sparning per automatik döpa den redigerade bilden till originalbildens namn plus en passande ändelse likt exempelvis "_edited". Jag hade dock undvikit att låta användaren själv skriva i ett namn.</p>

<p>4. Redigeringsverktyget min webbapplikation använder sig av tillåter enbart bildformaten Png och Jpg/Jpeg. Detta är även något jag talar om för användaren på sidan. Dock hade en trevlig funktion varit om användaren gavs möjlighet att konvertera en bild i ett icke godkänt format till antingen Png eller Jpg/Jpeg. En fråga till användaren huruvida denne vill konvertera en bild i felaktigt format skulle även kunna visas i samband med felmeddelandet som uppstår vid inladdning av bild.</p>

<h4>Hur skulle du vilja jobba vidare med din applikation?</h4>

<h4>Vad anser du vara betygshöjande med din applikation?</h4>


<h2>Referenslista</h2>

<h3>Webbsidor</h3>

[1] J. Williams, D. Wichers, "Cross-site Scripting (XSS)," *OWASP*, 2013 [Online] Tillgänglig: [https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)). [Hämtad: 1 december, 2015].

[2] J. Williams, D. Wichers, "Top 10 2013-A3-Cross-Site Scripting (XSS)," *OWASP*, 2013 [Online] Tillgänglig: [https://www.owasp.org/index.php/Top_10_2013-A3-Cross-Site_Scripting_(XSS)](https://www.owasp.org/index.php/Top_10_2013-A3-Cross-Site_Scripting_(XSS)). [Hämtad: 1 december, 2015].

[3] J. Williams, D. Wichers, "Top 10 2013-Top 10," OWASP, 2013 [Online] Tillgänglig: [https://www.owasp.org/index.php/Top_10_2013-Top_10]. [Hämtad: 1 december, 2015].

[4] J. Williams, D. Wichers, "Top 10 2013-A2-Broken Authentication and Session Management," OWASP, 2013 [Online] Tillgänglig: [https://www.owasp.org/index.php/Top_10_2013-A2-Broken_Authentication_and_Session_Management]. [Hämtad: 2 december, 2015].

[8] E. Bidelman, "A Beginner's Guide to Using the Application Cache," HTML5Rocks, 2013 [Online] Tillgänglig: [http://www.html5rocks.com/en/tutorials/appcache/beginner/]. [Hämtad: 14 januari, 2016].


### Böcker ###

[5] S. Souders, *High Performance Web Sites: Essential Knowledge for Frontend Engineers*, Sebastopol: O’Reilly, 2007, 40-41.

[6] S. Souders, High Performance Web Sites: Essential Knowledge for Frontend Engineers, Sebastopol: O’Reilly, 2007, 56.

[7] S. Souders, High Performance Web Sites: Essential Knowledge for Frontend Engineers, Sebastopol: O’Reilly, 2007, 45.
