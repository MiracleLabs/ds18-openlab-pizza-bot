//Add the modules that are required

var restify = require('restify');
var builder = require('botbuilder');
var LUIS = require('luis-sdk');
var moment = require('moment');
var ping = require("ping");

//Global variables

var pizzatype;

// Setup Restify Server

var server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3000, function() {
	
    console.log("--------------------------------------------------------");
    console.log(moment().format('MMMM Do YYYY, hh:mm:ss a') + " | Pizza Bot is running with the address : " + server.url);
    console.log("--------------------------------------------------------");
	
});

server.get('/public/*', restify.plugins.serveStatic({ directory: __dirname })); 

// Create chat bot

var	connector = new builder.ChatConnector({ 
	appId: "<bot-app-id>",
appPassword: "<bot-app-pwd>"
});

var bot = new builder.UniversalBot(connector, {
    storage: new builder.MemoryBotStorage()
});

var model = '<luis-model-publish-url>';

var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });

server.post('/api/messages', connector.listen());

//=================================== Functions For Rich cards ===============================================

function getCardsAttachments(session) {
    return [
	
        new builder.HeroCard(session)
		
		    .title('MEDITERRANEAN PIZZA')
			
            .images([
                builder.CardImage.create(session, 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Supreme_pizza.jpg')
            ])
			
			.buttons([
                builder.CardAction.imBack(session, 'Mediterranean Pizza', "Add Mediterranean Pizza")
				
 ]),
             new builder.HeroCard(session)
			 
            .title('ROMAN VEG SUPREME')
			
           .images([
                builder.CardImage.create(session, 'https://www.patrasevents.gr/imgsrv/f/full/22394.png')
				])
				
				.buttons([
                builder.CardAction.imBack(session, 'Roman Veg Supreme',"Add Roman Veg Supreme")

            ]),
			
   ];
}
function getCardsAttachments3(session) {
    return [
	
        new builder.HeroCard(session)
		    
            .title('PEPPER BARBEQUE CHICKEN')
            
            .images([
                builder.CardImage.create(session, 'https://www.dominos.co.in/files/items/Barbeque-Chicken.png')
            ])
			
			.buttons([
                builder.CardAction.imBack(session, 'Pepper Barbeque Chicken', "Add Pepper Barbeque Chicken")
				
 ]),
             new builder.HeroCard(session)
			 
            .title('CHICKEN TIKKA')
			
           .images([
                builder.CardImage.create(session, 'https://www.dominos.co.in/files/items/Dish14-chicken%20mexicana%20copy_1346593723.jpg')
				])
				
				.buttons([
                builder.CardAction.imBack(session, 'Chicken Tikka',"Add Chicken Tikka")

				
            ]),
			
   ];
}
function getsizecard(session) {
    return [
	
        new builder.HeroCard(session)
		
		.title('Please select the size')
		
            .buttons([
                builder.CardAction.imBack(session, 'Small - 4 Slices', "Small - 4 Slices"),
				builder.CardAction.imBack(session, 'Medium - 6 Slices', "Medium - 6 Slices"),
				builder.CardAction.imBack(session, 'Large - 8 Slices', "Large - 8 Slices")
              ]),
	 ];
}
function getCardsAttachments2(session) {
    return [
	
        new builder.HeroCard(session)
		
		   .title(' What kind of pizzas do you want?')
		   
            .buttons([
                builder.CardAction.imBack(session, 'Veg', "Veg"),
				builder.CardAction.imBack(session, 'Non veg', "Non Veg")
				
              ]),
	 ];
}
function getcustomizeoptions(session) {
    return [
	
        new builder.HeroCard(session)
		
		.title('Select the options you want to add')
		
            .buttons([
                builder.CardAction.imBack(session, 'Crust Type', "Crust Type"),
				builder.CardAction.imBack(session, 'Toppings', "Toppings")
				
              ]),
	 ];
}
function getCardsAttachments4Yes_No(session) {
    return [
	
        new builder.HeroCard(session)
		
		.title('Please select Yes/No')
		
        .buttons([
            builder.CardAction.imBack(session, 'Yes', "Yes"),
            builder.CardAction.imBack(session, 'No', "No"),
        ])
    ];
}
function gettoppings(session) {
    return [
	
        new builder.HeroCard(session)
		
		.title('Select toppings of your choice')
		
        .buttons([
            builder.CardAction.imBack(session, 'Onions', "Onions"),
            builder.CardAction.imBack(session, 'BlackOlive', "BlackOlive"),
			builder.CardAction.imBack(session, 'Capsicum', "Capsicum"),
			builder.CardAction.imBack(session, 'Paneer', "Paneer"),
			builder.CardAction.imBack(session, 'Mushroom', "Mushroom")
        ])
    ];
}
function gettoppings_nonveg(session) {
    return [
	
        new builder.HeroCard(session)
		
		.title('Select toppings of your choice')
		
        .buttons([
            builder.CardAction.imBack(session, 'Chicken', "Chicken"),
            builder.CardAction.imBack(session, 'Tandoori', "Tandoori")
			
        ])
    ];
}
function getcrusttype(session) {
    return [
	
        new builder.HeroCard(session)
		
		.title('Select Crust Type of your choice')
		
        .buttons([
            builder.CardAction.imBack(session, 'Thin Crust', "Thin Crust"),
            builder.CardAction.imBack(session, 'FlatBread', "FlatBread"),
			builder.CardAction.imBack(session, 'Sicilian Style', "Sicilian Style"),
			builder.CardAction.imBack(session, 'Neapolitan Crust', "Neapolitan Crust")
        ])
    ];
}
function getcrusttype_nonveg(session) {
    return [
	
        new builder.HeroCard(session)
		
		.title('Select Crust Type of your choice')
		
        .buttons([
            builder.CardAction.imBack(session, 'Thin Crust', "Thin Crust"),
            builder.CardAction.imBack(session, 'FlatBread', "FlatBread")
        ])
    ];
}


//=========================================================//	Bots Dialogs //=========================================================

bot.dialog('/', dialog);

//Greeting Intent

dialog.matches('Greeting', [

    function(session, args) {
		
        console.log("--------------------------------------------------------");
        console.log(moment().format('MMMM Do YYYY, hh:mm:ss a') + " | Greetings Intent Matched");
        console.log("--------------------------------------------------------");
		
        session.send("Welcome to Miracle's Pizza.");
		
		var cards = getCardsAttachments2();
        var reply = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(cards);
        session.send(reply);
		
		
    }
]);
//Veg Intent

dialog.matches('Veg', [

function(session) {
	
	  pizzatype = session.message.text;
	  
        console.log("--------------------------------------------------------");
        console.log(moment().format('MMMM Do YYYY, hh:mm:ss a') + " | veg Intent Matched");
        console.log("--------------------------------------------------------");
		
		session.send("Pick any one of the following pizza");
		
		var cards = getCardsAttachments();
		var reply = new builder.Message(session)
		.attachmentLayout(builder.AttachmentLayout.carousel)
		.attachments(cards);
		session.send(reply);
	}

]);

//Non Veg Intent

dialog.matches('Non Veg', [

function(session) {
	
		pizzatype=session.message.text;
		
        console.log("--------------------------------------------------------");
        console.log(moment().format('MMMM Do YYYY, hh:mm:ss a') + " | Non veg Intent Matched");
        console.log("--------------------------------------------------------");
		
		session.send("Pick any one of the following pizza");
		
		var cards = getCardsAttachments3();
        var reply = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(cards);
		session.send(reply);
		
	}
]);
//Pizza Type Intent

dialog.matches('pizza type',[

function(session) {
	
        console.log("--------------------------------------------------------");
        console.log(moment().format('MMMM Do YYYY, hh:mm:ss a') + " | pizza type Intent Matched");
        console.log("--------------------------------------------------------");
		
		var cards = getsizecard();
        var reply = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(cards);
		
		session.send(reply);
	  
	}
]);
//Pizza Size Intent

dialog.matches('pizzasize',[

function(session){
	
		console.log("--------------------------------------------------------");
        console.log(moment().format('MMMM Do YYYY, hh:mm:ss a') + " | pizza size Intent Matched");
        console.log("--------------------------------------------------------");
		
		session.beginDialog('/size',session);
		
	}
	]);
	
	
	//Waterfall model for yes or no for Customize
	
bot.dialog('/size',[

function(session){
	
		builder.Prompts.text(session,"Do you want to customize your pizza?");
		
		var cards = getCardsAttachments4Yes_No();
        var reply = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(cards);
		
		session.send(reply);
	},

function(session, args, result)
{
	console.log(args);
	if (args.response == 'Yes')
	{
		var cards = getcustomizeoptions();
        var reply = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(cards);
		
		session.send(reply);
		session.endDialog();
		session.endConversation();
		
	}
	else
	{
		
		session.send("How many pizza's do you want?")
		session.endDialog();
		session.endConversation();
	
	}
		
}

]);

//Customized Options Intent

dialog.matches('customizeoptions',[

function(session, args){
	
		console.log("--------------------------------------------------------");
        console.log(moment().format('MMMM Do YYYY, hh:mm:ss a') + " | Customized Options Intent Matched");
        console.log("--------------------------------------------------------");
		
	if(args.entities[0].type=="Toppings")
	{
		if(pizzatype == "Veg")
		{
			
			var cards = gettoppings();
			var reply = new builder.Message(session)
			.attachmentLayout(builder.AttachmentLayout.carousel)
			.attachments(cards);
			
			session.send(reply);
			
		}
		else
		{
			var cards = gettoppings_nonveg();
			var reply = new builder.Message(session)
			.attachmentLayout(builder.AttachmentLayout.carousel)
			.attachments(cards);
			
			session.send(reply);
			
		}
		
	}
	else if(args.entities[0].type=="Crust Type")
	{
		
		if(pizzatype == "Veg")
		{
			
			var cards = getcrusttype();
			var reply = new builder.Message(session)
			.attachmentLayout(builder.AttachmentLayout.carousel)
			.attachments(cards);
			
			session.send(reply);
			
		}
		else{
			var cards = getcrusttype_nonveg();
			var reply = new builder.Message(session)
			.attachmentLayout(builder.AttachmentLayout.carousel)
			.attachments(cards);
			
			session.send(reply);
			
		}
		
	}
}

]);

//Toppings Intent

dialog.matches('Toppings',[
function(session)
{
	
		console.log("--------------------------------------------------------");
        console.log(moment().format('MMMM Do YYYY, hh:mm:ss a') + " | Toppings Intent Matched");
        console.log("--------------------------------------------------------");
		
		session.send("How many Pizza's do you want?");
		
	}
]);

//Crust Intent

dialog.matches('CrustTypes',[
function(session)
{
	
		console.log("--------------------------------------------------------");
        console.log(moment().format('MMMM Do YYYY, hh:mm:ss a') + " | Crust Types Intent Matched");
        console.log("--------------------------------------------------------");
	
		session.send("How many Pizza's do you want?")
	}
]);

//Pizza count Intent

dialog.matches('PizzaCount',[
function(session)
{
	
		console.log("--------------------------------------------------------");
        console.log(moment().format('MMMM Do YYYY, hh:mm:ss a') + " | pizza Count Intent Matched");
        console.log("--------------------------------------------------------");
		
		session.beginDialog('/addmore',session)
		
	}
]);

// waterfall model to add more pizza

bot.dialog('/addmore',[

function(session){
	
		builder.Prompts.text(session, "Do you want to add more pizzas to your order? ");
		
		var cards = getCardsAttachments4Yes_No();
        var reply = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(cards);
		
        session.send(reply);
	},
function(session, args){
	
	if(args.response=="Yes")
	{
		
		var cards = getCardsAttachments2();
        var reply = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(cards);
		
        session.send(reply);
		session.endDialog();
		session.endConversation();
	}
	else 
	{
		
		session.send("Your order is placed. You will get the conformation email soon. Thank you")
		session.endDialog()
		session.endConversation()
	}
}
]);

//Thank you

dialog.matches("Thank you",[

function(session){
	
		console.log("--------------------------------------------------------");
        console.log(moment().format('MMMM Do YYYY, hh:mm:ss a') + " | Thank you Intent Matched");
        console.log("--------------------------------------------------------");
		session.send("Thank you. Have a nice day!")
	}
]);

//Default Intent

dialog.onDefault(builder.DialogAction.send("I'm sorry I didn't understand. I'm Pizza Bot, how can I help you? "));