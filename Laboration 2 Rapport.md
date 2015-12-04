# Webbteknik 2 #
## Laboration 2 Rapport ##
### Skriven av Wictor Kihlbaum (wk222as) ###

## Säkerhetsproblem ##

#### Textfält för meddelande är ej skyddat mot XSS-attacker (Cross Site Scripting) ####

#### Innebörd ####

Detta är den mest utbredda säkerhetsrisken rörande webbapplikationer. Det är ett problem som innebär att applikationen tar ej anförtrodd data och skickar det till webbläsaren utan ordentlig validering eller hantering. XSS tillåter angripare att exekvera skript i offrets webbläsare vilket exempelvis kan kapa dennes sessioner, vanställa webbsidor eller omdirigera användaren till maliciösa sidor [2]. 
XSS-attacker kan generellt kategoriseras i två typer varav den ena är ”Stored” och den andra är ”Reflected”. Båda dessa attacker kan ske på antingen servern eller klienten. Det finns dock även en tredje, mindre känd typ av attack som kallas ”DOM Based XSS” [3]. 

### Följder ###
 
Attacker av typen ”Stored” är de i vilka det injicerade skriptet är permanent lagrat på de inriktade servrarna, exempelvis i en databas, i ett meddelande-forum, besökslog eller kommentarsfält. Offret får sedan det maliciösa skriptet skickat till sig från servern när den frågar om den lagrade informationen [3]. 

Attacker av typen ”Reflected” är de i vilka det injicerade skriptet kastas tillbaka från webbservern. Detta kan exempelvis vara i form av ett felmeddelande, sökresultat eller någon annan typ av respons vilken inkluderar inmatning skickad till servern som del av förfrågan. Dessa attacker skickas till offer via en annan rutt, exempelvis i ett epost-meddelande eller på någon annan webbplats. När en användare sedan klickar på en maliciös länk, för att exempelvis skicka in en blankett eller navigera till en sida, skickas den injicerade koden till en sårbar webbplats, vilket i sin tur kastar tillbaka attacken mot användarens webbläsare. Webbläsaren exekverar därefter koden eftersom den anses ha skickats från en ”pålitlig” server [3]. 

### Åtgärder ###

Skydda sig mot XSS-attacker kräver separation av opålitlig data från aktivt innehåll i webbläsaren. Det föredragna valet är att ordentligt behandla och städa undan all opålitlig data baserad på HTML-kontexten, så som body, attribute, JavaScript, CSS och URL, i vilket data kommer bli inplacerad [4]. 
Positiv eller ”Whitelist” validering är också rekommenderat då det hjälper till att skydda mot XSS. Detta är dock inget komplett skydd eftersom många applikationer kräver specialtecken i deras inmatningsfält. Sådan validering skall, i den mån det går, validera längden, tecknen, formatet och affärsregler rörande datan innan inmatningen accepteras. 
Det finns även bibliotek likt OWASP’s ”AntiSamy” vilka automatiskt behandlar inmatat data [4]. 
W3C-specifikationen ”Content Security Policy” kan också hjälpa en att skydda sig mot XSS-attacker. Den erbjuder möjligheten att instruera webbläsaren från vilken plats och/eller typ av resurser som är tillåtna att laddas in [4]. 

### Obehöriga användare ges åtkomst till funktioner och tvingade URL:er (Missing Function Level Access Control) ###

#### Innebörd ####

De flesta applikationer verifierar rättigheter innan en funktion visas i användargränssnittet. Dock krävs det att dessa applikationer även utför samma kontroll av rättigheter på servern när åtkomst ges till varje funktion. Om förfrågningar inte verifieras kommer angripare kunna tvinga dessa förfrågningar i syfte att ges åtkomst till funktionalitet utan ordentlig auktorisering [2]. 

Detta är ett problem vilket kan innebära att en angripare, som är auktoriserad systemanvändare, helt enkelt kan ändra URL-adressen eller en parameter till en privilegierad funktion. I det fall åtkomst ges innebär det i sin tur att anonyma användare kan komma åt privata funktioner vilka inte är skyddade. Administrativa funktioner är huvudmål för denna typ av attacker [5].

#### Följder ####

#### Åtgärder ####

Att upptäcka brister som möjliggör dessa attacker är enkelt. Det svåra är att identifiera vilka sidor eller funktioner som finns att angripa. För att förebygga dessa attacker skall din applikation ha en konsekvent och analysbar auktorisering-modul vilken skall anropas från samtliga funktioner. Sådant skydd skall konstant förses från en eller flera externa komponenter till applikationen. 

De övervakande mekanismerna skall i standardutförande neka all åtkomst, och kräva tydlig tillåtelse till specifika roller för åtkomst till samtliga funktioner. Om en funktion är involverad i ett arbetsflöde skall man verifiera att förhållandena är i lämpligt tillstånd för att tillåta åtkomst. Att enbart dölja länkar och knappar för ej auktoriserade skyddar egentligen inte. Det krävs även implementering av verifikation i affärslagret [5]. 
Det bästa sättet att få reda på om en applikation har misslyckats med att ordentligt begränsa åtkomstnivån är att verifiera samtliga applikationsfunktioner. Kontrollera om användargränssnittet visar någon typ av navigation till ej auktoriserade funktioner. Man skall också undersöka om serversidan saknar verifikation av autentisering eller auktorisering. 

Ett annat sätt att hitta risker för denna typ av angrepp är genom att använda en Proxy och navigera igenom sin applikation med en privilegierad användare. Efter detta skall man på nytt besöka de begränsade sidorna med en mindre privilegierad användare. I det fall svaren från servern är lika är man förmodligen sårbar. Man kan också kontrollera implementeringen av åtkomstverifikationen i koden. Genom att följa en viss priviligierad förfrågan genom koden och verifiera tillvägagångssättet gällande auktorisering kan man sedan jämföra med resten av kodbasen för finna var det tillvägagångssättet inte följs [5].

### Session tas ej bort ordentligt vid utloggning (Broken Authentication and Session Management) ###

#### Innebörd ####

Detta är ett problem som innebär att angripare tillåts äventyra lösenord, nycklar, så kallade "Session-tokens" eller utnyttja andra brister i implementationen för att upptaga andra användares identiteter [2].

Utvecklare bygger ständigt skräddarsydda verifiering- och sessionhanterande scheman. Eftersom dessa scheman är svårutvecklade har de ständigt brister och sårbarheter kring områden som utloggning, lösenordshantering, timeouts, "kom ihåg mig", hemlig fråga, kontouppdatering och så vidare. Det kan ibland vara mycket svårt att hitta dessa sårbarheter eftersom varje implementation är unik [6]. 

#### Följder ####

Dessa attacker och brister kan tillåta vissa eller till och med samtliga konton att attackeras. Skulle en angripare lyckas med attacken kan denne utföra allt som användaren skulle kunna. Det är de privilegierade kontona vilka ständigt är inriktade av angripare [6].

#### Åtgärder ####

Det man som utvecklare bland annat kan undersöka för att upptäcka om man lider av dessa brister och sårbarheter är att se över huruvida verifiering av användaruppgifter är skyddade när de hashas vid lagring. Man kan även vara sårbar i det fall sessions-IDs visas i URL-adressen, inte dör efter viss tid, eller tillsammans med lösenord och andra uppgifter skickas över ej krypterade anslutningar.
Den främsta rekommendationen för en organisation är att möjliggöra för utvecklare en uppsättning av stark verifiering- och sessions-hanteringskontroller. Dessa kontroller skall sträva efter att uppfylla samtliga nämnda krav rörande verifiering- och sessions-hantering i OWASP's "Application Security Verification Standard".
Dessa kontroller skall även erbjuda ett enkelt gränssnitt för utvecklare. En rekommendation är "ESAPI Authenticator and User APIs" då dessa är bra exempel på att emulera, använda och bygga vidare på. Man skall även arbeta hårt för att undvika XSS-sårbarheter vilka kan nyttjas till att stjäla session-IDs [6].


### Lagrade procedurer används ej vid verifiering av användaruppgifter (Injection) ###

#### Innebörd ####

Detta är ett problem som innebär att injektionsbrister, likt SQL, OS och LDAP, sker när obetrodd data skickas till en interpreterare som del av ett kommando eller så kallad "query". Angriparens fientliga data kan lura interpreteraren till att exekvera oavsiktliga kommandon eller ge åtkomst till data utan ordentlig auktorisering [2]. 

#### Följder ####

Injektioner kan resultera i dataförlust, korruption, brist av ansvarsskyldighet eller nekad åtkomst. Inketioner kan ibland leda till totala övertaganden.

#### Åtgärder ####

Att förebygga injektioner kräver att man håller obetrodd data separerat från kommandon och "queries". Det föredragna valet är att använda ett säkert API vilket antingen undviker användandet av en interpreterare helt och hållet eller förser ett parametriserat gränssnitt. Man skall dock vara försiktig med APIs som har lagrade procedurer och är parametriserade eftersom de fortfarande kan introducera injektioner under huven.
I det fall ett parametriserat API inte finns tillgängligt skall man försiktigt städa undan specialtecken genom att använda den specifika syntaxen för den interpreteraren. OWASP's ESAPI förser många av dessa städrutiner.
Positiv eller "white list" inmatningsvalidering är även det rekommenderat. Det är dock inte ett komplett skydd då många applikationer kräver specialtecken i deras inmatningsfält.


### Användaruppgifter lagras som klartext i databasen (Sensitive Data Exposure) ###

#### Innebörd ####

Detta problem innebär helt enkelt att man inte krypterat den känsliga datan. I det fall känslig data, så som kreditkort, ID och verifikationssuppgifter, inte skyddas ordentligt kan det innebära att angripare stjäl eller modifierar den känsliga och oskyddade datan. Detta för att i sin tur begå kreditkortsbedrägeri, identitetsstöld eller andra brott. Känslig data förtjänar extra skydd så som kryptering och speciella försiktighetsåtgärder vid utbyte med webbläsaren [2].

#### Följder ####

Misslyckande i att skydda känslig data äventyrar ständigt ALL data som borde varit skyddad. Denna känsliga data innefattar bland annat sjukjournaler, användaruppgifter, personlig data och kreditkort [7]. I detta specifika fall rör det sig om användarnamn samt tillhörande lösenord.

#### Åtgärder ####

Rörande skydd av känslig data finns ett antal punkter vilka samtliga skall utföras. Man bör tänka över de olika hoten man planerar skydda sin data från, såväl interna som externa angrepp, för att sedan försäkra sig om att kryptera all känslig data på sätt som skyddar mot dessa angrepp. Man skall heller inte lagra känslig data i onödan. Det skall förkastas snarast möjligast. Data du inte innehar kan heller inte stjälas från dig.
Som utvecklare skall man även se till att starka standard algoritmer och starka nycklar används, men också ordentlig nyckelhantering. Exempel på vad som kan användas är "FIPS 140 validated cryptographic modules".
Det skall försäkras om att lösenord lagras genom en algoritm specifikt utformad för lösenordsskydd. Exempel på dessa är "bcrypt", "PBKDF2" och "scrypt".
Ett par saker att föredra är även att dels inaktivera autofyll i forms/blanketter vilka samlar känslig data, och dels inaktivera cachning för sidor vilka innehåller känslig data.  


### Det går att få åtkomst till databasfil via URL (Insecure Direct Object References) ###

#### Innebörd ####

Problemet innebär att en utvecklare har exponerat en referens till ett internt implementerat objekt. Detta kan röra sig om en fil, katalog eller databasnyckel. Utan en åtkomstvalidering eller annat typ av skydd kan angripare manipulera dessa referenser för att ges åtkomst till oauktoriserad data [2]. I detta specifika fall rör det sig om att man med URL-strängen: *http://localhost:8080/static/message.db* kan komma åt hela databasen med användaruppgifter. Detta på grund av att dess källa, katalog samt fil exponerats i koden.

#### Följder ####

Dessa typer av brister kan äventyra ALL data som kan refereras av parametern. Såvida inte objektreferenser är oförutsägbara är det mycket enkelt för en angripare att tillge sig åtkomst till all tillgänglig data av samma typ.

#### Åtgärder ####

Att skydda sig mot dessa attacker kräver att man väljer ett tillvägagångssätt för att skydda varje användares tillgängliga objekt, så som objektnummer och filnamn. Man skall använda indirekta objektreferenser för varje användare och session. Detta förebygger angripare från att direkt inrikta sig på oauktoriserade resurser. Applikationen måste även kartlägga varje användares indirekta referens tillbaka till den faktiska databasnyckeln på servern. OWASP's ESAPI inkluderar både sekventiellt och slumpmässigt åtkomliga referenskartor vilka utvecklare kan använda för att eliminera direkta objektreferenser. För varje användning av en direkt objektreferens från en opålitlig källa måste valideringskontroll inkluderas för att försäkra att användaren är auktoriserad för det förfrågade objektet [11].


## Prestandaproblem ##

### Style-taggar placerade utanför head-tag ###

#### Innebörd ####

Det finns style-taggar vilka ligger utanför head-taggen på startsidan av applikationen. Detta är ett problem vilket kan, beroende på vilken webbläsare som används samt hur sidan laddas in, leda till en blank vit sida[1].

#### Följder ####

Detta leder till en dålig användarupplevelse eftersom ingen visuell respons ges som skulle kunna försäkra användaren om att dennes begäran behandlas korrekt. Detta kan i sig leda till att användaren undrar vad som försiggår och istället lämnar sidan.

#### Åtgärder ####

För att undvika blank vit sida skall ens stylesheet placeras högst upp i dokumentets head-tagg. Detta löser samtliga problematiska scenarion. Oavsett hur sidan laddas in (nytt fönster, omladdning eller som hem/start-sida) kommer sidan alltid laddas progressivt[1].


### Samtliga skript och CSS-regler laddas ej in via externa filer ###

#### Innebörd ####

Problemet innebär att dessa resurser inte har möjlighet att cachas vilket generellt innebär långsammare laddning av webbsidor eftersom de måste laddas in på nytt inför varje besök. Enda gången det är värt att överväga att ladda in resurser via så kallad "inline" är i det fall din webbsida inte besöks nämnvärt ofta. Eftersom inline-resurser laddas in snabbare per se kan detta tillvägagångssätt vara att föredra. Speciellt eftersom de eventuella cach-filerna av externa skript och CSS-regler med stor sannolikhet redan raderats från användarens webbläsare, och sedermera inte gynnar en snabbare laddning av webbplatsen [9].

#### Följder ####

Detta medför att HTML-sidorna tar upp större plats i det fall resurser som skript och CSS-regler inte laddas in externt [9]. Detta i sig innebär alltså mer data att ladda in för användaren inför varje besök vilket kan öka väntetiden avsevärt. 

#### Åtgärder ####

Först och främst behöver detta inte nödvändigtvis vara ett problem. Man får helt enkelt först undersöka hur pass ofta ens webbsida besöks av användare. I det fall den besöks ofta är det att rekommendera att ladda in externa resurser via head-taggen högst upp i HTML-koden. I det fall webbsidan inte besöks särskilt ofta kan laddning via inline vara värt att överväga eftersom de laddas in snabbare [9]. 


### Komponenter cachas ej med framtida Expire-värden (eller Cache-control) ###

#### Innebörd ####

Genom att inte använda ett framtida Expire-värde möjliggör du inte för cachning. Detta i sin tur leder till betydligt fler och onödiga HTTP-förfrågningar på sidor. En Expire-header används oftast tillsammans med bilder, men det skall användas på samtliga komponenter. Detta inkluderar bland annat skript och stylesheets [12].

#### Följder ####

Följderna blir att sidor laddas in långsammare eftersom webbläsaren inte har möjlighet att kontroller ifall den behöver hämta de tillhörande komponenterna på nytt eller om den kan använda dem den redan innehar [12]. 

#### Åtgärder ####

Först och främst skall man börja sätta ett Expire-värde på cachen av sina komponenter. Det finns dock även ett mycket bra alternativ till detta vilket heter "Cache-control". Expire-värden har ett specifikt datum satt som konstant måste kontrolleras. När detta datum passeras måste ett nytt datum av uppenbara skäl sättas.
Cache-control är bra på så sätt att den använder en maxålder för att specificera hur länge en komponent är cachad. Sedan kontrollerar den hur pass lång tid som passerat av den totala tid som satts skall få passera i cachen. Ifall mindre tid passerat än vad som satts som maxålder i cachen kommer webbläsaren använda den cachade versionen. Detta ger en mindre HTTP-förfrågan att utföra. Ett värde på en cache-control's maxålder kan sträcka sig så långt som tio år frammåt i tiden [12].
Även om man anser att cache-controler är bättre än Expire-header skall man dock fortsätta nyttja dem båda tillsammans då det kan finnas webbläsare vilka inte stödjer HTTP/1.1. vilket krävs för cache-controler [12].


### ETaggar används vid cachning av komponenter ###

#### Innebörd ####

Först och främst behöver detta inte nödvändigtvis vara ett problem. Man skall först undersöka ifall man använder sig av en eller flera olika servrar som upprätthåller ens webbplats.

ETaggar (Entity tags) är en mekanism som webbservrar och webbläsare använder för att validera cachade komponenter. Dessvärre hindrar dock dessa ETaggar cachning när en webbplats är uppsatt på flertalet servrar. En ETag är en sträng vars uppgift är att på ett unikt vis identifiera en specifik version av en komponent. Denna sträng även måste citeras. Ursprungsservern specifierar komponentens ETag genom ETaggens svars-header [10]. 

#### Följder ####

Problemet med ETaggar är att de är generellt konstruerade att använda attribut som gör dem unika för en specifik server som tillhandahåller en webbplats. ETaggar kommer ej att matcha i det fall en webbläsare får ursprungskomponenten från en server och senare utför en GET-förfrågan som går till en annorlunda server. Detta i sin tur leder till att komponenter måste laddas ner mycket oftare än vad som behövs, vilket innebär försämrad prestanda. Den onödiga omladdningen av komponenter innebär även en prestandapåverkan på servrarna samt ökning av bandbreddskostnader [10].

#### Åtgärder ####

I det fall man har komponenter vilka måste valideras baserat på något annat än "senast-ändrad" datumet är ETaggar ett mycket kraftfullt sätt att använda sig av. Har du dock inget behov av att skräddarsy ETaggar är det bästa sättet att ta bort dem helt och hållet. "Senast-ändrad"-header förser tillräckligt med information. Att radera ETaggen minskar även storleken på HTTP-headers i såväl mottagna som efterföljande förfrågningar [10].


## Egna övergripande reflektioner ##

Inledningsvis har jag lyckats erhålla mycket mer förståelse och insyn i en del av alla de säkerhetshål och diverse angrepp på dessa som kan förekomma. Även om säkerhetsbrister, likt läct känslig data, aldrig någonsin är försvarbart har jag likväl fått mer förståelse för utvecklaren. Att skydda och förebygga diverse attacker gentemot en mjukvara är verkligen inget enfrontskrig. Detta är något vilket kräver ständigt överseende samt uppdaterande. Det gäller även som utvecklare att, likt mjukvaran man upprätthåller, hålla sig själv ajour med branchen.

Min uppfattning är även den att det är mycket lätt att missa potentiella säkertshål i koden på grund av det faktum att det finns så pass många anfallsvinklar. Det är inte nämnvärt märkligt att säkerhetshål uppdagas med tanke på att man som utvecklare dels först och främst skall vara påläst om samtliga av de säkertshål vilka redan existerar, och dels vara uppdaterad om eventuellt nya säkertshål som kan tänkas uppstå och läcka ut. Att dessutom addera in tidspress, deadlines samt stress från företaget man arbetar för förstärker förmodligen bara riskerna för en, ur säkerhetsaspekt, ofärdig produkt vilken måste städas dagar eller till och med veckor efter släppdatum.

I övrigt anser jag att detta varit en mycket lärorik uppgift. Möjligheten att få analysera koden i en applikation vilken någon annan programmerat i försök att upptäcka brister och ge förslag till förbättring har varit uppskattat.
Det känns även som att detta varit ett effektivt sätt för inlärning av teorin. Eftersom man pendlat mellan kodanalysering, läsa källor samt förklara och sammanfatta innebörd, följder och åtgärder för var och ett av samtliga funna problem.  


## Referenslista ##

### Böcker ###

[1] S. Souders, *High Performance Web Sites: Essential Knowledge for Frontend Engineers*, Sebastopol: O’Reilly, 2007, 40-41.

[9] S. Souders, *High Performance Web Sites: Essential Knowledge for Frontend Engineers*, Sebastopol: O’Reilly, 2007, 56.

[10] S. Souders, *High Performance Web Sites: Essential Knowledge for Frontend Engineers*, Sebastopol: O’Reilly, 2007, 89-92.

[12] S. Souders, *High Performance Web Sites: Essential Knowledge for Frontend Engineers*, Sebastopol: O’Reilly, 2007, 22-23.

### Webbsidor ###

[2] J. Williams, D. Wichers, "Top 10 2013-Top 10," *OWASP*, 2013 [Online] Tillgänglig: [https://www.owasp.org/index.php/Top_10_2013-Top_10](https://www.owasp.org/index.php/Top_10_2013-Top_10). [Hämtad: 1 december, 2015]. 

[3] J. Williams, D. Wichers, "Cross-site Scripting (XSS)," *OWASP*, 2013 [Online] Tillgänglig: [https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)). [Hämtad: 1 december, 2015]. 

[4] J. Williams, D. Wichers, "Top 10 2013-A3-Cross-Site Scripting (XSS)," *OWASP*, 2013 [Online] Tillgänglig: [https://www.owasp.org/index.php/Top_10_2013-A3-Cross-Site_Scripting_(XSS)](https://www.owasp.org/index.php/Top_10_2013-A3-Cross-Site_Scripting_(XSS)). [Hämtad: 1 december, 2015]. 

[5] J. Williams, D. Wichers, "Top 10 2013-A7-Missing Function Level Access Control," *OWASP*, 2013 [Online] Tillgänglig: [https://www.owasp.org/index.php/Top_10_2013-A7-Missing_Function_Level_Access_Control](https://www.owasp.org/index.php/Top_10_2013-A7-Missing_Function_Level_Access_Control). [Hämtad: 2 december, 2015].

[6] J. Williams, D. Wichers, "Top 10 2013-A2-Broken Authentication and Session Management," *OWASP*, 2013 [Online] Tillgänglig: [https://www.owasp.org/index.php/Top_10_2013-A2-Broken_Authentication_and_Session_Management](https://www.owasp.org/index.php/Top_10_2013-A2-Broken_Authentication_and_Session_Management). [Hämtad: 2 december, 2015].

[7] J. Williams, D. Wichers, "Top 10 2013-A6-Sensitive Data Exposure," *OWASP*, 2013 [Online] Tillgänglig: [https://www.owasp.org/index.php/Top_10_2013-A6-Sensitive_Data_Exposure](https://www.owasp.org/index.php/Top_10_2013-A6-Sensitive_Data_Exposure). [Hämtad: 2 december, 2015].

[8] J. Williams, D. Wichers, "Top 10 2013-A1-Injection," *OWASP*, 2013 [Online] Tillgänglig: [https://www.owasp.org/index.php/Top_10_2013-A1-Injection](https://www.owasp.org/index.php/Top_10_2013-A1-Injection). [Hämtad: 2 december, 2015].

[11] J. Williams, D. Wichers, "Top 10 2013-A4-Insecure Direct Object References," *OWASP*, 2013 [Online] Tillgänglig: [https://www.owasp.org/index.php/Top_10_2013-A4-Insecure_Direct_Object_References](https://www.owasp.org/index.php/Top_10_2013-A4-Insecure_Direct_Object_References). [Hämtad: 3 december, 2015].
