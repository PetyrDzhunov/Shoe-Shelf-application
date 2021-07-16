const app = Sammy('#root', function() {

    this.use('Handlebars', 'hbs');

    this.get('/home', function() {
        this.partial('/templates/homeGuest.hbs');
    });


});

(() => {
    app.run('home');
})();