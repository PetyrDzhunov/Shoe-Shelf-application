const userModel = firebase.auth();
const app = Sammy('#app', function() {
    this.use('Handlebars', 'hbs');
    //Home routes
    this.get('/home', function() {
        this.partial('/templates/homeGuest.hbs');
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

    this.post('/register', function(context) {
        const { email, password, rePassword } = context.params;
        if (password != rePassword) {
            return;
        }
        userModel.createUserWithEmailAndPassword(email, password)
            .then((userData) => {
                this.redirect('/home');
            })
            .catch(errorHandler);
    });
    this.post('/login', function(context) {
        const { email, password } = context.params;
        userModel.signInWithEmailAndPassword(email, password)
            .then((userData) => {
                saveUserData(userData)
                this.redirect('/home');
            })
            .catch(errorHandler)
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
    const user = getUserData();
    context.isLoggedIn = Boolean(user)
    context.email = user ? user.email : '';
    return context.loadPartials({
        'header': './partials/header.hbs',
        'footer': './partials/footer.hbs'
    })
}; // async func that loads our header&footer by

function errorHandler(error) {
    console.log(error);
};

function saveUserData(data) {
    const { user: { email, uid } } = data;
    localStorage.setItem('user', JSON.stringify({ email, uid }))
};

function getUserData() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};