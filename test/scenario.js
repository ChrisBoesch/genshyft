(function(argument) {
    var scenario = {
            'default': [
                '../test/game-app-test.js'
            ],

            'quest': [,
                '../test/mocks/mocked-app.js',
                '../test/mocks/quest.js'
            ],

            'newProblem': [
                '../test/mocks/mocked-app.js',
                '../test/mocks/home.js',
                '../test/mocks/problem-edit.js'
            ],
        },
        getScenario = function() {
            var search = document.location.search.slice(1),
                params = {},
                urls,
                sessionName = sessionStorage.getItem('mock:scenario:name');

            search.split('&').forEach(function(item){
                var kv = item.split('=');

                if (kv.length !== 2) {
                    return;
                }
                params[kv[0]] = decodeURIComponent(kv[1].replace(/\+/g, ' '));
            });

            if (params['scenario'] && scenario[params['scenario']]) {
                sessionStorage.setItem('mock:scenario:name', params['scenario']);
                return scenario[params['scenario']];
            }

            if (sessionName && scenario[sessionName]) {
                return scenario[sessionName];
            }

            return scenario['default'];
        },
        urls = getScenario();

    document.write('<script src="../bower_components/angularjs-unstable/angular-mocks.js"> </script>');
    urls.forEach(function(url) {
        console.log('loading "'+url+'"');
        document.write('<script src="'+ url + '"> </script> ');
    });
})();
