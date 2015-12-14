# Projektbeskrivning #

Min projektidé är att utveckla en webbapplikation i vilken man ska kunna ladda in bilder för att sedan redigera dessa.
De redigeringsverktyg som kommer behövas har jag planerat implementera med hjälp av PIXLR:s API (länk nedan). De bilder vilka användaren kan tänkas vilja redigera ska dels kunna laddas in lokalt från datorn och dels från Google's Picasa alternativt Drive. För att detta ska vara möjligt kommer en inloggning krävas via Google's egna loginsystem vilket jag tänker implementera med hjälp av deras API:er. Väljer användaren att ladda in en bild från någon av dessa tjänster kommer en inloggning alltså krävas. Väljer användaren dock att enbart ladda in bilden från datorn kommer ingen inloggning krävas. 


### Länkar till API:er/Guider###

##### Google #####
https://developers.google.com/identity/sign-in/web/ <br />
https://developers.google.com/identity/ <br />
https://developers.google.com/picasa-web/
##### PIXLR #####
https://support.pixlr.com/hc/en-us/articles/209350978-The-Pixlr-API-embedding-Pixlr-web-applications-in-your-own-site
