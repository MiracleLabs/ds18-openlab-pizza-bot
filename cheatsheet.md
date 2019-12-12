# DS19 Open Lab | Build a Pizza Bot using Microsoft Bot Framework

The below markdown file consists of code snippets and notes that will help you to complete the lab - Build a Pizza Bot using Microsoft Bot Framework.

## Node JS Commands

### For creating package.json file

```
npm init
```

### To install restify module

```
npm install restify
```

### To install luis-sdk module

```
npm install luis-sdk
```

### To install ping module

```
npm install ping
```

### To install botbuilder module

```
npm install botbuilder
```

### To install moment module

```
npm install moment
```

## Code Snippets

### Set up Restify Server and Create Chat bot

```
     var server = restify.createServer();
     server.listen(process.env.port || process.env.PORT || 3000, function ()
     {
       console.log(moment().format('MMMM Do YYYY, hh:mm:ss a') + " |  Pizza Bot is running with the address : " + server.url);
     });
    var connector = new builder.ChatConnector({
    appId: "<bot-app-id>",
    appPassword: "<bot-app-pwd>"
	});

    var bot = new builder.UniversalBot(connector, {
    storage: new builder.MemoryBotStorage()
    });
    var model='<luis-model-publish-url>';
    var recognizer = new builder.LuisRecognizer(model);
    var dialog = new builder.IntentDialog({
    recognizers: [recognizer]
    });
    server.post('/api/messages', connector.listen());
    bot.dialog('/', dialog);
```

### Bot Dialogs

```
    dialog.matches('<your-intent-name>', [
    function (session, args) {
        session.send("<your-bot-response>");
		}
      ]);
```
