const app = Sammy('#root', function() {

    this.use('Handlebars', 'hbs');

    this.get('/home', function() {
        this.partial('/templates/homeGuest.hbs');
    });

    this.get('/register', function() {
        this.partial('./templates/register.hbs')
    })

});

(() => {
    app.run('/home');
})();