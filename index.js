<<<<<<< HEAD
<<<<<<< Updated upstream
=======
const userModel = firebase.auth();
const db = firebase.firestore();
const app = Sammy('#app', function() {

    this.use('Handlebars', 'hbs');
    //Home routes
    this.get('/home', function(context) {
        db.collection('offers')
            .get()
            .then((response) => {
                context.offers = [];
                response.forEach((offer) => {
                    context.offers.push({ id: offer.id, ...offer.data() })
                });
                extendContext(context)
                    .then(function() {
                        this.partial('./templates/home.hbs');
                    })
            })

        .catch(errorHandler);
=======
const userModel = firebase.auth();
const app = Sammy('#app', function() {
    this.use('Handlebars', 'hbs');
    //Home routes
    this.get('/home', function() {
        this.partial('/templates/homeGuest.hbs');
>>>>>>> b30844e317ff1ffe2bba1d5dce40dbba8b2d9d1a
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

<<<<<<< HEAD
    this.get('/logout', function(context) {
        userModel.signOut()
            .then((response) => {
                clearUserData();
                this.redirect('/home');
            })
            .catch(errorHandler)

    });

=======
>>>>>>> b30844e317ff1ffe2bba1d5dce40dbba8b2d9d1a
    this.post('/register', function(context) {
        const { email, password, rePassword } = context.params;
        if (password != rePassword) {
            return;
        }
        userModel.createUserWithEmailAndPassword(email, password)
            .then((userData) => {
<<<<<<< HEAD
                this.redirect('/login');
=======
                this.redirect('/home');
>>>>>>> b30844e317ff1ffe2bba1d5dce40dbba8b2d9d1a
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

<<<<<<< HEAD
    this.post('/create-offer', function(context) {
        const { productName, price, description, imageUrl, brand } = context.params;
        db.collection('offers').add({ productName, price, description, imageUrl, brand, salesman: getUserData().uid, clients: [] })
            .then((createdProduct) => {
                this.redirect('/home');
            })
            .catch(errorHandler);
    });

    this.get('/edit-offer/:id', function(context) {
=======
    this.get('/edit-offer', function(context) {
>>>>>>> b30844e317ff1ffe2bba1d5dce40dbba8b2d9d1a
        extendContext(context)
            .then(function() {
                this.partial('./templates/editOffer.hbs');
            });
    });

<<<<<<< HEAD
    this.get('/details/:offerId', function(context) {
        const { offerId } = context.params;
        db.collection('offers').
        doc(offerId)
            .get()
            .then((response) => {
                const actualOfferData = response.data();
                const imTheSalesman = actualOfferData.salesman === getUserData().uid;
                context.offer = {...actualOfferData, imTheSalesman }
                extendContext(context)
                    .then(function() {
                        this.partial('../templates/details.hbs')
                    })
            })
    });
=======
    this.get('/details', function(context) {
        extendContext(context)
            .then(function() {
                this.partial('./templates/details.hbs');
            });
    });


>>>>>>> b30844e317ff1ffe2bba1d5dce40dbba8b2d9d1a
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

<<<<<<< HEAD
//helper functions

=======
>>>>>>> b30844e317ff1ffe2bba1d5dce40dbba8b2d9d1a
function saveUserData(data) {
    const { user: { email, uid } } = data;
    localStorage.setItem('user', JSON.stringify({ email, uid }))
};

function getUserData() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
<<<<<<< HEAD
};

function clearUserData() {
    localStorage.removeItem('user');
}
>>>>>>> Stashed changes
=======
};
>>>>>>> b30844e317ff1ffe2bba1d5dce40dbba8b2d9d1a
