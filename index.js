const app = Sammy('#app', function() {

    this.use('Handlebars', 'hbs');
    //Home routes
    this.get('/home', function(context) {
        extendContext(context)
            .then(function() {
                this.partial('../templates/homeGuest.hbs');
            });
    });

    //User routes
    this.get('/register', function(context) {
        extendContext(context)
            .then(function() {
                this.partial('./templates/register.hbs');
            });
    });

    this.get('/login', function(context) {
        extendContext(context)
            .then(function() {
                this.partial('./templates/login.hbs');
            });
    });

    //Offers routes
    this.get('/create-offer', function(context) {
        extendContext(context)
            .then(function() {
                this.partial('./templates/createOffer.hbs');
            });
    });

    this.get('/edit-offer', function(context) {
        extendContext(context)
            .then(function() {
                this.partial('./templates/editOffer.hbs');
            });
    });

    this.get('/details', function(context) {
        extendContext(context)
            .then(function() {
                this.partial('./templates/details.hbs');
            });
    });


});

(() => {
    app.run('/home');
})();

function extendContext(context) {
    return context.loadPartials({
        'header': './partials/header.hbs',
        'footer': './partials/footer.hbs'
    })
} // async func that loads our header&footer by